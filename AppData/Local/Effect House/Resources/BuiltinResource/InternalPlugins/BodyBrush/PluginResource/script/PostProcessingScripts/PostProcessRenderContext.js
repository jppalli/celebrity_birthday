const {PostProcessResources} = require('PostProcessResources');

const Amaz = effect.Amaz;

class PostProcessRenderContext {
  constructor() {
    this.camera = null;
    this.source = null;
    this.destination = null;
    this.commands = null;
    this.width = 720;
    this.height = 1280;
    this.resources = new PostProcessResources();

    this.rtConfig = new Amaz.RenderTextureConfig();
    this.rtConfig.builtinType = Amaz.BuiltInTextureType.NORMAL;
    this.rtConfig.internalFormat = Amaz.InternalFormat.RGBA8;
    this.rtConfig.dataType = Amaz.DataType.U8norm;
    this.rtConfig.depth = 1;
    this.rtConfig.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    this.rtConfig.filterMag = Amaz.FilterMode.LINEAR;
    this.rtConfig.filterMin = Amaz.FilterMode.LINEAR;
    this.rtConfig.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
  }

  getResources() {
    return this.resources;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  getCamera() {
    return this.camera;
  }

  setSource(renderTexture) {
    this.source = renderTexture;
  }

  getSource() {
    return this.source;
  }

  setDestination(renderTexture) {
    this.destination = renderTexture;
  }

  getDestination() {
    return this.destination;
  }

  setScreenWidth(width) {
    this.width = width;
  }

  getScreenWidth() {
    return this.width;
  }

  setScreenHeight(height) {
    this.height = height;
  }

  getScreenHeight() {
    return this.height;
  }

  setCommandBuffer(commands) {
    this.commands = commands;
  }

  getCommandBuffer() {
    return this.commands;
  }

  getHeight() {
    if (this.camera) {
      return this.camera.viewport.height * this.camera.renderTexture.height;
    }
  }

  getWidth() {
    if (this.camera) {
      return this.camera.viewport.width * this.camera.renderTexture.width;
    }
  }

  getRTConfig() {
    return this.rtConfig;
  }
}

exports.PostProcessRenderContext = PostProcessRenderContext;
