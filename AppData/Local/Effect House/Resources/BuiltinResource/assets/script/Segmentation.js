"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segmentation = exports.segMaskType = void 0;
const JSAssetScriptBase_1 = require("./JSAssetScriptBase");
const APJS = require('amazingpro.js');
var segMaskType;
(function (segMaskType) {
    segMaskType[segMaskType["Portrairt"] = 0] = "Portrairt";
    segMaskType[segMaskType["Hair"] = 1] = "Hair";
    segMaskType[segMaskType["Head"] = 2] = "Head";
    segMaskType[segMaskType["Hand"] = 3] = "Hand";
    segMaskType[segMaskType["Cloth"] = 4] = "Cloth";
    segMaskType[segMaskType["Sky"] = 5] = "Sky";
    segMaskType[segMaskType["Ground"] = 6] = "Ground";
    segMaskType[segMaskType["Building"] = 7] = "Building";
    segMaskType[segMaskType["Skin"] = 8] = "Skin";
    segMaskType[segMaskType["Pet"] = 9] = "Pet";
    segMaskType[segMaskType["Ear"] = 10] = "Ear";
    segMaskType[segMaskType["Lip"] = 11] = "Lip";
    segMaskType[segMaskType["Teeth"] = 12] = "Teeth";
    segMaskType[segMaskType["Eye"] = 13] = "Eye";
    segMaskType[segMaskType["Saliency"] = 14] = "Saliency";
    segMaskType[segMaskType["Face"] = 15] = "Face";
})(segMaskType = exports.segMaskType || (exports.segMaskType = {}));
class Segmentation {
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this._scene = value;
    }
    get screenMesh() {
        return this._screenMesh;
    }
    set screenMesh(value) {
        this._screenMesh = value;
    }
    get cmdBufferHelper() {
        if (!this._cmdBufferHelper) {
            return new APJS.CommandBuffer();
        }
        return this._cmdBufferHelper;
    }
    set cmdBufferHelper(value) {
        this._cmdBufferHelper = value;
    }
    get graphNameEye() {
        return this._graphNameEye;
    }
    set graphNameEye(value) {
        this._graphNameEye = value;
    }
    get graphNameEar() {
        return this._graphNameEar;
    }
    set graphNameEar(value) {
        this._graphNameEar = value;
    }
    get segProviderMap() {
        return this._segProviderMap;
    }
    constructor() {
        this._segProviderMap = new Map();
        this._graphNameEye = '';
        this._graphNameEar = '';
    }
    static getInstance() {
        if (this._instance === null) {
            this._instance = new Segmentation();
            this._instance.init();
        }
        return this._instance;
    }
    static getMask(type, id = 0, side = 0) {
        return this.getInstance().getMask(type, id, side);
    }
    init() {
        this._segProviderMap.set(segMaskType.Portrairt, new BodySegProvider(this));
        this._segProviderMap.set(segMaskType.Hair, new HairSegProvider(this));
        this._segProviderMap.set(segMaskType.Head, new HeadSegProvider(this));
        this._segProviderMap.set(segMaskType.Hand, new HandSegProvider(this));
        this._segProviderMap.set(segMaskType.Cloth, new ClothSegProvider(this));
        this._segProviderMap.set(segMaskType.Sky, new SkySegProvider(this));
        this._segProviderMap.set(segMaskType.Ground, new GroundSegProvider(this));
        this._segProviderMap.set(segMaskType.Building, new BuildingSegProvider(this));
        this._segProviderMap.set(segMaskType.Skin, new SkinSegProvider(this));
        this._segProviderMap.set(segMaskType.Pet, new PetSegProvider(this));
        this._segProviderMap.set(segMaskType.Ear, new EarSegProvider(this));
        this._segProviderMap.set(segMaskType.Lip, new LipSegProvider(this));
        this._segProviderMap.set(segMaskType.Teeth, new TeethSegProvider(this));
        this._segProviderMap.set(segMaskType.Face, new FaceSegProvider(this));
        this._segProviderMap.set(segMaskType.Eye, new EyeSegProvider(this));
        this._segProviderMap.set(segMaskType.Saliency, new SaliencySegProvider(this));
    }
    onUpdate(dt) {
        if (!this._cmdBufferHelper) {
            return;
        }
        this._cmdBufferHelper.clearAll();
        for (const provider of this._segProviderMap.values()) {
            provider.onUpdate(dt);
        }
        this._scene.commitCommandBuffer(this._cmdBufferHelper);
    }
    createRenderTextureHelper(shaders) {
        return new RenderTextureHelper(JSAssetScriptBase_1.RenderingUtil.createTexture2D(), JSAssetScriptBase_1.RenderingUtil.createScreenRenderTexture(), JSAssetScriptBase_1.RenderingUtil.createScreenMaterial(shaders));
    }
    getMask(type, id, side) {
        const provider = this._segProviderMap.get(type);
        if (provider) {
            if (type === segMaskType.Ear) {
                return provider.getMask(id, side);
            }
            else {
                return provider.getMask(id, 0);
            }
        }
        else {
            console.error(`Segmentation doesn't support ${type} yet`);
            return null;
        }
    }
}
exports.Segmentation = Segmentation;
Segmentation._instance = null;
class RenderTextureHelper {
    constructor(texture, renderTexture, screenMaterial) {
        this.texture = texture;
        this.renderTexture = renderTexture;
        this.screenMaterial = screenMaterial;
    }
}
class SegProvider {
    constructor(mgr) {
        this._mgr = mgr;
        this._texture = null;
        this._emptyImage = new APJS.Image();
    }
    get attachedMaterials() {
        if (this._attachedMaterials === undefined) {
            this._attachedMaterials = new Map();
        }
        return this._attachedMaterials;
    }
}
class BodySegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const bgInfo = alResult && alResult.getBgInfo();
        if (!bgInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (bgInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, bgInfo.bgMask);
            if (this.attachedMaterials.size !== 0) {
                const rect = bgInfo.resultRect;
                const transX = 1 - rect.x * 2 - rect.width;
                const transY = rect.y * 2 + rect.height - 1;
                const scale = 1 / Math.max(Math.abs(rect.width), Math.abs(rect.height));
                this.attachedMaterials.forEach((materialSet, scriptItemUuid) => {
                    materialSet.forEach(material => {
                        material.setVec4('u_Translation', new APJS.Vector4f(transX, transY, 0.0, 0.0));
                        material.setVec4('u_Scale', new APJS.Vector4f(scale, scale, 1.0, 1.0));
                    });
                });
            }
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class HairSegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const hairInfo = alResult && alResult.getHairInfo();
        if (!hairInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (hairInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, hairInfo.mask);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class HeadSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
    }
    get whichFaceMap() {
        if (this._whichFaceMap === undefined) {
            this._whichFaceMap = new Map();
        }
        return this._whichFaceMap;
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        let segInfoCount = alResult ? alResult.getHeadSegInfoCount() : 0;
        if (!segInfoCount) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < segInfoCount; ++i) {
            this.getOrCreateRenderTextureHelper(i);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(id, alResult);
        }
    }
    getMask(id) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id) {
        if (!this._rdMap.has(id)) {
            this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
        }
        return this._rdMap.get(id);
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform mat4 u_Model;
         void main() {
         gl_Position = u_Model * vec4(inPosition, 1.0);
         uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
          gl_FragColor = texture2D(tex, uv);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position = buffer.u_Model * float4(in.inPosition, 1.0);
            out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            out.gl_FragColor = tex.sample(texSmplr, in.uv);
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(id, alResult) {
        const helper = this._rdMap.get(id);
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        const headSegInfo = alResult.getHeadSegInfo(id);
        const faceInfo = alResult.getFaceBaseInfo(id);
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (headSegInfo !== null) {
            APJS.TextureUtils.refreshTextureWithImage(helper.texture, headSegInfo.alpha);
            const mask_w = headSegInfo.width;
            const mask_h = headSegInfo.height;
            const src_w = headSegInfo.srcWidth;
            const src_h = headSegInfo.srcHeight;
            const matrix_vector = headSegInfo.matrix;
            const m00 = matrix_vector[0];
            const m01 = matrix_vector[1];
            const m02 = matrix_vector[2];
            const m10 = matrix_vector[3];
            const m11 = matrix_vector[4];
            const m12 = matrix_vector[5];
            const headseg_mat4 = new APJS.Matrix4x4f(m00, m10, 0.0, 0.0, m01, m11, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, m02, m12, 0.0, 1.0);
            headseg_mat4.inverse();
            const preTransform = new APJS.Matrix4x4f(mask_w / 2.0, 0, 0, 0, 0, mask_h / 2.0, 0, 0, 0, 0, 1, 0, mask_w / 2.0, mask_h / 2, 0, 1);
            headseg_mat4.multiply(preTransform);
            const postTransform = new APJS.Matrix4x4f(2.0 / src_w, 0, 0, 0, 0, 2.0 / src_h, 0, 0, 0, 0, 1, 0, -1, -1, 0, 1);
            postTransform.multiply(headseg_mat4);
            helper.screenMaterial.setTex('tex', helper.texture);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, postTransform, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
            if (this.attachedMaterials.size !== 0) {
                const rect = faceInfo.rect;
                const transX = 1 - rect.x * 2 - rect.width;
                const transY = 1 - rect.y * 2 - rect.height;
                const scale = 0.5 / Math.max(rect.width, rect.height);
                this.attachedMaterials.forEach((materialSet, scriptItemUuid) => {
                    materialSet.forEach(material => {
                        var _a;
                        if (((_a = this._whichFaceMap) === null || _a === void 0 ? void 0 : _a.get(scriptItemUuid)) === id) {
                            material.setVec4('u_Translation', new APJS.Vector4f(transX, transY, 0.0, 0.0));
                            material.setVec4('u_Scale', new APJS.Vector4f(scale, scale, 1.0, 1.0));
                        }
                    });
                });
            }
        }
    }
}
class HandSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._handMap = new Map();
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        if (!alResult || !alResult.getHandCount()) {
            for (const id of this._handMap.keys()) {
                APJS.TextureUtils.refreshTextureWithImage(this._handMap.get(id), this._emptyImage);
            }
            return;
        }
        for (let i = 0; i < alResult.getHandCount(); ++i) {
            this.getOrCreateTexture(i);
        }
        for (const id of this._handMap.keys()) {
            const handInfo = alResult.getHandInfo(id);
            if (handInfo === null) {
                APJS.TextureUtils.refreshTextureWithImage(this._handMap.get(id), this._emptyImage);
            }
            else {
                APJS.TextureUtils.refreshTextureWithImage(this._handMap.get(id), handInfo.image);
            }
        }
    }
    getOrCreateTexture(id) {
        if (!this._handMap.has(id)) {
            this._handMap.set(id, APJS.TextureUtils.createTexture2D());
        }
        return this._handMap.get(id);
    }
    getMask(id) {
        return this.getOrCreateTexture(id);
    }
}
class ClothSegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const clothInfo = alResult && alResult.getClothesSegInfo();
        if (!clothInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (clothInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, clothInfo.alphaMask);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class SkySegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const skyInfo = alResult && alResult.getSkyInfo();
        if (!skyInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (skyInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, skyInfo.skyMask);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class GroundSegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const groundInfo = alResult && alResult.getGroundSegInfo();
        if (!groundInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (groundInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, groundInfo.groundMask);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class BuildingSegProvider extends SegProvider {
    constructor() {
        super(...arguments);
        this._initialized = false;
    }
    onUpdate() {
        if (!this._initialized || !this._mgr.screenMesh) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const buildingSegInfo = alResult && alResult.getBuildingSegInfo();
        if (!buildingSegInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (buildingSegInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, buildingSegInfo.mask);
        }
        this._screenMaterial.setTex('tex', texture);
        this._mgr.cmdBufferHelper.setRenderTexture(this._renderTexture);
        this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, new APJS.Matrix4x4f(), this._screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        this.tryToInit();
        return this._renderTexture;
    }
    tryToInit() {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._renderTexture = JSAssetScriptBase_1.RenderingUtil.createScreenRenderTexture();
        const screenVs = `attribute vec3 inPosition;
        attribute vec2 inTexCoord;
        varying vec2 uv;
        uniform mat4 u_Model;
        void main() {
          gl_Position = u_Model * vec4(inPosition, 1.0);
          uv = inTexCoord;
        }
        `;
        const screenFs = `precision lowp float;
        varying vec2 uv;
        uniform sampler2D tex;
        void main() {
          vec4 color = texture2D(tex, uv);
          gl_FragColor = vec4(color.g, color.g, color.g, 1.0);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
  
        using namespace metal;
  
        struct buffer_t
        {
            float4x4 u_Model;
        };
  
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
  
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
  
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position = buffer.u_Model * float4(in.inPosition, 1.0);
            out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
        `;
        const screenMetalFs = `
      #include <metal_stdlib>
      #include <simd/simd.h>
  
      using namespace metal;
  
      struct main0_out
      {
          float4 gl_FragColor [[color(0)]];
      };
  
      struct main0_in
      {
          float2 uv;
      };
  
      fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
      {
          main0_out out = {};
          float4 color = tex.sample(texSmplr, in.uv);
          out.gl_FragColor = float4(color.y, color.y, color.y, 1.0);
          return out;
      }
        `;
        const shaders = JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenFs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalFs,
            },
        });
        this._screenMaterial = JSAssetScriptBase_1.RenderingUtil.createScreenMaterial(shaders);
    }
}
class SkinSegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const skinInfo = alResult && alResult.getSkinSegInfo();
        if (!skinInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (skinInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, skinInfo.data);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class PetSegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const clothInfo = alResult && alResult.getPetMattingInfo();
        if (!clothInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (clothInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, clothInfo.mask0);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
class EarSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
        this._rdMap2 = new Map();
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        if (!alResult || alResult.getEarSegInfoCount() <= 0) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                const helper2 = this._rdMap2.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
                if (helper2) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper2.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < alResult.getEarSegInfoCount(); ++i) {
            this.getOrCreateRenderTextureHelper(i, 0);
            this.getOrCreateRenderTextureHelper(i, 1);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(alResult.getEarSegInfo(id), this._rdMap.get(id), 0);
        }
        for (const id of this._rdMap2.keys()) {
            this.updateMask(alResult.getEarSegInfo(id), this._rdMap2.get(id), 1);
        }
    }
    getMask(id, side) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id, side)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id, side) {
        if (side === 0) {
            if (!this._rdMap.has(id)) {
                this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
            }
            return this._rdMap.get(id);
        }
        else {
            if (!this._rdMap2.has(id)) {
                this._rdMap2.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
            }
            return this._rdMap2.get(id);
        }
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform mat4 u_Model;
         void main() {
         gl_Position = u_Model * vec4(inPosition, 1.0);
         uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
          gl_FragColor = texture2D(tex, uv);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position = buffer.u_Model * float4(in.inPosition, 1.0);
            out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            out.gl_FragColor = tex.sample(texSmplr, in.uv);
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(earSegInfo, helper, side) {
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (earSegInfo !== null) {
            let matrix = earSegInfo.matrix0;
            if (side === 0) {
                APJS.TextureUtils.refreshTextureWithImage(helper.texture, earSegInfo.mask0);
            }
            else if (side === 1) {
                APJS.TextureUtils.refreshTextureWithImage(helper.texture, earSegInfo.mask1);
                matrix = earSegInfo.matrix1;
            }
            const affineMat = new APJS.Matrix4x4f();
            affineMat.set(0, 0, matrix[0]);
            affineMat.set(0, 1, matrix[1]);
            affineMat.set(0, 3, matrix[2]);
            affineMat.set(1, 0, matrix[3]);
            affineMat.set(1, 1, matrix[4]);
            affineMat.set(1, 3, matrix[5]);
            affineMat.set(2, 2, 1.0);
            affineMat.set(3, 3, 1.0);
            affineMat.inverse();
            const mask_w = earSegInfo.maskWidth;
            const mask_h = earSegInfo.maskHeight;
            const alResult = APJS.AlgorithmManager.getResult();
            const image_w = alResult.getBlitImage(this._mgr.graphNameEar, 'blit_0').width;
            const image_h = alResult.getBlitImage(this._mgr.graphNameEar, 'blit_0').height;
            const preTransform = new APJS.Matrix4x4f();
            preTransform.setScale(new APJS.Vector3f(mask_w / 2.0, mask_h / 2.0, 1.0));
            preTransform.translate(new APJS.Vector3f(1.0, 1.0, 0.0));
            const mat0 = affineMat.clone();
            mat0.multiply(preTransform);
            const postTransform = new APJS.Matrix4x4f();
            postTransform.setTranslate(new APJS.Vector3f(-1.0, 1.0, 0.0));
            postTransform.scale(new APJS.Vector3f(2.0 / image_w, -2.0 / image_h, 1.0));
            postTransform.multiply(mat0);
            helper.screenMaterial.setTex('tex', helper.texture);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, postTransform, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
        }
    }
}
class LipSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        if (!alResult || !alResult.getFaceCount()) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < alResult.getFaceCount(); ++i) {
            this.getOrCreateRenderTextureHelper(i);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(alResult.getFaceMouthMask(id), this._rdMap.get(id));
        }
    }
    getMask(id) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id) {
        if (!this._rdMap.has(id)) {
            this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
        }
        return this._rdMap.get(id);
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform float u_ScreenWidth;
         uniform float u_ScreenHeight;
         uniform mat4 u_Model;
         void main() {
          gl_Position = vec4(inPosition, 1.0);
          vec2 screen_position = (inPosition.xy + 1.0) / 2.0;
          // screen_position = vec2(screen_position.x, 1.0 - screen_position.y);
          screen_position = vec2(screen_position.x * u_ScreenWidth,screen_position.y * u_ScreenHeight);
          uv = (u_Model * vec4(screen_position.xy, 0.0, 1.0)).xy;
          // uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
          gl_FragColor = texture2D(tex, uv);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
            float u_ScreenWidth;
            float u_ScreenHeight;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position =  float4(in.inPosition, 1.0);
            float2 screen_position = float2(in.inPosition.x+1.0, in.inPosition.y+1.0) / 2.0;
            // screen_position = float2(screen_position.x, 1.0 - screen_position.y);
            screen_position = float2(screen_position.x * buffer.u_ScreenWidth, screen_position.y * buffer.u_ScreenHeight);
            float4 tv = buffer.u_Model  * float4(screen_position.xy, 0.0, 1.0);
            out.uv = tv.xy;
            // out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            out.gl_FragColor = tex.sample(texSmplr, in.uv);
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(lipSegInfo, helper) {
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (lipSegInfo !== null) {
            APJS.TextureUtils.refreshTextureWithImage(helper.texture, lipSegInfo.image);
            const mask_w = lipSegInfo.faceMaskSize;
            const mask_h = lipSegInfo.faceMaskSize;
            const matrix_vector = lipSegInfo.warpMatrix;
            const m00 = matrix_vector[0];
            const m01 = matrix_vector[1];
            const m02 = matrix_vector[2];
            const m10 = matrix_vector[3];
            const m11 = matrix_vector[4];
            const m12 = matrix_vector[5];
            const lipseg_mat4 = new APJS.Matrix4x4f();
            lipseg_mat4.setRow(0, new APJS.Vector4f(m00 / mask_w, m01 / mask_w, 0.0, m02 / mask_w));
            lipseg_mat4.setRow(1, new APJS.Vector4f(m10 / mask_h, m11 / mask_h, 0.0, m12 / mask_h));
            lipseg_mat4.setRow(2, new APJS.Vector4f(0.0, 0.0, 1.0, 0.0));
            lipseg_mat4.setRow(3, new APJS.Vector4f(0.0, 0.0, 0.0, 1.0));
            helper.screenMaterial.setTex('tex', helper.texture);
            helper.screenMaterial.setMat4('u_Model', lipseg_mat4);
            const srcWidth = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
            const srcHeight = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
            helper.screenMaterial.setFloat('u_ScreenWidth', srcWidth);
            helper.screenMaterial.setFloat('u_ScreenHeight', srcHeight);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, lipseg_mat4, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
        }
    }
}
class TeethSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        if (!alResult || !alResult.getFaceCount()) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < alResult.getFaceCount(); ++i) {
            this.getOrCreateRenderTextureHelper(i);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(alResult.getFaceTeethMask(id), this._rdMap.get(id));
        }
    }
    getMask(id) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id) {
        if (!this._rdMap.has(id)) {
            this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
        }
        return this._rdMap.get(id);
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform float u_ScreenWidth;
         uniform float u_ScreenHeight;
         uniform mat4 u_Model;
         void main() {
          gl_Position = vec4(inPosition, 1.0);
          vec2 screen_position = (inPosition.xy + 1.0) / 2.0;
          // screen_position = vec2(screen_position.x, 1.0 - screen_position.y);
          screen_position = vec2(screen_position.x * u_ScreenWidth,screen_position.y * u_ScreenHeight);
          uv = (u_Model * vec4(screen_position.xy, 0.0, 1.0)).xy;
          // uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
          gl_FragColor = texture2D(tex, uv);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
            float u_ScreenWidth;
            float u_ScreenHeight;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position =  float4(in.inPosition, 1.0);
            float2 screen_position = float2(in.inPosition.x+1.0, in.inPosition.y+1.0) / 2.0;
            // screen_position = float2(screen_position.x, 1.0 - screen_position.y);
            screen_position = float2(screen_position.x * buffer.u_ScreenWidth, screen_position.y * buffer.u_ScreenHeight);
            float4 tv = buffer.u_Model  * float4(screen_position.xy, 0.0, 1.0);
            out.uv = tv.xy;
            // out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            out.gl_FragColor = tex.sample(texSmplr, in.uv);
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(teethSegInfo, helper) {
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (teethSegInfo !== null) {
            APJS.TextureUtils.refreshTextureWithImage(helper.texture, teethSegInfo.image);
            const mask_w = teethSegInfo.faceMaskSize;
            const mask_h = teethSegInfo.faceMaskSize;
            const matrix_vector = teethSegInfo.warpMatrix;
            const m00 = matrix_vector[0];
            const m01 = matrix_vector[1];
            const m02 = matrix_vector[2];
            const m10 = matrix_vector[3];
            const m11 = matrix_vector[4];
            const m12 = matrix_vector[5];
            const teethseg_mat4 = new APJS.Matrix4x4f();
            teethseg_mat4.setRow(0, new APJS.Vector4f(m00 / mask_w, m01 / mask_w, 0.0, m02 / mask_w));
            teethseg_mat4.setRow(1, new APJS.Vector4f(m10 / mask_h, m11 / mask_h, 0.0, m12 / mask_h));
            teethseg_mat4.setRow(2, new APJS.Vector4f(0.0, 0.0, 1.0, 0.0));
            teethseg_mat4.setRow(3, new APJS.Vector4f(0.0, 0.0, 0.0, 1.0));
            helper.screenMaterial.setTex('tex', helper.texture);
            helper.screenMaterial.setMat4('u_Model', teethseg_mat4);
            const srcWidth = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
            const srcHeight = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
            helper.screenMaterial.setFloat('u_ScreenWidth', srcWidth);
            helper.screenMaterial.setFloat('u_ScreenHeight', srcHeight);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, teethseg_mat4, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
        }
    }
}
class FaceSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
    }
    onUpdate() {
        const alResult = APJS.AlgorithmManager.getResult();
        if (!alResult || !alResult.getFaceCount()) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < alResult.getFaceCount(); ++i) {
            this.getOrCreateRenderTextureHelper(i);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(alResult.getFaceFaceMask(id), this._rdMap.get(id));
        }
    }
    getMask(id) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id) {
        if (!this._rdMap.has(id)) {
            this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
        }
        return this._rdMap.get(id);
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform float u_ScreenWidth;
         uniform float u_ScreenHeight;
         uniform mat4 u_Model;
         void main() {
          gl_Position = vec4(inPosition, 1.0);
          vec2 screen_position = (inPosition.xy + 1.0) / 2.0;
          // screen_position = vec2(screen_position.x, 1.0 - screen_position.y);
          screen_position = vec2(screen_position.x * u_ScreenWidth,screen_position.y * u_ScreenHeight);
          uv = (u_Model * vec4(screen_position.xy, 0.0, 1.0)).xy;
          // uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
         vec4 mask = texture2D(tex, uv);
          float weight = mask.r;
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
                weight = 0.0;
            }
          gl_FragColor = mask * weight;
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
            float u_ScreenWidth;
            float u_ScreenHeight;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position =  float4(in.inPosition, 1.0);
            float2 screen_position = float2(in.inPosition.x+1.0, in.inPosition.y+1.0) / 2.0;
            // screen_position = float2(screen_position.x, 1.0 - screen_position.y);
            screen_position = float2(screen_position.x * buffer.u_ScreenWidth, screen_position.y * buffer.u_ScreenHeight);
            float4 tv = buffer.u_Model  * float4(screen_position.xy, 0.0, 1.0);
            out.uv = tv.xy;
            // out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            float2 uv = in.uv;
            float4 mask = tex.sample(texSmplr, uv);
            float weight = mask.r;

            
            if (uv.x < 0.0f || uv.x > 1.0f || uv.y < 0.0f || uv.y > 1.0f) {
                weight = 0.0f;
            }
            out.gl_FragColor = mask * weight;
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(faceSegInfo, helper) {
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (faceSegInfo !== null) {
            APJS.TextureUtils.refreshTextureWithImage(helper.texture, faceSegInfo.image);
            const mask_w = faceSegInfo.faceMaskSize;
            const mask_h = faceSegInfo.faceMaskSize;
            const matrix_vector = faceSegInfo.warpMatrix;
            const m00 = matrix_vector[0];
            const m01 = matrix_vector[1];
            const m02 = matrix_vector[2];
            const m10 = matrix_vector[3];
            const m11 = matrix_vector[4];
            const m12 = matrix_vector[5];
            const faceseg_mat4 = new APJS.Matrix4x4f();
            faceseg_mat4.setRow(0, new APJS.Vector4f(m00 / mask_w, m01 / mask_w, 0.0, m02 / mask_w));
            faceseg_mat4.setRow(1, new APJS.Vector4f(m10 / mask_h, m11 / mask_h, 0.0, m12 / mask_h));
            faceseg_mat4.setRow(2, new APJS.Vector4f(0.0, 0.0, 1.0, 0.0));
            faceseg_mat4.setRow(3, new APJS.Vector4f(0.0, 0.0, 0.0, 1.0));
            helper.screenMaterial.setTex('tex', helper.texture);
            helper.screenMaterial.setMat4('u_Model', faceseg_mat4);
            const srcWidth = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
            const srcHeight = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
            helper.screenMaterial.setFloat('u_ScreenWidth', srcWidth);
            helper.screenMaterial.setFloat('u_ScreenHeight', srcHeight);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, faceseg_mat4, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
        }
    }
}
class EyeSegProvider extends SegProvider {
    constructor(mgr) {
        super(mgr);
        this._rdMap = new Map();
    }
    onUpdate() {
        const graphNode = APJS.AlgorithmManager.getGraphNode(this._mgr.graphNameEye, 'fparsing');
        const count = graphNode.getInfoCount(0);
        if (count <= 0) {
            for (const id of this._rdMap.keys()) {
                const helper = this._rdMap.get(id);
                if (helper) {
                    this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
                    this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
                }
            }
            return;
        }
        for (let i = 0; i < count; ++i) {
            this.getOrCreateRenderTextureHelper(i);
        }
        for (const id of this._rdMap.keys()) {
            this.updateMask(graphNode.getInfo(id), this._rdMap.get(id), id);
        }
    }
    getMask(id) {
        var _a;
        return (_a = this.getOrCreateRenderTextureHelper(id)) === null || _a === void 0 ? void 0 : _a.renderTexture;
    }
    getOrCreateRenderTextureHelper(id) {
        if (!this._rdMap.has(id)) {
            this._rdMap.set(id, this._mgr.createRenderTextureHelper(this.createNomralScreenShader()));
        }
        return this._rdMap.get(id);
    }
    createNomralScreenShader() {
        const screenVs = `attribute vec3 inPosition;
         attribute vec2 inTexCoord;
         varying vec2 uv;
         uniform mat4 u_Model;
         void main() {
         gl_Position = u_Model * vec4(inPosition, 1.0);
         uv = inTexCoord;
         }
        `;
        const screenPs = `precision lowp float;
         varying vec2 uv;
         uniform sampler2D tex;
         void main() {
          vec2 uv2 = vec2(uv.x,1.0 - uv.y);
          gl_FragColor = texture2D(tex, uv2);
        }
        `;
        const screenMetalVs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
    
        using namespace metal;
    
        struct buffer_t
        {
            float4x4 u_Model;
        };
    
        struct main0_out
        {
            float2 uv;
            float4 gl_Position [[position]];
        };
    
        struct main0_in
        {
            float3 inPosition [[attribute(0)]];
            float2 inTexCoord [[attribute(1)]];
        };
    
        vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
        {
            main0_out out = {};
            out.gl_Position = buffer.u_Model * float4(in.inPosition, 1.0);
            out.uv = in.inTexCoord;
            out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
            return out;
        }
         `;
        const screenMetalPs = `
        #include <metal_stdlib>
        #include <simd/simd.h>
        
        using namespace metal;
        
        struct main0_out
        {
            float4 gl_FragColor [[color(0)]];
        };
        
        struct main0_in
        {
            float2 uv;
        };
        
        fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> tex [[texture(0)]], sampler texSmplr [[sampler(0)]])
        {
            main0_out out = {};
            float2 flippedUV = in.uv;
            flippedUV.y = 1.0 - flippedUV.y;
            out.gl_FragColor = tex.sample(texSmplr, flippedUV);
            return out;
        }    
         `;
        return JSAssetScriptBase_1.RenderingUtil.createShaders({
            gles2: {
                vs: screenVs,
                fs: screenPs,
            },
            metal: {
                vs: screenMetalVs,
                fs: screenMetalPs,
            },
        });
    }
    updateMask(fParsingInfo, helper, index) {
        if (helper === null || helper === undefined || !this._mgr.screenMesh) {
            return;
        }
        this._mgr.cmdBufferHelper.setRenderTexture(helper.renderTexture);
        this._mgr.cmdBufferHelper.clearRenderTexture(true, false, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1.0);
        if (fParsingInfo !== null) {
            const affineMat = fParsingInfo.matrix;
            APJS.TextureUtils.refreshTextureWithImage(helper.texture, fParsingInfo.image);
            const MVP = affineMat.clone();
            helper.screenMaterial.setTex('tex', helper.texture);
            this._mgr.cmdBufferHelper.drawMesh(this._mgr.screenMesh, MVP, helper.screenMaterial, 0, 0, new APJS.MaterialPropertyBlock(), false);
        }
    }
}
class SaliencySegProvider extends SegProvider {
    onUpdate() {
        if (this._texture === null) {
            return;
        }
        const alResult = APJS.AlgorithmManager.getResult();
        const saliencyInfo = alResult && alResult.getSaliencySegResult();
        if (!saliencyInfo) {
            return;
        }
        const texture = this.getOrCreateTexture();
        if (saliencyInfo === null) {
            APJS.TextureUtils.refreshTextureWithImage(texture, this._emptyImage);
        }
        else {
            APJS.TextureUtils.refreshTextureWithImage(texture, saliencyInfo.mask);
        }
    }
    getOrCreateTexture() {
        if (this._texture === null) {
            this._texture = APJS.TextureUtils.createTexture2D();
        }
        return this._texture;
    }
    getMask() {
        return this.getOrCreateTexture();
    }
}
