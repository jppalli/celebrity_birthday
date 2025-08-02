const {Utils} = require('Utils');
const {PostProcessBaseRenderer} = require('PostProcessBaseRenderer');
const Amaz = effect.Amaz;

// uniform names
const u_outputRT = 'u_outputRT';
const u_weight = 'u_weight';
const u_textureSize = 'u_texture_size';
const u_hdrEnable = 'u_hdr';

const u_BloomRT = 'u_bloom_rt';
const u_BloomColor = 'u_bloom_color';
const u_BloomDiffuse = 'u_bloom_diffuse';
const u_BloomIntensity = 'u_intensity';
const u_ExtractBrightThresholdHDR = 'u_threshold';
const u_ExtractBrightClampHDR = 'u_clamp';
const u_SampleScale = 'u_sample_scale';
const u_UserProps = 'u_userprop';

// pass ids
const ExtractBright = 0;
const ExtractBrightFastMode = 1;
const DownSample = 2;
const DownSampleFastMode = 3;
const UpSample = 4;
const UpSampleFastMode = 5;
const UpSampleFinal = 6;
const UpSampleFinalFastMode = 7;
const BloomPass = 8;

class BloomRenderer extends PostProcessBaseRenderer {
  constructor() {
    super();
    this.commands = new Amaz.CommandBuffer();
    this.setupCommand = false;
    this.dirty = true;

    // Bloom Properties
    this.setRendererProperty('Bloom', true, true);
    this.setRendererProperty('pBloomHdr', false, true);
    this.setRendererProperty('pBloomUseMask', false);
    this.setRendererProperty('bloomColor', new Amaz.Color(1.0, 1.0, 1.0, 1.0));
    this.setRendererProperty('Intensity', 0.05);
    this.setRendererProperty('Threshold', 0.1);
    this.setRendererProperty('pBloomSoftknee', 0.0);
    this.setRendererProperty('pBloomClamp', 65565);
    this.setRendererProperty('Anamorphic', 0.1, true);
    this.setRendererProperty('pBloomFastMode', false, true);
    this.setRendererProperty('Diffuse', 0.5, true);
  }

  update(properties) {
    this.updateProperties(properties);
  }

