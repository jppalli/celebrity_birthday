const PostProcessType = {
  Bloom: 'Bloom',
};

const PostProcessShaderPath = {
  Bloom: 'BloomShader',
};

const PostProcessShaderClass = {
  Bloom: 'BloomShader',
};

const Amaz = effect.Amaz;

class PostProcessResources {
  constructor() {
    this.shaders = new Map();
    this.textures = new Map();
  }

  setTextureByName(name, texture) {
    this.textures[name] = texture;
  }

  getTextureByName(name) {
    return this.textures[name];
  }

  getShaders(type) {
    if (!this.shaders.has(type)) {
      const importedShaderModule = require(PostProcessShaderPath[type]);
      const importedShaderModuleShader = new importedShaderModule[PostProcessShaderClass[type]]();
      this.shaders.set(type, importedShaderModuleShader);
    }
    return this.shaders.get(type);
  }
}

exports.PostProcessResources = PostProcessResources;
exports.PostProcessType = PostProcessType;
