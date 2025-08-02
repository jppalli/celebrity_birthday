const {Utils} = require('PostProcessing/Base/Utils');
const {PostProcessBaseRenderer} = require('PostProcessing/Runtime/Effects/PostProcessBaseRenderer');
const Amaz = effect.Amaz;

// uniform names
const u_ScreenParams = 'u_ScreenParams';

// pass ids
const FxaaPass = 0;

class FxaaRenderer extends PostProcessBaseRenderer {
  constructor() {
    super();
    this.commands = new Amaz.CommandBuffer();

    // this.setRendererProperty("pFxaaFastMode", 1);  // no exist
    // this.setRendererProperty("pFxaaKeepAlpha", 1); // no exist
    this.setRendererProperty('pFxaaEnable', false, true);
  }

  update(properties) {
    this.updateProperties(properties);
  }

  render(scene, renderContext) {
    let enable = this.settings.get('pFxaaEnable');
    let width = renderContext.getScreenWidth();
    let height = renderContext.getScreenHeight();

    if (enable) {
      let src = renderContext.getSource();
      let dst = renderContext.getDestination();
      let fxaaMat = renderContext.getResources().getShaders('Fxaa').getMaterial();

      fxaaMat.setVec4(u_ScreenParams, new Amaz.Vector4f(width, height, 1.0 / width, 1.0 / height));

      if (this.dirty) {
        this.commands.clearAll();
        if (src.image === dst.image) {
          let pingpong = this.commands.propertyToID('_pingpong');
          let rtConfig = renderContext.getRTConfig();
          Utils.SetupRTConfig(rtConfig, width, height);
          this.commands.getTemporaryRT(pingpong, rtConfig, true);
          Utils.CmdBlitWithMaterialTempRT(this.commands, src, pingpong, fxaaMat, FxaaPass);
          Utils.CmdBlitTempRT(this.commands, pingpong, dst);
          this.commands.releaseTemporaryRT(pingpong);
        } else {
          this.commands.blitWithMaterial(src, dst, fxaaMat, FxaaPass);
        }
        this.dirty = false;
      }
    } else if (this.dirty) {
      this.commands.clearAll();
      this.dirty = false;
    }
    let cam = renderContext.getCamera();
    cam.entity.scene.commitCommandBuffer(this.commands);
  }
}

exports.FxaaRenderer = FxaaRenderer;