  render(scene, postProcessContext) {
    if (this.settings.get('Bloom')) {
      const width = postProcessContext.getScreenWidth();
      const height = postProcessContext.getScreenHeight();
      const src = postProcessContext.getSource();
      const dst = postProcessContext.getDestination();
      const bloomMat = postProcessContext.getResources().getShaders('Bloom').getMaterial();
      const maskCamEnt = scene.findEntityBy('MaskCamera');

      if (maskCamEnt !== null) {
        const maskRT = maskCamEnt.getComponent('Camera').renderTexture;

        if (this.settings.get('pBloomUseMask')) {
          bloomMat.setTex('_BloomMask', maskRT);
          this.userProps.x = 1.0;
        } else {
          this.userProps.x = 0.0;
        }
      }

      bloomMat.setVec2(u_UserProps, this.userProps);

      let quality = 1;
      if (!this.settings.get('pBloomFastMode')) {
        quality = 0;
      }

      const lthresh = Utils.GammaToLinearSpace(this.settings.get('Threshold'));
      const knee = lthresh * this.settings.get('pBloomSoftknee') + 0.00001;
      const threshold = new Amaz.Vector4f(lthresh, lthresh - knee, knee * 2.0, 0.25 / knee);

      const lclamp = Utils.GammaToLinearSpace(this.settings.get('pBloomClamp'));
      const bc = this.settings.get('bloomColor');
      const bloomColor = Utils.GammaToLinearSpaceColor(new Amaz.Vector4f(bc.r, bc.g, bc.b, bc.a));

      let intensity = this.settings.get('Intensity') * 50;
      intensity = Math.pow(2.4, intensity * 0.1) - 1.0;

      // Negative anamorphic ratio values distort vertically - positive is horizontal
      const ratio = this.settings.get('Anamorphic');
      let rw = 0;
      let rh = 0;
      if (ratio < 0) {
        rw = -ratio;
      }
      if (ratio > 0) {
        rh = ratio;
      }

      const tw = Math.floor(width / (2.0 - rw));
      const th = Math.floor(height / (2.0 - rh));
      const s = Math.max(tw, th);
      const logs = Math.log(s) / Math.log(2) + Math.min(10.0, (this.settings.get('Diffuse') + 0.2) * 10.0) - 10.0;
      const logs_i = Math.floor(logs);
      let iterations = Math.min(logs_i, 16);
      iterations = Math.max(iterations, 1);
      const sampleScale = 0.5 + logs - logs_i;
      const hdrEnable = this.settings.get('pBloomHdr');
      let colorFormat = Amaz.PixelFormat.RGBA8Unorm;

      // set uniforms
      bloomMat.setFloat(u_SampleScale, sampleScale);
      bloomMat.setVec4(u_ExtractBrightThresholdHDR, threshold);
      bloomMat.setVec4(u_ExtractBrightClampHDR, new Amaz.Vector4f(lclamp, 0.0, 0.0, 0.0));
      bloomMat.setVec4(u_BloomColor, new Amaz.Vector4f(bloomColor.x, bloomColor.y, bloomColor.z, bloomColor.w));
      bloomMat.setVec2(u_textureSize, new Amaz.Vector2f(width, height));
      bloomMat.setFloat(u_BloomIntensity, intensity);
      if (
        hdrEnable &&
        (src.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat || src.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat)
      ) {
        bloomMat.setFloat(u_hdrEnable, 1.0);
        colorFormat = src.colorFormat;
      } else {
        bloomMat.setFloat(u_hdrEnable, 0.0);
      }

      // update commands if necessary
      if (this.dirty) {
        this.commands.clearAll();
        const rtConfig = postProcessContext.getRTConfig();

        let w = tw;
        let h = th;

        // Test Work
        const extractLightRT = this.commands.propertyToID('_extractLightRT');
        Utils.SetupRTConfig(rtConfig, w, h, colorFormat);
        this.commands.getTemporaryRT(extractLightRT, rtConfig, true);
        Utils.CmdBlitWithMaterialTempRT(this.commands, src, extractLightRT, bloomMat, ExtractBright + quality);

        // downsample
        let samplerRT = extractLightRT;
        const downSampleRTs = [];
        const rtSizeMap = new Map();

        downSampleRTs.push(extractLightRT);
        rtSizeMap.set(extractLightRT, {width: w, height: h});

        for (let i = 1; i <= iterations - 1; ++i) {
          const sheet = new Amaz.MaterialPropertyBlock();
          const vec2s = new Amaz.Vec2Vector();
          vec2s.pushBack(new Amaz.Vector2f(w, h));
          sheet.setVec2Vector(u_textureSize, vec2s);
          w = Math.floor(Math.max(1, w * 0.5));
          h = Math.floor(Math.max(1, h * 0.5));
          const downSamplerRT = this.commands.propertyToID('_downSamplerRT' + i);
          Utils.SetupRTConfig(rtConfig, w, h, colorFormat);
          rtSizeMap.set(downSamplerRT, {width: w, height: h});
          this.commands.getTemporaryRT(downSamplerRT, rtConfig, true);
          Utils.CmdBlitWithMaterialAndPropertiesTempRT(
            this.commands,
            samplerRT,
            downSamplerRT,
            bloomMat,
            DownSample + quality,
            sheet
          );

          samplerRT = downSamplerRT;

          downSampleRTs.push(downSamplerRT);
        }

        samplerRT = downSampleRTs[iterations - 1];
        for (let i = iterations - 2; i >= 0; --i) {
          const sheet = new Amaz.MaterialPropertyBlock();
          const vec2s = new Amaz.Vec2Vector();

          let curRTSize = rtSizeMap.get(samplerRT);

          vec2s.pushBack(new Amaz.Vector2f(curRTSize.width, curRTSize.height));
          sheet.setVec2Vector(u_textureSize, vec2s);
          const downSampleRT = downSampleRTs[i];
          this.commands.setGlobalTextureTemp('_BloomTex', downSampleRT);
          curRTSize = rtSizeMap.get(downSampleRT);
          Utils.SetupRTConfig(rtConfig, curRTSize.width, curRTSize.height, colorFormat);
          const upSamplerRT = this.commands.propertyToID('_upSamplerRT' + i);
          rtSizeMap.set(upSamplerRT, {width: rtConfig.width, height: rtConfig.height});
          this.commands.getTemporaryRT(upSamplerRT, rtConfig, true);
          Utils.CmdBlitWithMaterialAndPropertiesTempRT(
            this.commands,
            samplerRT,
            upSamplerRT,
            bloomMat,
            UpSample + quality,
            sheet
          );
          samplerRT = upSamplerRT;
        }

        const sheet = new Amaz.MaterialPropertyBlock();
        const vec2s = new Amaz.Vec2Vector();
        vec2s.pushBack(new Amaz.Vector2f(rtConfig.width, rtConfig.height));
        sheet.setVec2Vector(u_textureSize, vec2s);
        const curRTSize = rtSizeMap.get(samplerRT);
        Utils.SetupRTConfig(rtConfig, curRTSize.width, curRTSize.height, colorFormat);
        const afterBloomRT = this.commands.propertyToID('_afterBloomRT');
        this.commands.getTemporaryRT(afterBloomRT, rtConfig, true);
        Utils.CmdBlitWithMaterialAndPropertiesTempRT(
          this.commands,
          samplerRT,
          afterBloomRT,
          bloomMat,
          UpSampleFinal + quality,
          sheet
        );

        bloomMat.setTex('_PreviewTex', src);
        let pingpong = undefined;
        if (src.image === dst.image) {
          pingpong = this.commands.propertyToID('_pingpong');
          Utils.SetupRTConfig(rtConfig, width, height, colorFormat);
          this.commands.getTemporaryRT(pingpong, rtConfig, true);
          Utils.CmdBlitWithMaterialTempRT(this.commands, afterBloomRT, pingpong, bloomMat, BloomPass);
          Utils.CmdBlitTempRT(this.commands, pingpong, dst);
        } else {
          Utils.CmdBlitWithMaterialTempRT(this.commands, afterBloomRT, dst, bloomMat, BloomPass);
        }
        postProcessContext.setSource(dst);
        this.dirty = false;

        // release temp rt
        rtSizeMap.forEach((value, key) => {
          this.commands.releaseTemporaryRT(key);
        });
        this.commands.releaseTemporaryRT(afterBloomRT);
        this.commands.releaseTemporaryRT(pingpong);

        this.setupCommand = true;
      }
    } else if (this.dirty) {
      this.commands.clearAll();
      this.dirty = false;
      // to do, if src !=== dst, copy src to dst
    }

    if (this.setupCommand) {
      const cam = postProcessContext.getCamera();
      cam.entity.scene.commitCommandBuffer(this.commands);
    }
  }
}

exports.BloomRenderer = BloomRenderer;
