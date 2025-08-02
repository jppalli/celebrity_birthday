//@ScriptComponent

'use strict';
const Amaz = effect.Amaz;
const JSAssetRuntimeManager = require('./JSAssetRuntimeManager');

const SCRIPT_NAME = 'FriendListTT';
const NETWORK_METHOD = {
  GET: 0,
  POST: 1,
  PUT: 2,
  PATCH: 3,
  DELETE: 4,
};
const NETWORK_STATUS = {
  Default: 0,
  Initialized: 1,
  Waiting: 2,
  Requesting: 3,
  Completed: 4,
  Destoryed: 5,
};
class FriendListTT {
  constructor() {
    this.name = SCRIPT_NAME;

    this.avatarMaterial = null; //avatar mat
    this.watermarkTexture = undefined;
    this.watermarkMat = undefined;

    this.friendIconHolderMap = {};
    this.friendNicknameHolderMap = {};
    this.friendIconObjs = {};
    this.friendNicknameObjs = {};

    this.tmpDefault = true;

    // animSeq
    this.animSeqCameraCompNames = new Amaz.StringVector();
    this.renderingCameraNum = 0;
    this.animseqCamLayer = 63;
    this.recordHeandledAnimIndex = 1;
    this.animHandleStarted = false;
    this.handledRestSeq = false;
    this.drawMap = {};
    this.animseqObjs = new Amaz.Vector();

    this.friendCount = 0;
    this.friendScene = 0;
    this.friendIconNicknameHolderMapMaxSize = 0;
    this.friendNicknameHolderMapSize = 0;
    this.friendIconHolderMapSize = 0;
    this.jsAssetUrlMap = {};

    // nickname
    this.nicknameReplaced = false;
    this.nickCameraCompNames = new Amaz.StringVector();
    this.nickNameCamLayer = 100;

    // lifecycle
    this.objSharePtrVec = new Amaz.Vector();

    // clean camera
    this.cameraComps = [];
    this.nickCameraComps = [];

    // network timeout/failure
    this.timeOutDuration = 5.0;
    this.timeCounter = 0.0;
    this.valieImg = [];

    this.cameraUsedFriendIndex = {};

    this.networkRequestID = -1;
    this.networkCenterTimeOut = 5000;
    this.networkRequestTime = -1;
    this.networkResponse = null;
    this.eventType = null;
    this.networkResult = {};
    this.networkStatus = NETWORK_STATUS.Default;
    this.networkCenterName = 'JSNetworkAlgorithm';
    this.networkCenter = Amaz.AmazingManager.getSingleton('NetworkCenter');
    this.networkCenter.initClient();
    this.networkListener = new Amaz.NetworkListener();
    this.networkStatus = NETWORK_STATUS.Initialized;

    this.listenerList = [];
    this.dynamicEntity = []; //save dynamic added entity
  }

  onRelease() {
    if (this.objSharePtrVec) {
      this.objSharePtrVec.clear();
    }

    for (const ent of this.dynamicEntity) {
      ent ? this.scene.removeEntity(ent) : '';
    }
    this.dynamicEntity = [];

    this.animHandleStarted = {scene_0: false, scene_2: false, scene_3: false};
    this.handledRestSeq = {scene_0: false, scene_2: false, scene_3: false};
    this.animSeqCameraCompNames = {
      scene_0: new Amaz.StringVector(),
      scene_2: new Amaz.StringVector(),
      scene_3: new Amaz.StringVector(),
    };
  }

  onDestroy() {
    this.animseqObjs = null;
    this.rootTrans = null;
    this.objSharePtrVec = null;
    this.animSeqCameraCompNames = null;
    this.nickCameraCompNames = null;
    this.cameraComps = null;
    this.nickCameraComps = null;
    this.friendList = null;
    this.networkResult = null;
    this.friendIconHolderMap = null;
    this.friendNicknameHolderMap = null;
    this.friendIconObjs = null;
    this.friendNicknameObjs = null;
    this.nickNameOnlyTable = null;
    this.headIconOnlyTable = null;
    this.nickHeadCommomTable = null;
    this.networkStatus = null;
    this.networkResponse = null;
    this.removeAllListener();
    for (const ent of this.dynamicEntity) {
      ent ? this.scene.removeEntity(ent) : '';
    }
    this.dynamicEntity = [];
  }

  addListener(target, type, callback, userdata) {
    Amaz.AmazingManager.addListener(target, type, callback, userdata);
    const listener = {};
    listener['target'] = target;
    listener['type'] = type;
    listener['callback'] = callback;
    listener['userdata'] = userdata;

    this.listenerList.push(listener);
  }

  removeListener(target, type, callback, userdata) {
    Amaz.AmazingManager.removeListener(target, type, callback, userdata);
    for (let i = 0; i < this.listenerList.length; i++) {
      const listener = this.listenerList[i];
      if (listener.target === target && listener.type === type && listener.userdata === userdata) {
        this.listenerList.splice(i, 1);
        break;
      }
    }
  }

  removeAllListener() {
    for (let i = 0; i < this.listenerList.length; i++) {
      const listener = this.listenerList[i];
      Amaz.AmazingManager.removeListener(listener.target, listener.type, listener.callback, listener.userdata);
    }
    this.listenerList = [];
  }

  // download friend image one by one
  downloadFriendImage() {
    if (this.isDownloading) {
      console.log('##friendList## state is in downloading...');
      return;
    }

    const obj = {};
    obj.interface = 'download';
    obj.data = [];
    for (let i = 1; i <= this.friendList.urlList.length; i++) {
      const data = {};
      data.needUpzip = 0;
      data.url = [];
      data.url.push(this.friendList.urlList[i - 1]);
      obj.data.push(data);
    }

    const info = JSON.stringify(obj);
    this.isDownloading = true;
    this.scene.postMessage(0x29, 0x29, this.getRandomInt(10000), info);
    console.log('##friendList## downloadFriendImage postMessage: ' + info.toString());
  }

  // finish downloading
  onFinishingDownloadImage(infoObj) {
    if (infoObj === null || infoObj.file_paths === null) {
      return;
    }

    // check dowloading status
    if (this.getFriendListState !== 2 || this.isDownloading === false) {
      console.log('##friendList## the downloading state is wrong!!!');
      return;
    }
    this.isDownloading = false;
    this.timeCounter = 0; // set timer as 0

    const obj = infoObj;
    const pngMeta = new Amaz.PngMeta();
    pngMeta.needFlipY = true;

    for (let i = 0; i < obj.file_paths.length; i++) {
      const tex = this.scene.assetMgr.SyncLoadWithMeta(obj.file_paths[i].path, pngMeta);
      this.objSharePtrVec.pushBack(tex);
      this.friendList.texTab.push(tex);
      this.valieImg.push(obj.file_paths[i].success);
    }

    this.getFriendListState = 3;
  }

