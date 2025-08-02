// Amaz
// eslint-disable-next-line
const Amaz = effect.Amaz;

const Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
const nodeName = 'aiDraw_0';
let keyVals = new Amaz.Map();

const stateMap = {
  init: 'init',
  grab: 'grab',
  grabing: 'grabing',
  showGrab: 'showGrab',
  sendRequest: 'sendRequest',
  setDirty: 'setDirty',
  receiveResult: 'receiveResult',
  blend: 'blend',
  done: 'done',

  requestError: 'requestError',
};

class AIDraw {
  constructor() {
    this.name = 'AIDraw';

    this.serviceName = ''; //which algo
    this.algoConfig = ''; //mutil algo param,use this param, this is a json format string, [if this not empty, this.prompt&this.intensity is no useful]
    this.prompt = '';
    this.intensity = 0.5; //The strength of the impact of text prompt on algo results
    this.region = ''; //request region, options:cn、auto

    this.graphName = '';

    this.state = ''; //logic state, process in onUpdate
    this.grabMat = null; //grab frame blit mat
    this.waitFrame = 0; //wait frame to grab frame
    this.blendSpeed = 1; //speed for blend grab pic --> algo pic
    this.blendTimer = 0; //add update delta time,when >=1,is blend complete

    this.cmdBuffer = new Amaz.CommandBuffer();
    this.ganTexture = new Amaz.Texture2D(); //storage algo result img to this texture

    this.resultMeshRenderer = null; //show grab frame pic 、algo result img，and do a transtion effect between both
    this.autoSortingOrder = true; //dynamic create mesh renderer,set autoSortingorder,can change with EHI Inspector
    this.sortingOrder = 0; // like autoSortingOrder
    this.resultMesh = null; //normal fullscreen mesh
    this.resultMat = null; //normal result mat
    this.errorMesh = null; //show error mesh
    this.errorMat = null; //show error mat
    this.errorMeshRenderer = null; //show error mesh renderer

    //request
    this.requestID = 0; //ID for new GAN request
    this.requestTimer = 0; //request time,udate with delta time
    this.maxTimeout = 5; //max timeout is 5 second, show algo result or show error img
    this.hasAlgoResult = false; //status for have received success algo result
    this.errorWaitTimer = 0; //when request error ,show error img,then maxErrorWaitTime hide
    this.maxErrorWaitTime = 2; //see errorWaitTimer

    //blit camera
    this.cameraList = [];
    this.cameraCount = 0;

    this.resultMatInstance = null;
    this.errorMatInstance = null;
    this.grabMatInstance = null;
  }

  onEnable() {
    console.log('wsr', 'onEnable');
    this.state = stateMap.init;
  }

  onDisable() {
    console.log('wsr', 'onDisable');
    this.state = '';
    this.resetProperty();
  }

  onStart() {
    console.log('wsr', 'running:AIDraw:onStart');
    //add MeshRenderer
    this.resultMeshRenderer = this.entity.addComponent('MeshRenderer');
    this.resultMeshRenderer.autoSortingOrder = this.autoSortingOrder;
    this.resultMeshRenderer.sortingOrder = this.sortingOrder;

    //set default mesh&mat
    this.setResultMeshAndMaterial();

    if (this.resultMeshRenderer) {
      this.resultMeshRenderer.enabled = false;
    }
    if (!this.finalOutRT) {
      return;
    }
    this.grabMatInstance = this.grabMat.instantiate();

    //set up the blit mat and create render texture
    this.width = this.finalOutRT.width;
    this.height = this.finalOutRT.height;
    this.captureRT = this.createRenderTexture('rendercache', this.width, this.height); //capture rt, show grab frame
    this.flipCaptureRT = this.createRenderTexture('flipRendercache', this.width, this.height); // flip rt,send to algo
  }

  resetProperty() {
    this.state = '';

    this.waitFrame = 0;
    this.blendTimer = 0;
    this.requestTimer = 0;
    this.hasAlgoResult = false;
    this.errorWaitTimer = 0;

    this.setResultMeshAndMaterial();
    this.resultMeshRenderer.enabled = false;

    for (let index = 0; index < this.cameraList.length; ++index) {
      this.script.removeScriptListener(this.cameraList[index], Amaz.CameraEvent.AFTER_RENDER, 'realBlit', this.script);
    }

    this.cameraList = [];
    this.cameraCount = 0;

    // this.entity.removeComponent('MeshRenderer');
  }

