const {PostProcessRenderContext} = require('PostProcessing/Runtime/PostProcessRenderContext');
const {Utils} = require('PostProcessing/Base/Utils');
const {PostProcessType} = require('PostProcessing/Runtime/PostProcessResources');

const PostProcessPath = {
  Bloom: 'PostProcessing/Runtime/Effects/BloomRenderer',
  Fxaa: 'PostProcessing/Runtime/Effects/FxaaRenderer',
  SSAO: 'PostProcessing/Runtime/Effects/SSAORenderer',
  ChromaticAberration: 'PostProcessing/Runtime/Effects/ChromaticAberrationRenderer',
  Distort: 'PostProcessing/Runtime/Effects/DistortRenderer',
  Grain: 'PostProcessing/Runtime/Effects/GrainRenderer',
  Vignette: 'PostProcessing/Runtime/Effects/VignetteRenderer',
  DepthOfField: 'PostProcessing/Runtime/Effects/DepthOfFieldRenderer',
  LensFlare: 'PostProcessing/Runtime/Effects/LensFlareRenderer',
  MotionBlur: 'PostProcessing/Runtime/Effects/MotionBlurRenderer',
  BokehBlur: 'PostProcessing/Runtime/Effects/BokehBlurRenderer',
  VolumetricLight: 'PostProcessing/Runtime/Effects/VolumetricLightRendererjs',
  Custom: 'PostProcessing/Runtime/Effects/CustomRenderer',
};

const PostProcessEnableProperties = {
  Bloom: 'pBloomEnable',
  Fxaa: 'pFxaaEnable',
  SSAO: 'pSSAOEnable',
  ChromaticAberration: 'pChromaticAberrationEnable',
  Distort: 'pDistortEnable',
  Grain: 'pGrainEnable',
  Vignette: 'pVignetteEnable',
  DepthOfField: 'pDOFEnable',
  LensFlare: 'pLensFlareEnable',
  MotionBlur: 'pMotionBlurEnable',
  BokehBlur: 'pBokehBlurEnable',
  VolumetricLight: 'pVolumetricLightEnable',
  Custom: 'pCustomEnable',
};

const PostProcessClass = {
  Bloom: 'BloomRenderer',
  Fxaa: 'FxaaRenderer',
  SSAO: 'SSAORenderer',
  ChromaticAberration: 'ChromaticAberrationRenderer',
  Distort: 'DistortRenderer',
  Grain: 'GrainRenderer',
  Vignette: 'VignetteRenderer',
  DepthOfField: 'DepthOfFieldRenderer',
  LensFlare: 'LensFlareRenderer',
  MotionBlur: 'MotionBlurRenderer',
  BokehBlur: 'BokehBlurRenderer',
  VolumetricLight: 'VolumetricLightRendererjs',
  Custom: 'CustomRenderer',
};

const Amaz = effect.Amaz;

class PostProcessLayer {
  constructor() {
    this.name = 'PostProcessLayer';
    this.enabled = false;
    this.commands1_texture = new Amaz.CommandBuffer();
    this.commands1_stencil = new Amaz.CommandBuffer();
    this.commands2 = new Amaz.CommandBuffer();

    this.maskMaterial = null;

    this.renderContext = new PostProcessRenderContext();

    this.effects = new Map();
  }

  getOrCreateEffect(settings, type) {
    if (!this.effects.has(type) && settings.get(PostProcessEnableProperties[type])) {
      const importedModule = require(PostProcessPath[type]);
      const renderer = new importedModule[PostProcessClass[type]]();
      this.effects.set(type, renderer);
    }
  }

  updateEffect(properties, type) {
    this.getOrCreateEffect(properties, type);
    if (this.effects.has(type)) {
      this.effects.get(type).update(properties);
    }
  }

  renderEffect(type, scene) {
    //it is useless to getOrCreate, because it should be dealed with in update not render
    if (this.effects.has(type)) {
      this.effects.get(type).render(scene, this.renderContext);
    }
  }