  // init friendList
  initFriendList(infoObj) {
    if (infoObj === null || infoObj.body === null) {
      return;
    }

    if (this.getFriendListState === 0) {
      // reading friend list
      const success = infoObj.success;
      const statusCode = infoObj.status_code;
      if (statusCode === 0) {
        this.myself = infoObj.myself;
        const friendCount = infoObj.friendCount;
        const nicknameList = [];
        const urlList = [];

        // random friend list
        const t = [];
        const p = [];
        for (let i = 1; i <= friendCount; i++) {
          t[i - 1] = i;
        }
        for (let j = 2; j <= friendCount; j++) {
          const index = this.getRandomInt(friendCount);
          const tmp = t[j - 1];
          t[j - 1] = t[index - 1];
          t[index - 1] = tmp;
        }
        for (let k = 1; k <= Math.min(this.friendCount, friendCount); k++) {
          p[k - 1] = t[k - 1];
        }

        console.log('##friendList## initFriendList() 230 friendCount ' + friendCount);
        if (friendCount > 0) {
          for (let i = 1; i <= p.length; i++) {
            const nickname = infoObj['nickname' + p[i - 1]];
            const avatarUrl = infoObj['url' + p[i - 1]];
            nicknameList.push(nickname);
            urlList.push(avatarUrl);
          }

          this.friendList.nickNameList = nicknameList;
          this.friendList.urlList = urlList;
          this.getFriendListState = 2;
          this.curDownloadIndex = -1;
          this.friendList.texTab = [];
          this.downloadFriendImage();
        } else {
          this.friendList.nickNameList = nicknameList;
          this.getFriendListState = 3;
        }
      }
    }
  }

  createSprite2DRendererMaterial() {
    const blitXShader = new Amaz.XShader();
    const vs = new Amaz.Shader();
    vs.type = Amaz.ShaderType.VERTEX;
    vs.source = `
        precision highp float;
        attribute vec2 position;
        attribute vec2 texcoord0;
        varying vec2 fTexCoord;
        uniform mat4 u_MVP;
        void main()
        {
            fTexCoord = texcoord0;
            gl_Position = vec4(position, 0.0, 1.0);
        }
        `;

    const fs = new Amaz.Shader();
    fs.type = Amaz.ShaderType.FRAGMENT;
    fs.source = ` 
        precision highp float;

        varying vec2 fTexCoord;
        uniform sampler2D _MainTex;
        void main() 
        {
            vec4 color = texture2D(_MainTex,fTexCoord);
            gl_FragColor = color;
        }
        `;

    const shaders = new Amaz.Map();
    const shaderList = new Amaz.Vector();
    shaderList.pushBack(vs);
    shaderList.pushBack(fs);
    shaders.insert('gles2', shaderList);
    const blitPass = new Amaz.Pass();
    blitPass.shaders = shaders;
    const seman = new Amaz.Map();
    seman.insert('position', Amaz.VertexAttribType.POSITION);
    seman.insert('texcoord0', Amaz.VertexAttribType.TEXCOORD0);
    blitPass.semantics = seman;

    // render state
    const renderState = new Amaz.RenderState();

    // depth state
    const depthStencilState = new Amaz.DepthStencilState();
    depthStencilState.depthTestEnable = false;
    renderState.depthstencil = depthStencilState;
    blitPass.renderState = renderState;
    blitXShader.passes.pushBack(blitPass);
    const sprite2DRenderMaterial = new Amaz.Material();
    sprite2DRenderMaterial.xshader = blitXShader;
    return sprite2DRenderMaterial;
  }

  createRenderTexture() {
    const rt = new Amaz.RenderTexture();
    rt.depth = 1;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.NONE;
    rt.attachment = Amaz.RenderTextureAttachment.NONE;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    return rt;
  }

  constructStr(textComp, oriStr) {
    textComp.str = '@' + oriStr;
    textComp.forceTypeSetting();
    if (textComp.letters.size() > 6) {
      let str = '';
      for (let i = 1; i <= 6; i++) {
        str = str + textComp.letters.get(i - 1).utf8;
      }
      str = str + '...';
      textComp.str = ''; // XXX: new text system have bug when directly modify str, this line can  be removed  after furture sdk fixes.
      textComp.str = str;
    }
  }

  drawNameRT(resId, name, layer, str) {
    const entity = this.scene.createEntity('nicknameCamera' + layer.toString());
    entity.addComponent('Transform');
    entity.addComponent('Camera');
    const cameraE = entity.getComponent('Camera');
    cameraE.name = 'nicknameCamera' + layer.toString();
    cameraE.clearColor = new Amaz.Vector4f(0, 0, 0, 0);
    cameraE.alwaysClear = true;
    cameraE.clearType = effect.Amaz.CameraClearType.COLOR;
    cameraE.type = Amaz.CameraType.ORTHO;

    const camPos = entity.getComponent('Transform');
    if (this.rootTrans) {
      this.rootTrans.addTransform(camPos);
    }
    camPos.setWorldPosition(new Amaz.Vector3f(0, 0, 10));

    const camRT = this.createRenderTexture();
    camRT.width = 300;
    camRT.height = 50;
    entity.layer = layer;

    const lmask = '0x0';
    const d2 = new Amaz.DynamicBitset(128, lmask);
    d2.set(layer, true);
    cameraE.layerVisibleMask = d2;

    cameraE.renderTexture = camRT;
    const nickNameE = this.scene.createEntity('nickName');
    nickNameE.layer = layer;
    nickNameE.addComponent('Transform');
    nickNameE.addComponent('Text');
    const nickNameTrans = nickNameE.getComponent('Transform');
    const nickNameText = nickNameE.getComponent('Text');
    this.constructStr(nickNameText, str);
    nickNameText.activeTextStyle.fontSize = 220;
    nickNameText.activeTextStyle.fontfamily = 'font/friendListFont.ttf';
    nickNameText.activeTextStyle.outlineEnabled = true;
    const textRender = nickNameText.getRenderer();
    textRender.sortingOrder = 2;
    nickNameText.forceTypeSetting();
    console.log('##friendList## nameRT construct sdf str: ' + str);

    // resolution adjustment
    const h = Amaz.AmazingManager.getSingleton('BuiltinObject').getOutputTextureHeight();
    const scale = (1.0 * h) / 1280;
    nickNameTrans.localScale = new Amaz.Vector3f(scale, scale, scale);

    this.drawMap[resId] = camRT;

    this.dynamicEntity.push(entity);
    this.dynamicEntity.push(nickNameE);
    return cameraE;
  }