  onUpdate(deltaTime) {
    if (this.serviceName === '' || this.prompt === '' || this.region === '') {
      console.log('AIGC: ', 'No Input');
      return;
    }
    //delay 3 frame ,and grab frame
    if (this.state === stateMap.init) {
      this.waitFrame++;
      if (this.waitFrame < 3) {
        return;
      }
      this.state = stateMap.grab;
    } else if (this.state === stateMap.grab) {
      this.blitImage();
    } else if (this.state === stateMap.showGrab) {
      this.showGrab();
    } else if (this.state === stateMap.sendRequest) {
      this.submitToAlgo();
    } else if (this.state === stateMap.setDirty) {
      this.setAlgoDirty();
    } else if (this.state === stateMap.receiveResult) {
      this.checkForResult(deltaTime);
    } else if (this.state === stateMap.blend) {
      this.blendStart(deltaTime);
    } else if (this.state === stateMap.requestError) {
      this.processResultError(deltaTime);
    } else if (this.state !== stateMap.done) {
      console.log('wsr', this.state);
    }
  }

  blitImage() {
    console.log('wsr', 'blitImage');
    const entities = this.scene.entities;
    for (let i = 0; i < entities.size(); i++) {
      const components = entities.get(i).components;
      for (let j = 0; j < components.size(); j++) {
        if (components.get(j).isInstanceOf('Camera')) {
          console.log('wsr', 'is camera');
          if (components.get(j).renderTexture.equals(this.finalOutRT)) {
            console.log('wsr', 'add listener');
            this.script.addScriptListener(components.get(j), Amaz.CameraEvent.AFTER_RENDER, 'realBlit', this.script);
            this.cameraList.push(components.get(j));
          }
        }
      }
    }

    let sortingOrder = 0;

    for (let i = 0; i < entities.size(); i++) {
      const components = entities.get(i).components;
      for (let j = 0; j < components.size(); j++) {
        if (components.get(j).isInstanceOf('Renderer')) {
          console.log('wsr', 'is renderer');
          if (sortingOrder < components.get(j).sortingOrder) {
            sortingOrder = components.get(j).sortingOrder + 1;
          }
        }
      }
    }

    this.resultMeshRenderer.sortingOrder = sortingOrder;
    this.state = stateMap.grabing;
  }

  realBlit(sys, camera, eventType) {
    if (eventType === Amaz.CameraEvent.AFTER_RENDER && this.state === stateMap.grabing) {
      this.cameraCount += 1;
      if (this.cameraCount === this.cameraList.length) {
        console.log('wsr', 'realBlit');
        const inputTex = this.finalOutRT;
        //blit image
        this.cmdBuffer.clearAll();
        this.cmdBuffer.blitWithMaterial(inputTex, this.flipCaptureRT, this.grabMatInstance, 0);
        this.cmdBuffer.blit(inputTex, this.captureRT);
        this.scene.commitCommandBuffer(this.cmdBuffer);

        this.state = stateMap.showGrab; //AFTER_RENDER event callback is run after onUpdate,so ,next frame set meshrenderer enable=true
      }
    }
  }

  showGrab() {
    this.resultMeshRenderer.material.setTex('u_BGTexture', this.captureRT);
    this.resultMeshRenderer.enabled = true;
    this.state = stateMap.sendRequest;
  }

  submitToAlgo() {
    keyVals.set('dirty', true);
    Algorithm.setInputTexture(1, this.flipCaptureRT, keyVals);
    let simpleConfig = {
      custom_prompt: this.prompt,
      strength: this.strength,
    };
    let req_json = this.algoConfig ? this.algoConfig : JSON.stringify(simpleConfig);
    let req_service_name = this.serviceName;
    let req_region = this.region;

    Algorithm.setAlgorithmParamStr(this.graphName, nodeName, 'req_json', req_json);
    Algorithm.setAlgorithmParamStr(this.graphName, nodeName, 'req_service_name', req_service_name);
    Algorithm.setAlgorithmParamStr(this.graphName, nodeName, 'req_region', req_region);

    this.requestID++; //change the requestID so that algo node knows there's a new request
    Algorithm.setAlgorithmParamInt(this.graphName, nodeName, 'requestId', this.requestID);

    this.hasAlgoResult = false;
    this.state = stateMap.setDirty;
  }

  /**
   * if set dirty->true,so next frame,need set dirty->false，otherwise maybe have online crash
   * detail introduce,can read this doc: https://bytedance.feishu.cn/docx/N7NBdhqCRoN3gkxXOVucfMfynUd, [setInputTexture-dirty part]
   *
   */
  setAlgoDirty() {
    keyVals.set('dirty', false);
    Algorithm.setInputTexture(1, null, keyVals);
    this.state = stateMap.receiveResult;
  }