  onStart() {
    const camera = this.getComponent('Camera');
    if (camera !== null && camera.renderTexture !== null) {
      this.script.addScriptListener(camera, Amaz.CameraEvent.RENDER_IMAGE_EFFECTS, 'renderImageEffects', this.script);

      this.maskMaterial = Utils.GetStencilMaskedMaterial();

      let colorFormat = Amaz.PixelFormat.RGBA8Unorm;
      if (
        camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat ||
        camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat
      ) {
        colorFormat = camera.renderTexture.colorFormat;
      }

      this.srcCopy = Utils.CreateRenderTexture(
        'srcCopy',
        camera.renderTexture.width,
        camera.renderTexture.height,
        colorFormat
      );
      this.commands1_texture.clearAll();
      this.commands1_texture.blitWithMaterial(camera.renderTexture, this.srcCopy, this.maskMaterial, 2);
      this.commands1_texture.setRenderTexture(camera.renderTexture);
      this.commands1_texture.clearRenderTexture(true, false, new Amaz.Color(0, 0, 0, 0), 1.0);
      this.commands1_texture.setRenderTexture(this.srcCopy);
      this.commands1_texture.blitWithMaterial(this.srcCopy, camera.renderTexture, this.maskMaterial, 3);

      this.commands1_stencil.clearAll();
      this.commands1_stencil.blitWithMaterial(camera.renderTexture, this.srcCopy, this.maskMaterial, 2);
      this.commands1_stencil.setRenderTexture(camera.renderTexture);
      this.commands1_stencil.clearRenderTexture(true, false, new Amaz.Color(0, 0, 0, 0), 1.0);
      this.commands1_stencil.setRenderTexture(this.srcCopy);
      this.commands1_stencil.blitWithMaterial(this.srcCopy, camera.renderTexture, this.maskMaterial, 0);

      this.dstCopy = Utils.CreateRenderTexture(
        'dstCopy',
        camera.renderTexture.width,
        camera.renderTexture.height,
        colorFormat
      );
      this.commands2.clearAll();
      this.commands2.blitWithMaterial(camera.renderTexture, this.dstCopy, this.maskMaterial, 2);

      this.maskMaterial.setTex('backgroudTexture', this.srcCopy);
      this.commands2.blitWithMaterial(this.dstCopy, camera.renderTexture, this.maskMaterial, 1);

      this.renderContext.setCamera(camera);
      this.renderContext.setSource(camera.renderTexture);
      this.renderContext.setDestination(camera.renderTexture);
      this.renderContext.setScreenWidth(camera.renderTexture.width);
      this.renderContext.setScreenHeight(camera.renderTexture.height);

      this.enabled = true;

      if (camera.renderTexture) {
        if (camera.renderTexture.builtinType === Amaz.BuiltInTextureType.OUTPUT) {
          this.outputRT = camera.entity.scene.getOutputRenderTexture();
        } else {
          this.outputRT = camera.renderTexture;
        }
        if (this.outputRT.depthTexture) {
          this.camHasDepth = true;
        } else {
          this.depthRT = this.scene.assetMgr.SyncLoad('js/PostProcessing/Textures/depth.rt');
        }
      }
    }
  }

  onUpdate(dt) {
    if (!this.enabled) {
      return;
    }

    const compList = this.entity.getComponents('JSScriptComponent');
    for (let index = 0; index < compList.size(); ++index) {
      const comp = compList.get(index);
      if (comp.getScript().className === 'PostProcessLayer') {
        this.configurePostProcessMask(comp);
        this.configureCameraRTParames(comp, this.outputRT);
        this.updateRenderContext();

        this.updateEffect(comp.properties, PostProcessType.Bloom);
        this.updateEffect(comp.properties, PostProcessType.Fxaa);
        this.updateEffect(comp.properties, PostProcessType.SSAO);
        this.updateEffect(comp.properties, PostProcessType.ChromaticAberration);
        this.updateEffect(comp.properties, PostProcessType.Distort);
        this.updateEffect(comp.properties, PostProcessType.Grain);
        this.updateEffect(comp.properties, PostProcessType.Vignette);
        this.updateEffect(comp.properties, PostProcessType.DepthOfField);
        this.updateEffect(comp.properties, PostProcessType.LensFlare);
        this.updateEffect(comp.properties, PostProcessType.MotionBlur);
        this.updateEffect(comp.properties, PostProcessType.BokehBlur);
        this.updateEffect(comp.properties, PostProcessType.VolumetricLight);
        this.updateEffect(comp.properties, PostProcessType.Custom);
      }
    }
  }