  newSprite2DAndText(layer, iconTex, str) {
    const entity = this.scene.createEntity('renderCamera' + layer.toString());
    entity.addComponent('Transform');
    const transCam = entity.getComponent('Transform');
    entity.addComponent('Camera');
    const cameraComp = entity.getComponent('Camera');
    cameraComp.clearColor = new Amaz.Vector4f(0, 0, 0, 0);
    cameraComp.alwaysClear = true;
    cameraComp.clearType = effect.Amaz.CameraClearType.COLOR;
    cameraComp.type = Amaz.CameraType.ORTHO;

    // set layer
    entity.layer = layer;
    const lmask = '0x0';
    const d2 = new Amaz.DynamicBitset(128, lmask);
    d2.set(layer, true);
    cameraComp.layerVisibleMask = d2;

    const camRT = this.createRenderTexture();
    camRT.width = 300;
    camRT.height = 300;
    cameraComp.renderTexture = camRT;
    cameraComp.name = 'animseqCamera' + layer.toString();

    const nickNameE = this.scene.createEntity('nickName' + layer.toString());
    nickNameE.layer = layer;
    nickNameE.addComponent('Transform');
    nickNameE.addComponent('Text');
    const nickNameTrans = nickNameE.getComponent('Transform');
    const nickNameText = nickNameE.getComponent('Text');
    this.constructStr(nickNameText, str);
    const scale = 1.4;
    nickNameText.activeTextStyle.fontSize = 30 * scale;
    nickNameText.activeTextStyle.fontfamily = 'font/friendListFont.ttf';
    nickNameText.activeTextStyle.outlineEnabled = true;
    nickNameText.activeTextStyle.outlineWidth = 0.1 * scale;
    nickNameText.forceTypeSetting();
    console.log('##friendList## sprite2DAndText cosntruct str sdf: ' + str);

    // resolution adjustment
    const h = Amaz.AmazingManager.getSingleton('BuiltinObject').getOutputTextureHeight();
    const tmpScale = h / 1280; // tocheck: if init scale is 1
    nickNameTrans.localScale = new Amaz.Vector3f(tmpScale, tmpScale, tmpScale);

    const sprite2DRendererEnt = this.scene.createEntity('2DRenderer' + layer.toString());
    sprite2DRendererEnt.layer = layer;
    sprite2DRendererEnt.addComponent('Transform');
    const transSp2d = sprite2DRendererEnt.getComponent('Transform');
    sprite2DRendererEnt.addComponent('Sprite2DRenderer');
    transCam.addTransform(transSp2d);
    transCam.addTransform(nickNameTrans);

    if (this.rootTrans) {
      this.rootTrans.addTransform(transCam);
    }
    transSp2d.localPosition = new Amaz.Vector3f(0.0, 0.0, -10.0);
    nickNameTrans.localPosition = new Amaz.Vector3f(0.0, -0.8, -1.6);

    // remove camera
    transCam.localPosition = new Amaz.Vector3f(layer * 500, 0.0, 0.0);

    // sprite2drenderer
    const sprite2DRenderer = sprite2DRendererEnt.getComponent('Sprite2DRenderer');
    sprite2DRenderer.stretchMode = Amaz.StretchMode.texture_size;
    // let sprite2DMaterial = this.createSprite2DRendererMaterial();
    const sprite2DMaterial = this.avatarMaterial.instantiate();
    sprite2DRenderer.material = sprite2DMaterial;
    sprite2DMaterial.setTex('_MainTex', iconTex);

    this.dynamicEntity.push(entity);
    this.dynamicEntity.push(nickNameE);
    this.dynamicEntity.push(sprite2DRendererEnt);
    return cameraComp;
  }

  onAfterNickRender(userdata, camera, eventType) {
    if (eventType === Amaz.CameraEvent.AFTER_RENDER && camera !== null) {
      if (false === userdata.nickCameraCompNames.has(camera.name)) {
        console.log('##friendList## ' + camera.name + ' camera is not found');
        return;
      }

      console.log(
        '##friendList## onAfterNickRenderer current skipcount1 and drawMap size: ' +
          userdata.skipCount2.toString() +
          userdata.tablelength(userdata.drawMap).toString()
      );

      if (userdata.skipCount2 < userdata.tablelength(userdata.drawMap)) {
        userdata.skipCount2 += 1;
        return;
      }

      if (userdata.nicknameReplaced) {
        return;
      }

      for (const k in userdata.drawMap) {
        const tex = userdata.jsAssetUrlMap[k].netname;
        userdata.objSharePtrVec.pushBack(tex);
        tex.image = userdata.drawMap[k].readImageData();
      }

      camera.entity.visible = false; // here
      userdata.nickCameraCompNames.erase(camera.name);
      if (userdata.nickCameraCompNames.empty()) {
        userdata.nicknameReplaced = true;
      }
    }
  }

  writeImg(imgContent, absPath) {
    const f = fs.readFileSync(absPath);
    if (f) {
      fs.writeFileSync(absPath, imgContent);
      console.log('##friendList## write file successfully ' + absPath);
      return true;
    } else {
      console.log('##friendList## read file fail');
      return false;
    }
  }

  onAfterRender(userdata, camera, eventType) {
    if (eventType === Amaz.CameraEvent.AFTER_RENDER && camera !== null) {
      if (false === userdata.animSeqCameraCompNames.has(camera.name)) {
        return;
      }

      if (userdata.skipCount < userdata.animSeqCameraCompNames.size()) {
        userdata.skipCount += 1;
        return;
      }

      for (let i = 1; i <= userdata.animseqObjs.size(); i++) {
        const tSize = userdata.animseqObjs.get(i - 1).atlases.size();
        if (tSize >= userdata.recordHeandledAnimIndex) {
          const img = camera.renderTexture.readImageData();
          img.needFlipY = false;
          const imgUint8Vec = img.convertToPNGBin();
          const path =
            userdata.scene.assetMgr.rootDir +
            'Library/Artifact/00000000-0000-0000-0000-0000000011e0/friendSeq' +
            userdata.recordHeandledAnimIndex +
            '.png';
          const arr_buf = new ArrayBuffer(imgUint8Vec.size());
          Amaz.AmazingUtil.getArrayBuffer(imgUint8Vec, arr_buf);
          const res = userdata.writeImg(arr_buf, path);
          userdata.animseqObjs.get(i - 1).atlases.get(userdata.recordHeandledAnimIndex - 1).uri = path;
        }
      }
      userdata.mappedFriendIndexTable.push(userdata.cameraUsedFriendIndex[camera.name]);
      userdata.animSeqCameraCompNames.erase(camera.name);

      // disable the camera's entity
      camera.entity.visible = false;
      userdata.cameraComps.push(camera);
      userdata.recordHeandledAnimIndex += 1;
    }
  }