  checkForResult(deltaTime) {
    this.requestTimer = this.requestTimer + deltaTime;
    if (this.requestTimer > this.maxTimeout && this.state === stateMap.receiveResult) {
      //maxTimeout second, if have result ,so show result ,and do blend effect
      if (this.hasAlgoResult) {
        console.log('wsr', 'get result, start blend');
        this.resultMeshRenderer.enabled = true;
        this.blendTimer = 0;
        this.state = stateMap.blend;
      } else {
        //no result, process timeout or error
        console.log('wsr', 'timeout, no algo result');
        this.setErrorMeshAndMaterial();
        this.state = stateMap.requestError;
      }
      return;
    }

    const algResult = Algorithm.getAEAlgorithmResult();
    const scriptInfo = algResult.getScriptInfo(this.graphName, nodeName);

    if (!scriptInfo) {
      return;
    }
    if (!scriptInfo.outputMap) {
      return;
    }

    const jsOutMap = scriptInfo.outputMap;
    let outputImage = jsOutMap.get('gan_image'); //returned image result
    const statusCode = jsOutMap.get('status_code');
    const errorResult = jsOutMap.get('error');
    const onSuccess = jsOutMap.get('success');
    const respMessage = jsOutMap.get('message');
    const logID = jsOutMap.get('log_id');

    //Error Handling
    if (errorResult) {
      console.error('wsr', 'Text2X: Request Error ' + errorResult);
      return;
    }

    if (onSuccess === false) {
      console.error('wsr', 'Text2X: Request Timeout' + 'logid' + logID);
      return;
    }

    if (statusCode > 0) {
      console.log('wsr', 'Text2X: Request Status Code ' + statusCode);
      return;
    }

    if (outputImage) {
      let algWidth = 768; //AIGC algo default img size
      let algHeight = 1280;
      //received base64 data is decoded into Image in ProxyImpl.js
      this.ganImage = outputImage;
      this.ganTexture.filterMin = Amaz.FilterMode.LINEAR;
      this.ganTexture.filterMag = Amaz.FilterMode.LINEAR;
      this.ganTexture.width = algWidth;
      this.ganTexture.height = algHeight;
      this.ganTexture.storage(this.ganImage);

      //render the texture on screen
      this.resultMeshRenderer.material.setTex('u_AlbedoTexture', this.ganTexture);
      let ratio = this.width / this.height / (768 / 1280);
      this.resultMeshRenderer.material.setFloat('ratio', ratio);
      this.resultMeshRenderer.material.setFloat('u_bgprogress', 0.0);

      this.hasAlgoResult = true;
    }
  }

  blendStart(deltaTime) {
    this.blendTimer = this.blendTimer + deltaTime;
    if (this.blendTimer * this.blendSpeed < 1) {
      this.resultMeshRenderer.material.setFloat('u_bgprogress', this.blendTimer * this.blendSpeed);
    } else {
      this.resultMeshRenderer.material.setFloat('u_bgprogress', 1.0);
      this.state = stateMap.done;
      console.log('wsr', this.state);
    }
  }

  processResultError(deltaTime) {
    // this.errorWaitTimer = this.errorWaitTimer + deltaTime;
    // if(this.errorWaitTimer > this.maxErrorWaitTime){
    //     this.resultMeshRenderer.enabled = false;
    //     this.resetProperty();
    // }
  }

  onDestroy(sys) {
    console.log('wsr', 'ondestory');
    this.resetProperty();
  }

  setResultMeshAndMaterial() {
    if (!this.resultMesh) {
      this.resultMesh = this.createQuadMesh();
    }
    if (!this.resultMatInstance) {
      this.resultMatInstance = this.resultMat.instantiate();
    }

    let texture = new Amaz.Texture2D();
    this.resultMatInstance.setTex('u_BGTexture', texture);
    this.resultMatInstance.setTex('u_AlbedoTexture', texture);
    this.resultMatInstance.setFloat('u_bgprogress', 0.0);

    this.resultMeshRenderer.mesh = this.resultMesh;
    this.resultMeshRenderer.material = this.resultMatInstance;
  }

  setErrorMeshAndMaterial() {
    if (!this.errorMesh) {
      this.errorMesh = this.createQuadMesh(-0.4, 0.4, 0.5, 0.61);
    }
    this.errorMeshRenderer = this.entity.addComponent('MeshRenderer');
    this.errorMeshRenderer.autoSortingOrder = this.autoSortingOrder;
    this.errorMeshRenderer.sortingOrder = this.sortingOrder;

    this.errorMatInstance = this.errorMat.instantiate();
    this.errorMeshRenderer.mesh = this.errorMesh;
    this.errorMeshRenderer.material = this.errorMatInstance;

    this.errorTexture ? this.errorMeshRenderer.material.setTex('u_AlbedoTexture', this.errorTexture) : '';
  }