  configurePostProcessMask(comp) {
    if (!comp.properties.has('pMaskType')) {
      this.pMaskType = 'None';
    } else {
      this.pMaskType = comp.properties.get('pMaskType');
    }
    if (this.pMaskType === 'Texture' && comp.properties.has('pTextureMask')) {
      this.pTextureMask = comp.properties.get('pTextureMask');
      this.maskMaterial.setTex('maskTexture', this.pTextureMask);
    }
  }

  configureCameraRTParames(comp, src) {
    if (!this.camHasDepth) {
      if (!comp.properties.has('pSSAOEnable') && !comp.properties.has('pDOFEnable')) {
        return;
      } else {
        const ssaoEnable = comp.properties.get('pSSAOEnable');
        const lightShaftsEnable = comp.properties.get('pDOFEnable');
        if (ssaoEnable || lightShaftsEnable) {
          src.depthTexture = this.depthRT;
          this.camHasDepth = true;
        } else {
          src.depthTexture = null;
          this.camHasDepth = false;
        }
      }
    }
  }

  updateRenderContext() {
    // Update when the screen resolution is modified
    const camera = this.renderContext.getCamera();
    const screenWidth = camera.renderTexture.width;
    const screenHeight = camera.renderTexture.height;
    if (screenWidth !== this.renderContext.getScreenWidth() || screenHeight !== this.renderContext.getScreenHeight()) {
      this.renderContext.setScreenWidth(screenWidth);
      this.renderContext.setScreenHeight(screenHeight);

      this.effects.forEach(value => {
        value.dirty = true;
      });
    }
  }

  renderImageEffects(sys, camera, eventType) {
    if (camera.enabled && this.enabled && eventType === Amaz.CameraEvent.RENDER_IMAGE_EFFECTS) {
      let hasMask = 0;
      if (this.pMaskType === 'Stencil') {
        hasMask = 1;
      } else if (this.pMaskType === 'Texture') {
        hasMask = 2;
      }

      if (hasMask === 1) {
        camera.entity.scene.commitCommandBuffer(this.commands1_stencil);
      } else if (hasMask === 2) {
        camera.entity.scene.commitCommandBuffer(this.commands1_texture);
      }

      this.renderEffect(PostProcessType.Bloom, camera.entity.scene);
      this.renderEffect(PostProcessType.Fxaa, camera.entity.scene);
      this.renderEffect(PostProcessType.SSAO, camera.entity.scene);
      this.renderEffect(PostProcessType.ChromaticAberration, camera.entity.scene);
      this.renderEffect(PostProcessType.Distort, camera.entity.scene);
      this.renderEffect(PostProcessType.Grain, camera.entity.scene);
      this.renderEffect(PostProcessType.Vignette, camera.entity.scene);
      this.renderEffect(PostProcessType.DepthOfField, camera.entity.scene);
      this.renderEffect(PostProcessType.LensFlare, camera.entity.scene);
      this.renderEffect(PostProcessType.MotionBlur, camera.entity.scene);
      this.renderEffect(PostProcessType.BokehBlur, camera.entity.scene);
      this.renderEffect(PostProcessType.VolumetricLight, camera.entity.scene);
      this.renderEffect(PostProcessType.Custom, camera.entity.scene);

      if (hasMask > 0) {
        camera.entity.scene.commitCommandBuffer(this.commands2);
      }
    }
  }

  onDestroy() {
    const camera = this.getComponent('Camera');
    if (camera !== null) {
      this.script.removeScriptListener(
        camera,
        Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
        'renderImageEffects',
        this.script
      );
    }
  }

  onEnable() {
    this.enabled = true;
  }

  onDisable() {
    this.enabled = false;
  }
}

exports.PostProcessLayer = PostProcessLayer;