  tablelength(T) {
    let count = 0;
    for (const k in T) {
      count += 1;
    }
    return count;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  replaceAllDefaultImgs() {
    let count = 0;
    for (const k0 in this.nickHeadCommomTable) {
      // let tmpIndex = count % 10 + 1;
      const tmpIndex = ((k0 - 1) % 10) + 1;
      count += 1;
      // let imgTex = this.scene.assetMgr.SyncLoad(this.friendIconHolderMap[k0]);
      const pngMeta = new Amaz.PngMeta();
      pngMeta.needFlipY = true;

      const iconTmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[tmpIndex - 1], pngMeta);
      const imgTex = this.jsAssetUrlMap[k0].profilepic;
      this.objSharePtrVec.pushBack(iconTmpTex);
      // imgTex.storage(iconTmpTex.image);
      imgTex.image = iconTmpTex.image;

      // let nickTex = this.scene.assetMgr.SyncLoad(this.friendNicknameHolderMap[k0]);
      const nickTex = this.jsAssetUrlMap[k0].netname;
      const tmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultNickImg[tmpIndex - 1], pngMeta);
      this.objSharePtrVec.pushBack(tmpTex);
      // nickTex.storage(tmpTex.image);
      nickTex.image = tmpTex.image;
    }

    // replace images that only in nickname map
    let nickNameCount = count;
    for (const k1 in this.nickNameOnlyTable) {
      // let tmpIndex = nickNameCount % 10 + 1;
      const tmpIndex = ((k1 - 1) % 10) + 1;
      nickNameCount += 1;

      // let nickTex = this.scene.assetMgr.SyncLoad(this.friendNicknameHolderMap[k1]);
      const nickTex = this.jsAssetUrlMap[k1].netname;
      const pngMeta = new Amaz.PngMeta();
      pngMeta.needFlipY = true;

      const tmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultNickImg[tmpIndex - 1], pngMeta);
      this.objSharePtrVec.pushBack(tmpTex);
      // nickTex.storage(tmpTex.image);
      nickTex.image = tmpTex.image;
    }

    // replace images that only in headicon map
    let headIconCount = count;
    for (const k2 in this.headIconOnlyTable) {
      // let tmpIndex = headIconCount % 10 + 1;
      const tmpIndex = ((k2 - 1) % 10) + 1;
      headIconCount += 1;
      const imgTex = this.jsAssetUrlMap[k2].profilepic;
      const pngMeta = new Amaz.PngMeta();
      pngMeta.needFlipY = true;

      const iconTmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[tmpIndex - 1], pngMeta);
      this.objSharePtrVec.pushBack(iconTmpTex);
      imgTex.image = iconTmpTex.image;
    }
  }

  buildNetworkCenterRequest(friendCount) {
    // ask for friend list
    const request = new Object();
    const url = 'https://api.tiktokv.com/tiktok/user/relation/mutual_friends/list/v1?scene=3&count=' + friendCount;
    const headerMap = new Amaz.Map();
    headerMap.insert('Content-Type', 'application/octet-stream');

    request.method = NETWORK_METHOD.GET;
    request.binary = true;
    request.url = url;
    request.headerMap = headerMap;
    return request;
  }

  sendNetworkCenterRequest(request) {
    console.log('##friendList## network set request');
    this.networkCenter.get(this.networkListener, request.url, request.headerMap);
    this.networkStatus = NETWORK_STATUS.Requesting;
    console.log('##friendList## network set request');
  }

  networkCallBack(userData, networkResponse, eventType) {
    if (this.networkStatus !== NETWORK_STATUS.Requesting) {
      console.log('networkCallback in wrong status ' + this.networkStatus.toString());
      this.networkResponse = null;
      return;
    }

    if (eventType === Amaz.NetworkStatus.NETWORK_SUCCESS) {
      console.log('networkCallback response success, status code: ' + networkResponse.statusCode);
      console.log('network response body: ' + networkResponse.body);

      this.networkResponse = networkResponse;
      this.eventType = eventType;
      this.networkStatus = NETWORK_STATUS.Completed;
    } else if (eventType === Amaz.NetworkStatus.NETWORK_FAIL) {
      console.log('networkCallback response error');
      console.log('network response error: ' + networkResponse.errorDesc);

      this.networkResponse = networkResponse;
      this.eventType = eventType;
      this.networkStatus = NETWORK_STATUS.Completed;
    } else if (eventType === Amaz.NetworkStatus.NETWORK_CANCEL) {
      console.log('networkCallback response cancel');
      console.log('networkCallback response cancel' + networkResponse.body);

      this.networkResponse = networkResponse;
      this.eventType = eventType;
      this.networkStatus = NETWORK_STATUS.Completed;
    }
  }

  networkFillResult() {
    const result = {};
    let success = this.networkResponse.succeed;
    result.requestID = this.networkRequestID;
    result.response = this.networkResponse;
    console.log('##friendList## network fill result 695 ' + success.toString());
    if (success) {
      const statusCode = this.networkResponse.statusCode;
      if (statusCode < 200 || statusCode > 299) {
        success = false;
      }
      result.body = this.networkResponse.body;
      this.onNetworkRespSuccess(result, this.networkResponse.body);
    } else {
      const error = this.networkResponse.errorDesc;
      result.error = error;
    }
    result.success = success;
    return result;
  }

  onNetworkRespSuccess(response, body) {
    try {
      console.log('##friendList## network resp success 713');
      const obj = JSON.parse(body);
      const statusCode = obj.status_code;
      response.status_code = statusCode;

      if (statusCode === 0) {
        let friendCount = 0;
        if (obj.friends !== null) {
          for (const k in obj.friends) {
            friendCount += 1;
          }
          // friendsCount = obj.friends.length;
        } else {
          friendCount = 0;
        }
        if (friendCount > 0) {
          let repeatCount = 0;
          response.friendCount = friendCount;
          response.myself = 0;
          for (let i = 1; i <= friendCount; i++) {
            const nickname = obj.friends[i - 1].nickname;
            response['nickname' + i] = nickname;

            let url = obj.friends[i - 1].avatar_larger.url_list[1];
            if (url.search('.webp') !== -1) {
              url = obj.friends[i - 1].avatar_larger.url_list[2];
              console.log('onNetworkRespSuccess webp: ' + url + ' nickname: ' + nickname);
            }

            if (url.search('4La6pbZD34GEf2XUoepiKIu0g%2Bs%3D')) {
              if (repeatCount === 1) {
                url = obj.friends[i - 1].avatar_medium.url_list[1];
                if (url.search('.webp') !== -1) {
                  url = obj.friends[i - 1].avatar_medium.url_list[2];
                }
              } else if (repeatCount === 2) {
                repeatCount = repeatCount + 1;
                url = obj.friends[i - 1].avatar_300x300.url_list[1];
                if (url.search('.webp') !== -1) {
                  url = obj.friends[i - 1].avatar_300x300.url_list[2];
                }
              } else if (repeatCount === 3) {
                repeatCount = repeatCount + 1;
                url = obj.friends[i - 1].avatar_168x168.url_list[1];
                if (url.search('.webp') !== -1) {
                  url = obj.friends[i - 1].avatar_168x168.url_list[2];
                }
              } else if (repeatCount === 4) {
                repeatCount = repeatCount + 1;
                url = obj.friends[i - 1].avatar_thumb.url_list[1];
                if (url.search('.webp') !== -1) {
                  url = obj.friends[i - 1].avatar_thumb.url_list[2];
                }
              }
              repeatCount = repeatCount + 1;
            }
            response['url' + i] = url;
            console.log('onNetworkRespSuccess webp nickname: ' + nickname + ' final: ' + url);
          }
        } else {
          response.friendCount = 0;
          response.nickname1 = 'myself';
          response.url1 = '';
          response.myself = 1;
        }
      }
      // console.log("##friendList## network resp success 768");
    } catch (e) {
      console.log('JSNetworkAlgorithm body not a json');
    }
  }

  executeNetworkCenter() {
    this.networkCenter.update();

    if (this.networkStatus === NETWORK_STATUS.Initialized) {
      this.networkStatus = NETWORK_STATUS.Waiting;
    }

    // console.log("##friendList## network status: " + this.networkStatus);
    if (this.networkStatus === NETWORK_STATUS.Waiting) {
      if (this.hasNewRequest === true) {
        const request = this.buildNetworkCenterRequest(Math.max(this.friendCount, 50));
        if (request) {
          this.sendNetworkCenterRequest(request);
          this.networkStatus = NETWORK_STATUS.Requesting;
          this.networkRequestTime = Date.now();
        }
        this.hasNewRequest = false;
      }
    } else if (this.networkStatus === NETWORK_STATUS.Requesting) {
      const diff = Date.now() - this.networkRequestTime;
      if (diff >= this.networkCenterTimeOut) {
        this.networkResult.succeed = false;
        this.networkResult.errorDesc = 'request timeout exceed 5s';
        this.networkResult.status = Amaz.NetworkStatus.NETWORK_FAIL;
        this.getFriendListState = 3;
        this.friendList.nickNameList = {};
        this.networkStatus = NETWORK_STATUS.Waiting;
        console.log('##friendList## network time out');
      }
    } else if (this.networkStatus === NETWORK_STATUS.Completed) {
      if (this.networkResponse) {
        this.networkResult = this.networkFillResult();
        console.log('##friendList## network getFriendListState: ' + this.getFriendListState);
        if (this.getFriendListState === 0) {
          this.initFriendList(this.networkResult);
        }
      }
      this.networkResponse = null;
      this.networkStatus = NETWORK_STATUS.Waiting;
    }
  }

  updateTex() {
    // console.log("##friendList## 565 listState: " + this.getFriendListState + " status: " + this.status);
    if (this.getFriendListState === 3 && this.status === 0) {
      const texList = [];
      // console.log("##friendList## updateTex enter " + this.friendList.nickNameList.length.toString());

      if (this.friendList.nickNameList.length === 0 && this.tmpDefault) {
        this.replaceAllDefaultImgs();
        this.tmpDefault = false;
      }

      if (
        (this.friendIconHolderMapSize > 0 || this.friendNicknameHolderMapSize > 0) &&
        (this.friendList.nickNameList.length > 0 || this.friendList.urlList.length > 0) &&
        this.tmpDefault === true
      ) {
        let randomNum = this.getRandomInt(Math.max(this.friendList.nickNameList.length - 1, 0));

        // process keys that both in nickname and icon
        for (const k0 in this.nickHeadCommomTable) {
          this.count += 1;

          // texList[this.count] = this.scene.assetMgr.SyncLoad(this.friendIconHolderMap[k0]);
          // texList[this.count] = this.jsAssetUrlMap[k0].profilepic;
          if (this.count >= this.friendList.nickNameList.length) {
            let imgIndex = this.count - this.friendList.nickNameList.length;
            imgIndex = ((k0 - 1) % 10) + 1;
            const pngMeta = new Amaz.PngMeta();
            pngMeta.needFlipY = true;

            const headIconTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[imgIndex - 1], pngMeta);
            this.objSharePtrVec.pushBack(headIconTex);
            // texList[this.count].storage(headIconTex.image);
            this.jsAssetUrlMap[k0].profilepic.image = headIconTex.image;
            // let nickTex = this.scene.assetMgr.SyncLoad(this.friendNicknameHolderMap[k0]);
            const nickTex = this.jsAssetUrlMap[k0].netname;
            const tmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultNickImg[imgIndex - 1], pngMeta);
            this.objSharePtrVec.pushBack(tmpTex);
            // nickTex.storage(tmpTex.image);
            nickTex.image = tmpTex.image;
          } else {
            randomNum += 1;
            if (randomNum >= this.friendList.nickNameList.length) {
              randomNum = 0;
            }
            console.log(
              '##friendList## stroage index:' +
                randomNum.toString() +
                ' texList length: ' +
                texList.length +
                ' texTabSize: ' +
                this.friendList.texTab.length
            );
            // texList[this.count].storage(this.friendList.texTab[randomNum].image);
            if (this.valieImg[randomNum] === 1) {
              this.jsAssetUrlMap[k0].profilepic.image = this.friendList.texTab[randomNum].image;
            } else {
              let imgIndex = this.count - this.friendList.nickNameList.length;
              imgIndex = ((k0 - 1) % 10) + 1;
              const pngMeta = new Amaz.PngMeta();
              pngMeta.needFlipY = true;

              const headIconTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[imgIndex - 1], pngMeta);
              this.objSharePtrVec.pushBack(headIconTex);
              this.jsAssetUrlMap[k0].profilepic.image = headIconTex.image;
            }

            this.nickNameCamLayer = this.increaseLayer(this.nickNameCamLayer);
            const nickOriRelativePath = this.friendNicknameHolderMap[k0];
            const camComp = this.drawNameRT(
              k0,
              nickOriRelativePath,
              this.nickNameCamLayer,
              this.friendList.nickNameList[randomNum]
            );
            this.nickCameraComps.push(camComp);
            this.nickCameraCompNames.pushBack(camComp.name);
            // Amaz.AmazingManager.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
            this.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          }
        }

        // process keys that only in nickname
        for (const k1 in this.nickNameOnlyTable) {
          this.count += 1;
          randomNum += 1;

          if (this.count >= this.friendList.nickNameList.length) {
            // let imgIndex = this.count - this.friendList.nickNameList.length;
            const imgIndex = ((k1 - 1) % 10) + 1;
            const nickTex = this.jsAssetUrlMap[k1].netname;
            const pngMeta = new Amaz.PngMeta();
            pngMeta.needFlipY = true;

            const tmpTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultNickImg[imgIndex - 1], pngMeta);
            console.log('##friendList## nickname image idx: ' + imgIndex + ' resId: ' + k1);
            this.objSharePtrVec.pushBack(tmpTex);
            // nickTex.storage(tmpTex.image);
            nickTex.image = tmpTex.image;
          } else {
            this.nickNameCamLayer = this.increaseLayer(this.nickNameCamLayer);
            const nickOriRelativePath = this.friendNicknameHolderMap[k1];

            if (randomNum >= this.friendList.nickNameList.length) {
              randomNum = 0;
            }
            const camComp = this.drawNameRT(
              k1,
              nickOriRelativePath,
              this.nickNameCamLayer,
              this.friendList.nickNameList[randomNum]
            );
            this.nickCameraComps.push(camComp);
            this.nickCameraCompNames.pushBack(camComp.name);
            // Amaz.AmazingManager.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
            this.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          }
        }

        // process keys that only in icon
        for (const k2 in this.headIconOnlyTable) {
          this.count += 1;
          randomNum += 1;
          if (this.count >= this.friendList.urlList.length) {
            const imgIndex = ((k2 - 1) % 10) + 1;
            // imgIndex = imgIndex % 10 + 1;
            const pngMeta = new Amaz.PngMeta();
            pngMeta.needFlipY = true;

            const headIconTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[imgIndex - 1], pngMeta);
            this.objSharePtrVec.pushBack(headIconTex);
            this.jsAssetUrlMap[k2].profilepic.image = headIconTex.image;
          } else {
            if (randomNum >= this.friendList.urlList.length) {
              randomNum = 0;
            }
            if (this.valieImg[randomNum] === 1) {
              this.jsAssetUrlMap[k2].profilepic.image = this.friendList.texTab[randomNum].image;
            } else {
              const imgIndex = ((k2 - 1) % 10) + 1;
              const pngMeta = new Amaz.PngMeta();
              pngMeta.needFlipY = true;
              console.log('imgIndex: ', imgIndex);

              const headIconTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultImg[imgIndex - 1], pngMeta);
              this.objSharePtrVec.pushBack(headIconTex);
              this.jsAssetUrlMap[k2].profilepic.image = headIconTex.image;
            }
          }

          // texList[this.count] = this.scene.assetMgr.SyncLoad(this.friendIconHolderMap[k2]);
          // texList[this.count].storage(this.friendList.texTab[randomNum].image);
          // texList[this.count].image = this.friendList.texTab[randomNum].image;
        }
      }

      if (this.animseqObjs && false === this.animHandleStarted) {
        const realNum = Math.min(this.friendIconNicknameHolderMapMaxSize, this.friendList.nickNameList.length);
        this.renderingCameraNum = realNum;

        if (realNum > 0) {
          for (let i = 1; i <= realNum; i++) {
            this.animseqCamLayer = this.increaseLayer(this.animseqCamLayer);
            const camComp = this.newSprite2DAndText(
              this.animseqCamLayer,
              this.friendList.texTab[i - 1],
              this.friendList.nickNameList[i - 1]
            );
            this.animSeqCameraCompNames.pushBack(camComp.name);
            this.cameraUsedFriendIndex[camComp.name] = i - 1;
            // Amaz.AmazingManager.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterRender, this);
            this.addListener(camComp, Amaz.CameraEvent.AFTER_RENDER, this.onAfterRender, this);
          }
        }
        this.animHandleStarted = true;
      }
      this.status = 1;
    }

    if (this.status === 0 && this.timeCounter >= this.timeOutDuration) {
      this.status = 404; // time out
      if (this.tmpDefault) {
        this.replaceAllDefaultImgs();
        this.tmpDefault = false;
      }
    }
  }

  increaseLayer(oldLayer) {
    let newLayer = oldLayer + 1;
    if (newLayer === 66 || newLayer === 77 || newLayer === 88 || newLayer === 99 || newLayer === 127) {
      newLayer += 1;
    }
    return newLayer;
  }

  onStart() {
    if (this.checkHasSocialKitTexture() === false) {
      console.log('##friendList## No social resources are being used');
      return;
    }

    this.skipCount = 0;
    this.skipCount2 = 0;
    this.getFriendListState = 0;
    this.rootTrans = null;
    this.friendList = {}; //include {nickNameList secUidList uidList TexTab}
    this.status = 0;
    this.count = -1;

    this.nickNameOnlyTable = {};
    this.headIconOnlyTable = {};
    this.nickHeadCommomTable = {};

    if (this.networkListener && this.script) {
      this.script.addScriptListener(
        this.networkListener,
        Amaz.NetworkStatus.NETWORK_START,
        'networkCallBack',
        this.script
      );
      this.script.addScriptListener(
        this.networkListener,
        Amaz.NetworkStatus.NETWORK_UPDATE,
        'networkCallBack',
        this.script
      );
      this.script.addScriptListener(
        this.networkListener,
        Amaz.NetworkStatus.NETWORK_SUCCESS,
        'networkCallBack',
        this.script
      );
      this.script.addScriptListener(
        this.networkListener,
        Amaz.NetworkStatus.NETWORK_FAIL,
        'networkCallBack',
        this.script
      );
      this.script.addScriptListener(
        this.networkListener,
        Amaz.NetworkStatus.NETWORK_CANCEL,
        'networkCallBack',
        this.script
      );
    }

    if (this.scene.findEntityBy('@SceneRoot')) {
      this.rootTrans = this.scene.findEntityBy('@SceneRoot').getComponent('Transform');
    }

    const jsAssetMap = this.scene.assetMgr.getAllScriptCustomAssets();
    const jsAssetPropertyMap = this.scene.assetMgr.getAllCustomAssetsProperty();
    const keys = jsAssetMap.getVectorKeys();
    const propertyKeys = jsAssetPropertyMap.getVectorKeys();
    for (let i = 0; i < keys.size(); i++) {
      const k = keys.get(i);
      const propertyK = propertyKeys.get(i);
      const obj = jsAssetMap.get(k);
      const property = jsAssetPropertyMap.get(propertyK);
      const imgAsset = JSAssetRuntimeManager.instance().getAsset(obj);
      // let friendCount = imgAsset.friendCount;
      if (imgAsset !== null) {
        const extName = imgAsset.extName;

        if (extName !== null && extName === '.oskseqjsatt') {
          // nicknameIconSeq
          const animseq = imgAsset.textureSequence.getNative();
          this.watermarkTexture = imgAsset.watermarkTexture.getNative();
          this.watermarkMat = imgAsset.watermarkMat.getNative();
          this.avatarMaterial = imgAsset.avatarMat.getNative();
          if (animseq !== null) {
            const atlases = animseq.atlases;
            if (atlases !== null) {
              this.animseqObjs.pushBack(animseq);
              const atlasesNum = atlases.size();
              this.friendIconNicknameHolderMapMaxSize = Math.max(this.friendIconNicknameHolderMapMaxSize, atlasesNum);
            }
          }
          this.friendCount = Math.max(this.friendCount, this.friendIconNicknameHolderMapMaxSize);
        } else if (extName !== null && extName === '.jssktexturett') {
          const textureType = imgAsset.socialkitTextureType;
          this.watermarkTexture = imgAsset.watermarkTexture;
          this.watermarkMat = imgAsset.watermarkMat;
          this.avatarMaterial = imgAsset.avatarMat;
          if (textureType !== null) {
            if (textureType === 'netname') {
              this.friendNicknameHolderMapSize += 1;
              const socialkitResId = imgAsset.socialkitResId;
              const holderPath = 'image/netnameplaceholder_' + Math.min(socialkitResId, 11) + '.png';
              this.nickNameOnlyTable[socialkitResId] = holderPath; //imgAsset.placeholderImage;
              this.friendNicknameHolderMap[socialkitResId] = holderPath; //imgAsset.placeholderImage;
              if (!this.jsAssetUrlMap[socialkitResId]) this.jsAssetUrlMap[socialkitResId] = {};
              this.jsAssetUrlMap[socialkitResId]['netname'] = obj;
            } else if (textureType === 'profilepic') {
              this.friendIconHolderMapSize += 1;
              const socialkitResId = imgAsset.socialkitResId;
              const holderPath = 'image/profileplaceholder_' + Math.min(socialkitResId, 11) + '.png';
              this.headIconOnlyTable[socialkitResId] = holderPath; // imgAsset.placeholderImage;
              this.friendIconHolderMap[socialkitResId] = holderPath; //imgAsset.placeholderImage;
              if (!this.jsAssetUrlMap[socialkitResId]) this.jsAssetUrlMap[socialkitResId] = {};
              this.jsAssetUrlMap[socialkitResId]['profilepic'] = obj;
            }
          }
        }
      }
    }
    // this.friendCount = Math.max(this.friendCount, this.friendNicknameHolderMapSize);
    // this.friendCount = Math.max(this.friendCount, this.friendIconHolderMapSize);

    if (this.friendNicknameHolderMapSize > 0 && this.friendIconHolderMapSize > 0) {
      const pairList = [];
      for (const k1 in this.nickNameOnlyTable) {
        for (const k2 in this.headIconOnlyTable) {
          if (k1 === k2) {
            pairList.push(k1);
            this.nickHeadCommomTable[k1] = true;
          }
        }
      }
      for (let i = 0; i < pairList.length; i++) {
        const key = pairList[i];
        delete this.nickNameOnlyTable[key];
        delete this.headIconOnlyTable[key];
      }
    }
    // the list to record friends to be notoced
    this.mappedFriendIndexTable = [];

    this.friendCount = Math.max(this.friendCount, this.tablelength(this.nickHeadCommomTable));
    this.friendCount =
      this.friendCount + this.tablelength(this.nickNameOnlyTable) + this.tablelength(this.headIconOnlyTable);
    this.friendCount = Math.min(this.friendCount, 30);

    this.defaultImg = [
      'image/profilepicdefaultTT_1.jpg',
      'image/profilepicdefaultTT_2.jpg',
      'image/profilepicdefaultTT_3.jpg',
      'image/profilepicdefaultTT_4.jpg',
      'image/profilepicdefaultTT_5.jpg',
      'image/profilepicdefaultTT_6.jpg',
      'image/profilepicdefaultTT_7.jpg',
      'image/profilepicdefaultTT_8.jpg',
      'image/profilepicdefaultTT_9.jpg',
      'image/profilepicdefaultTT_10.jpg',
    ];

    this.defaultNickImg = [
      'image/netnamedefaultTT_1.png',
      'image/netnamedefaultTT_2.png',
      'image/netnamedefaultTT_3.png',
      'image/netnamedefaultTT_4.png',
      'image/netnamedefaultTT_5.png',
      'image/netnamedefaultTT_6.png',
      'image/netnamedefaultTT_7.png',
      'image/netnamedefaultTT_8.png',
      'image/netnamedefaultTT_9.png',
      'image/netnamedefaultTT_10.png',
    ];

    this.defaultSeqImg = [
      'image/socialanimtexturedefaultTT_1.jpg',
      'image/socialanimtexturedefaultTT_2.jpg',
      'image/socialanimtexturedefaultTT_3.jpg',
      'image/socialanimtexturedefaultTT_4.jpg',
      'image/socialanimtexturedefaultTT_5.jpg',
      'image/socialanimtexturedefaultTT_6.jpg',
      'image/socialanimtexturedefaultTT_7.jpg',
      'image/socialanimtexturedefaultTT_8.jpg',
      'image/socialanimtexturedefaultTT_9.jpg',
      'image/socialanimtexturedefaultTT_10.jpg',
    ];

    this.effectInfo = null;
    this.currentTaskId = -1; //invalid digital for taskID
    this.startVideo = false; // marking the starting status

    // post request for asking friend list
    this.hasNewRequest = true;

    // post request for effect package info
    this.requestEffectInfo();
  }

  friendAnimseqReplaced() {
    return this.recordHeandledAnimIndex > 1;
  }

  handleRestSeqs() {
    if (this.animseqObjs.empty()) {
      return;
    }

    // console.log("##friendList## handleRestSeqs start " + this.handledRestSeq.toString() + " this.animHandledStarted: " + this.animHandleStarted.toString() + " this.status: " + this.status + " this.animSeqCam.empty: " + this.animSeqCameraCompNames.empty().toString());
    if (
      this.handledRestSeq === false &&
      (this.animHandleStarted === true || this.status === 404) &&
      this.animSeqCameraCompNames.empty() === true
    ) {
      // console.log("##friendList## handleRestSeqs this renderingCameraNum is: " + this.renderingCameraNum.toString());
      for (let i = 1; i <= this.animseqObjs.size(); i++) {
        const tSize = this.animseqObjs.get(i - 1).atlases.size();
        console.log(
          '##friendList## handleRestSeqs the i and tSize are: ' + '--' + i.toString() + '--' + tSize.toString()
        );
        if (tSize > this.renderingCameraNum) {
          for (let j = this.renderingCameraNum + 1; j <= tSize; j++) {
            console.log('##friendList## handleRestSeqs current handle index is: ' + '--' + j.toString());
            const index = (j % 10) + 1;
            const pngMeta = new Amaz.PngMeta();
            pngMeta.needFlipY = true;

            const newTex = this.scene.assetMgr.SyncLoadWithMeta(this.defaultSeqImg[index - 1], pngMeta);
            if (newTex) {
              this.objSharePtrVec.pushBack(newTex);
              const originUri = this.animseqObjs.get(i - 1).atlases.get(j - 1).uri;
              const originTex = this.scene.assetMgr.SyncLoadWithMeta(originUri, pngMeta);
              originTex.storage(newTex.image);

              // change the uri at the same time
              this.animseqObjs.get(i - 1).atlases.get(j - 1).uri = this.defaultSeqImg[index - 1];
            } else {
              console.log(
                '##friendList## handleRestSeqs current texture of path ' + this.defaultSeqImg[index - 1] + ' is null!!!'
              );
            }
          }
        }
      }

      // mark has been processed
      this.handledRestSeq = true;
    }
  }

  removeRenderingCameras() {
    if (this.cameraComps && this.cameraComps.length > 0) {
      if (this.animHandleStarted && this.animSeqCameraCompNames.empty()) {
        for (const k in this.cameraComps) {
          const v = this.cameraComps[k];
          // Amaz.AmazingManager.removeListener(v, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          this.removeListener(v, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          this.scene.removeEntity(v.entity);
          v.renderTexture = null;
        }
        this.cameraComps = null;
      }
    }

    if (this.nickCameraComps && this.nickCameraComps.length > 0) {
      if (this.nicknameReplaced === true) {
        for (const k in this.nickCameraComps) {
          const v = this.nickCameraComps[k];
          // Amaz.AmazingManager.removeListener(v, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          this.removeListener(v, Amaz.CameraEvent.AFTER_RENDER, this.onAfterNickRender, this);
          this.scene.removeEntity(v.entity);
          v.renderTexture = null;
        }
        this.nickCameraComps = null;
      }
    }
  }

  requestEffectInfo() {
    const reqInfo = {};
    reqInfo.interface = 'EffectInfo';
    const encodedInfo = JSON.stringify(reqInfo);
    this.scene.postMessage(0x29, 0x29, this.getRandomInt(10000), encodedInfo);
  }

  handleEffectInfo(msgObj) {
    if (msgObj === null) {
      console.log('##friendList## the msg is null');
      return;
    }

    const effectInfoTable = msgObj;
    if (effectInfoTable === null || this.tablelength(effectInfoTable) < 1) {
      console.log('##friendList## effectInfoTable is not valid');
      return;
    }

    if (effectInfoTable.status !== 0) {
      console.log('##friendList## the effect info fetching failed, err code is: ' + effectInfoTable.status.toString());
      return;
    }
    this.effectInfo = effectInfoTable.body;
    console.log(
      '##friendList## get effectInfo, and its name and id :' +
        this.effectInfo.sticker_name +
        '--' +
        this.effectInfo.sticker_id
    );
  }

  onUpdate(dt) {
    if (this.checkHasSocialKitTexture() === false) {
      return;
    }

    if (this.getFriendListState !== 3 && this.timeCounter < this.timeOutDuration) {
      this.timeCounter += dt;
    }

    // ask for friend list from network center
    if (this.networkCenter) {
      this.executeNetworkCenter();
    }

    this.updateTex();

    // process rest headicon
    this.handleRestSeqs();

    // clear seq camera
    this.removeRenderingCameras();

    if (this.friendList !== null && this.nicknameReplaced && this.animSeqCameraCompNames.empty()) {
      this.friendList = null;
    }
  }

  onEvent(event) {
    const msgID = event.args.get(0);
    const arg1 = event.args.get(1);
    if (msgID === 0x29 || (msgID === 34952 && arg1 === 0x29)) {
      console.log('##friendList## msgID = 41, arg1 = ' + arg1);
      const key = event.args.get(3);
      const info = Amaz.AmazingManager.getSingleton('BuiltinObject').getUserStringValue(key);
      console.log('##friendList## onEvent info is ' + info);
      const obj = JSON.parse(info);
      console.log('##friendList## interface: ' + obj.interface);
      if (obj.interface === 'EffectInfo') {
        this.handleEffectInfo(obj);
      } else {
        if (this.getFriendListState === 2) {
          this.onFinishingDownloadImage(obj);
        } else {
          console.log('##friendList## the event is mismatched....');
        }
      }
    }

    if (event.type === Amaz.AppEventType.COMPAT_BEF) {
      const event_result = event.args.get(0);
      if (event_result === Amaz.BEFEventType.BET_RECORD_VIDEO) {
        const event_type = event.args.get(1);
        if (event_type === Amaz.BEF_RECODE_VEDIO_EVENT_CODE.RECODE_VEDIO_START) {
          this.startVideo = true;
        }
      }

      if (event_result === Amaz.BEFEventType.BET_EFFECT) {
        if (event.args.get(1) === 3) {
          // resume
          this.startVideo = false;
        }
      }
    }
  }

  checkHasSocialKitTexture() {
    const jsAssetMap = this.scene.assetMgr.getAllScriptCustomAssets();
    const keys = jsAssetMap.getVectorKeys();
    for (let i = 0; i < keys.size(); i++) {
      const k = keys.get(i);
      const obj = jsAssetMap.get(k);
      const imgAsset = JSAssetRuntimeManager.instance().getAsset(obj);
      if (imgAsset !== null) {
        const extName = imgAsset.extName;
        if (extName === '.oskseqjsatt' || extName === '.jssktexturett') {
          // nicknameIconSeq
          return true;
        }
      }
    }
    return false;
  }
}

exports.FriendListTT = FriendListTT;