  createRenderTexture(_name, _width, _height) {
    let rt = new Amaz.RenderTexture();
    rt.name = _name;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    rt.width = _width;
    rt.height = _height;
    rt.colorFormat = Amaz.PixelFormat.RGBA8Unorm;
    return rt;
  }

  createEmptyMaterial(materialName) {
    let emptyMaterial = new Amaz.Material();
    emptyMaterial.name = materialName;

    let emptyXShader = new Amaz.XShader();
    emptyXShader.name = materialName;

    emptyMaterial.xshader = emptyXShader;

    let emptyProperties = new Amaz.PropertySheet();
    emptyMaterial.properties = emptyProperties;

    return emptyMaterial;
  }

  addBlitPassToMaterial(material, backend, vertCode, fragCode, params = {}) {
    let newPass = new Amaz.Pass();

    let vs = new Amaz.Shader();
    vs.type = Amaz.ShaderType.VERTEX;
    vs.source = vertCode;

    let fs = new Amaz.Shader();
    fs.type = Amaz.ShaderType.FRAGMENT;
    fs.source = fragCode;

    let shaderVec = new Amaz.Vector();
    shaderVec.pushBack(vs);
    shaderVec.pushBack(fs);

    let shaderMap = new Amaz.Map();
    shaderMap.insert(backend, shaderVec);

    newPass.shaders = shaderMap;

    let semantics = new Amaz.Map();
    semantics.insert('inPosition', Amaz.VertexAttribType.POSITION); // all post effect shaders must follow this tradition
    semantics.insert('inTexCoord', Amaz.VertexAttribType.TEXCOORD0); // all post effect shaders must follow this tradition
    newPass.semantics = semantics;

    let depthStencilState = new Amaz.DepthStencilState();
    depthStencilState.depthTestEnable = false;

    // add color blend
    let colorBlendState = null;
    if (params.blendEnable) {
      colorBlendState = new Amaz.ColorBlendState();
      const attVec = new Amaz.Vector();
      const attState = new Amaz.ColorBlendAttachmentState();
      attState.blendEnable = params.blendEnable;
      attState.srcColorBlendFactor = Amaz.BlendFactor.SRC_ALPHA;
      attState.dstColorBlendFactor = Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
      attState.srcAlphaBlendFactor = Amaz.BlendFactor.SRC_ALPHA;
      attState.dstAlphaBlendFactor = Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
      attState.ColorBlendOp = Amaz.BlendOp.ADD;
      attState.AlphaBlendOp = Amaz.BlendOp.ADD;
      attVec.pushBack(attState);
      colorBlendState.attachments = attVec;
    }

    let renderState = new Amaz.RenderState();
    renderState.depthstencil = depthStencilState;
    colorBlendState ? (renderState.colorBlend = colorBlendState) : '';

    newPass.renderState = renderState;

    material.xshader.passes.pushBack(newPass);

    return newPass;
  }

  //range:[-1,1]
  createQuadMesh(minX = -1, maxX = 1, minY = -1, maxY = 1) {
    let mesh = new Amaz.Mesh();
    let pos = new Amaz.VertexAttribDesc();
    pos.semantic = Amaz.VertexAttribType.POSITION;
    let uv = new Amaz.VertexAttribDesc();
    uv.semantic = Amaz.VertexAttribType.TEXCOORD0;

    let vads = new Amaz.Vector();
    vads.pushBack(pos);
    vads.pushBack(uv);
    mesh.vertexAttribs = vads;

    const vertexData = [
      maxX,
      maxY,
      0.0,
      1.0,
      1.0,
      maxX,
      minY,
      0.0,
      1.0,
      0.0,
      minX,
      minY,
      0.0,
      0.0,
      0.0,
      minX,
      maxY,
      0.0,
      0.0,
      1.0,
    ];
    let fv = new Amaz.FloatVector();
    for (let i = 0; i < vertexData.length; i++) {
      fv.pushBack(vertexData[i]);
    }
    mesh.vertices = fv;
    let subMesh = new Amaz.SubMesh();
    subMesh.primitive = Amaz.Primitive.TRIANGLES;
    const indexData = [3, 2, 1, 1, 0, 3]; //if mat not visible, change indices，or mat set cull none.
    let indices = new Amaz.UInt16Vector();
    for (let i = 0; i < indexData.length; i++) {
      indices.pushBack(indexData[i]);
    }
    subMesh.indices16 = indices;
    subMesh.mesh = mesh;
    mesh.addSubMesh(subMesh);
    return mesh;
  }
}

exports.AIDraw = AIDraw;
