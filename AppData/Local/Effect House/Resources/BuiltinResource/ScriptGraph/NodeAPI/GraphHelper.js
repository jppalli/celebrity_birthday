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
exports.DogFaceStretchTemplatePoints = exports.CatFaceStretchTemplatePoints = exports.HumanFaceStretchTemplatePoints = exports.createCubeMesh = exports.createQuadMesh = exports.addShaderToMap = exports.createRT = exports.lookAt = exports.clamp = exports.JSVecToAmazVec = exports.getDefaultValue = exports.GroupGameRankingInfo = exports.GameRankingInfo = exports.ContactInfo = exports.RayHitInfo = exports.AmazVecToJSVec = exports.lerp = exports.isOnMobile = exports.RadToDeg = exports.screenHeight = exports.screenWidth = void 0;
const APJS = __importStar(require('../../../amazingpro'));
const builtinObject = APJS.AmazingManager.getSingleton('BuiltinObject');
exports.screenWidth = builtinObject.getInputTextureWidth();
exports.screenHeight = builtinObject.getInputTextureHeight();
exports.RadToDeg = 57.2958;
const isOnMobile = function () {
    return APJS.Platform.name() !== 'Mac' && APJS.Platform.name() !== 'Windows' && APJS.Platform.name() !== 'Linux';
};
exports.isOnMobile = isOnMobile;
const lerp = function (t0, t1, t) {
    const clampedT = Math.max(0.0, Math.min(t, 1.0));
    return t0 + (t1 - t0) * clampedT;
};
exports.lerp = lerp;
const AmazVecToJSVec = function (AmazVec) {
    const JSVec = [];
    for (let i = 0; i < AmazVec.size(); ++i) {
        JSVec.push(AmazVec.get(i));
    }
    return JSVec;
};
exports.AmazVecToJSVec = AmazVecToJSVec;
class RayHitInfo {
    constructor(object, colliderComp, point, normal, distance, rigidBodyComp) {
        this.hitObject = object;
        this.colliderComp = colliderComp;
        this.hitPoint = point;
        this.hitNormal = normal;
        this.hitDistance = distance;
        this.rigidBodyComp = rigidBodyComp;
    }
}
exports.RayHitInfo = RayHitInfo;
class RayHitInfo2D {
    constructor(hitObject, collider2d, hitPosition, hitNormal, hitDistance, rigidBody2d) {
        this.hitObject = hitObject;
        this.colliderComp = collider2d;
        this.hitPosition = hitPosition;
        this.hitNormal = hitNormal;
        this.hitDistance = hitDistance;
        this.rigidBodyComp = rigidBody2d;
    }
}
class ContactInfo {
    constructor(point, normal, relVel, collidingObject) {
        this.collisionPoint = point;
        this.collisionNormal = normal;
        this.relativeVelocity = relVel;
        this.collidingObject = collidingObject;
    }
}
exports.ContactInfo = ContactInfo;
class GameRankingInfo {
    constructor(name, score, avatar) {
        this.name = name;
        this.detail_struct = {
            score: score,
        };
        this.avatar = avatar;
    }
}
exports.GameRankingInfo = GameRankingInfo;
class GroupGameRankingInfo {
    constructor(name, score) {
        this.name = name;
        this.detail_struct = {
            score: score,
        };
    }
}
exports.GroupGameRankingInfo = GroupGameRankingInfo;
class VoteDataInfo {
    constructor(index, score) {
        this.index = index;
        this.score = score;
    }
}
class GroupChatMemberInfo {
    constructor() {
        this.avatar = null;
        this.nickname = '';
        this.gender = '';
        this.age = 1;
        this.zodiac = '';
        this.birthday = '';
        this.cn_zodiac = '';
        this.introduction = '';
        this.school = '';
        this.city = '';
    }
}
const getDefaultValue = function (dataType) {
    if (dataType === 'Number' || dataType === 'Int' || dataType === 'Double') {
        return 0;
    }
    else if (dataType === 'Bool') {
        return true;
    }
    else if (dataType === 'Color') {
        return new APJS.Color();
    }
    else if (dataType === 'Vector2f') {
        return new APJS.Vector2f();
    }
    else if (dataType === 'Vector3f') {
        return new APJS.Vector3f();
    }
    else if (dataType === 'Vector4f') {
        return new APJS.Vector4f();
    }
    else if (dataType === 'Rect') {
        //Engine type AmgRect
        return new APJS.Rect();
    }
    else if (dataType === 'Quaternionf') {
        return new APJS.Quaternionf();
    }
    else if (dataType === 'String') {
        return '';
    }
    else if (dataType === 'Matrix3x3f') {
        return new APJS.Matrix3x3f();
    }
    else if (dataType === 'Matrix4x4f') {
        return new APJS.Matrix4x4f();
    }
    else if (dataType === 'RayHitInfo') {
        return new RayHitInfo(null, null, new APJS.Vector3f(0, 0, 0), new APJS.Vector3f(0, 0, 0), 0.0, null);
    }
    else if (dataType === 'RayHitInfo2D') {
        return new RayHitInfo2D(null, null, new APJS.Vector2f(0, 0), new APJS.Vector2f(0, 0), 0.0, null);
    }
    else if (dataType === 'ContactInfo') {
        return new ContactInfo(new APJS.Vector3f(0, 0, 0), new APJS.Vector3f(0, 0, 0), new APJS.Vector3f(0, 0, 0), null);
    }
    else if (dataType === 'GameRankingInfo') {
        return new GameRankingInfo('', 0, null);
    }
    else if (dataType === 'VoteDataInfo') {
        return new VoteDataInfo(0, 0);
    }
    else if (dataType === 'GroupGameRankingInfo') {
        return new GroupGameRankingInfo('', 0);
    }
    else if (dataType === 'GroupChatMemberInfo') {
        return new GroupChatMemberInfo();
    }
    else {
        return null;
    }
};
exports.getDefaultValue = getDefaultValue;
const JSVecToAmazVec = function (JSVec) {
    if (JSVec.length === 0) {
        return undefined;
    }
    const ele = JSVec[0];
    if (ele.constructor.name === 'Vector2f') {
        const AmazVec = new APJS.Vec2Vector();
        for (let i = 0; i < JSVec.length; ++i) {
            AmazVec.pushBack(JSVec[i]);
        }
        return AmazVec;
    }
    else if (ele.constructor.name === 'Vector3f') {
        const AmazVec = new APJS.Vec3Vector();
        for (let i = 0; i < JSVec.length; ++i) {
            AmazVec.pushBack(JSVec[i]);
        }
        return AmazVec;
    }
    else if (ele.constructor.name === 'String') {
        const AmazVec = new APJS.StringVector();
        for (let i = 0; i < JSVec.length; ++i) {
            AmazVec.pushBack(JSVec[i]);
        }
        return AmazVec;
    }
    return undefined;
};
exports.JSVecToAmazVec = JSVecToAmazVec;
const clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};
exports.clamp = clamp;
const lookAt = function (eye, center, up) {
    const f = center.clone().subtract(eye).normalizeSafe();
    const s = f.clone().cross(up).normalizeSafe();
    const u = s.clone().cross(f);
    const view = new APJS.Matrix4x4f();
    view.setRow(0, new APJS.Vector4f(s.x, s.y, s.z, -s.dot(eye)));
    view.setRow(1, new APJS.Vector4f(u.x, u.y, u.z, -u.dot(eye)));
    view.setRow(2, new APJS.Vector4f(-f.x, -f.y, -f.z, f.dot(eye)));
    view.setRow(3, new APJS.Vector4f(0.0, 0.0, 0.0, 1.0));
    return view;
};
exports.lookAt = lookAt;
const createRT = function (_width, _height) {
    const rtdesc = new APJS.RenderTextureCreateDesc();
    rtdesc.internalFormat = APJS.InternalFormat.RGBA8;
    rtdesc.dataType = APJS.DataType.U8norm;
    rtdesc.depth = 1;
    rtdesc.attachment = APJS.RenderTextureAttachment.DEPTH24;
    rtdesc.filterMag = APJS.FilterMode.Linear;
    rtdesc.filterMin = APJS.FilterMode.Linear;
    rtdesc.filterMipmap = APJS.FilterMipmapMode.None;
    rtdesc.width = _width;
    rtdesc.height = _height;
    rtdesc.colorFormat = APJS.PixelFormat.RGBA8Unorm;
    const rt = APJS.TextureUtils.createRenderTexture(rtdesc);
    return rt;
};
exports.createRT = createRT;
const addShaderToMap = function (shaderMap, backend, vert, frag) {
    const vs = new APJS.Shader();
    vs.type = APJS.ShaderType.VERTEX;
    vs.source = vert;
    const fs = new APJS.Shader();
    fs.type = APJS.ShaderType.FRAGMENT;
    fs.source = frag;
    const shaderVec = new APJS.Vector();
    shaderVec.pushBack(vs);
    shaderVec.pushBack(fs);
    shaderMap.insert(backend, shaderVec);
};
exports.addShaderToMap = addShaderToMap;
const createQuadMesh = function (minX = -1, maxX = 1, minY = -1, maxY = 1) {
    const mesh = new APJS.Mesh();
    // attPosition
    const pos = new APJS.VertexAttribDesc();
    pos.semantic = APJS.VertexAttribType.POSITION;
    // attNormal
    const normal = new APJS.VertexAttribDesc();
    normal.semantic = APJS.VertexAttribType.NORMAL;
    // attTangent
    const tangent = new APJS.VertexAttribDesc();
    tangent.semantic = APJS.VertexAttribType.TANGENT;
    // attTexCoord0
    const uv0 = new APJS.VertexAttribDesc();
    uv0.semantic = APJS.VertexAttribType.TEXCOORD0;
    // attTexCoord1
    const uv1 = new APJS.VertexAttribDesc();
    uv1.semantic = APJS.VertexAttribType.TEXCOORD1;
    const vads = new APJS.Vector();
    vads.pushBack(pos);
    vads.pushBack(normal);
    vads.pushBack(tangent);
    vads.pushBack(uv0);
    vads.pushBack(uv1);
    mesh.vertexAttribs = vads;
    const vertexData = [
        minX,
        maxY,
        0.0,
        0.0,
        0.0,
        1.0,
        1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        1.0,
        0.0,
        1.0,
        minX,
        minY,
        0.0,
        0.0,
        0.0,
        1.0,
        1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        maxX,
        maxY,
        0.0,
        0.0,
        0.0,
        1.0,
        1.0,
        0.0,
        0.0,
        -1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        maxX,
        minY,
        0.0,
        0.0,
        0.0,
        1.0,
        1.0,
        0.0,
        0.0,
        -1.0,
        1.0,
        0.0,
        1.0,
        0.0,
    ];
    const fv = new APJS.FloatVector();
    for (let i = 0; i < vertexData.length; i++) {
        fv.pushBack(vertexData[i]);
    }
    mesh.vertices = fv;
    const subMesh = new APJS.SubMesh();
    subMesh.primitive = APJS.Primitive.TRIANGLES;
    const indexData = [0, 1, 2, 3, 2, 1];
    const indices = new APJS.UInt16Vector();
    for (let i = 0; i < indexData.length; i++) {
        indices.pushBack(indexData[i]);
    }
    subMesh.indices16 = indices;
    subMesh.mesh = mesh;
    mesh.addSubMesh(subMesh);
    mesh.clearAfterUpload = false;
    return mesh;
};
exports.createQuadMesh = createQuadMesh;
/** @alpha */
const createCubeMesh = function () {
    // create Mesh
    const mesh = new APJS.Mesh();
    const pos = new APJS.VertexAttribDesc();
    pos.semantic = APJS.VertexAttribType.POSITION;
    const uv = new APJS.VertexAttribDesc();
    uv.semantic = APJS.VertexAttribType.TEXCOORD0;
    const vads = new APJS.Vector();
    vads.pushBack(pos);
    vads.pushBack(uv);
    mesh.vertexAttribs = vads;
    const vertexData = [
        1.0, 1.0, 0.0, 1.0, 1.0, 1.0, -1.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, 1.0,
        1.0, 1.0, 0.0, 1.0, 0.0, -1.0, 1.0, 0.0, 0.0, 0.0, -1.0, 1.0, 2.0, 0.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0,
        -1.0, 1.0, 0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 0.0, 0.0, -1.0, -1.0, 2.0, 0.0, 1.0, -1.0, 1.0, 2.0, 1.0, 1.0,
        -1.0, -1.0, 0.0, 0.0, 0.0, 1.0, -1.0, 0.0, 1.0, 0.0, 1.0, -1.0, 2.0, 1.0, 1.0, -1.0, -1.0, 2.0, 0.0, 1.0,
        1.0, -1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, -1.0, 2.0, 0.0, 1.0,
        1.0, 1.0, 2.0, 1.0, 1.0, -1.0, 1.0, 2.0, 0.0, 1.0, -1.0, -1.0, 2.0, 0.0, 0.0, 1.0, -1.0, 2.0, 1.0, 0.0,
    ];
    const fv = new APJS.FloatVector();
    for (let i = 1; i < vertexData.length; ++i) {
        fv.pushBack(vertexData[i]);
    }
    mesh.vertices = fv;
    // create SubMesh
    const subMesh = new APJS.SubMesh();
    subMesh.primitive = APJS.Primitive.TRIANGLES;
    const indexData = [
        0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 8, 9, 10, 10, 11, 8, 12, 13, 14, 14, 15, 12, 16, 17, 18, 18, 19, 16, 20, 21, 22,
        22, 23, 20,
    ];
    const indices = new APJS.UInt16Vector();
    for (let i = 1; i < indexData.length; ++i) {
        indices.pushBack(indexData[i]);
    }
    subMesh.indices16 = indices;
    subMesh.mesh = mesh;
    mesh.addSubMesh(subMesh);
    return mesh;
};
exports.createCubeMesh = createCubeMesh;
exports.HumanFaceStretchTemplatePoints = [
    360, 356, 247, 366, 473, 366, 268, 409, 452, 409, 142, 467, 578, 467, 223, 453, 497, 453, 360, 520, 185, 555, 535,
    555, 147, 579, 573, 579, 185, 584, 535, 584, 312, 594, 408, 594, 360, 615, 328, 651, 392, 651, 360, 653, 360, 688,
    117, 618, 603, 618, 185, 644, 535, 644, 204, 633, 516, 633, 225, 626, 495, 626, 248, 626, 472, 626, 268, 635, 452,
    635, 281, 644, 439, 644, 292, 659, 428, 659, 272, 667, 448, 667, 247, 668, 473, 668, 230, 665, 490, 665, 213, 660,
    507, 660, 197, 654, 523, 654, 334, 712, 386, 712, 115, 716, 605, 716, 306, 758, 414, 758, 207, 784, 513, 784, 287,
    793, 433, 793, 360, 784, 324, 802, 396, 802, 360, 827, 304, 819, 416, 819, 334, 828, 386, 828, 134, 814, 586, 814,
    173, 905, 547, 905, 264, 888, 456, 888, 299, 876, 421, 876, 330, 865, 390, 865, 360, 874, 315, 891, 405, 891, 360,
    894, 360, 913, 314, 906, 406, 906, 282, 894, 438, 894, 310, 937, 410, 937, 360, 950, 230, 922, 490, 922, 214, 958,
    506, 958, 263, 1006, 457, 1006, 360, 1050,
];
exports.CatFaceStretchTemplatePoints = [
    91, 494, 73, 563, 70, 638, 88, 711, 124, 775, 173, 824, 233, 888, 295, 909, 360, 916, 425, 909, 487, 888, 547, 824,
    596, 775, 632, 711, 650, 638, 647, 563, 629, 494, 580, 443, 524, 396, 473, 360, 421, 351, 360, 349, 299, 351, 247,
    360, 196, 396, 140, 443, 74, 414, 61, 334, 56, 255, 77, 182, 122, 201, 170, 248, 214, 303, 506, 303, 550, 248, 598,
    201, 643, 182, 664, 255, 659, 334, 646, 414, 360, 422, 360, 494, 360, 566, 360, 622, 360, 675, 310, 696, 410, 696,
    360, 746, 360, 772, 346, 786, 330, 795, 314, 804, 298, 813, 314, 812, 330, 806, 346, 802, 360, 789, 374, 802, 390,
    806, 406, 812, 422, 813, 406, 804, 390, 795, 374, 786, 180, 540, 210, 516, 249, 519, 278, 550, 280, 592, 250, 613,
    209, 610, 180, 581, 540, 540, 510, 516, 471, 519, 442, 550, 440, 592, 470, 613, 511, 610, 540, 581, 230, 564, 490,
    564,
];
exports.DogFaceStretchTemplatePoints = [
    102, 504, 117, 575, 140, 643, 169, 706, 201, 764, 230, 816, 265, 858, 312, 883, 360, 894, 408, 883, 455, 858, 490,
    816, 519, 764, 551, 706, 580, 643, 603, 575, 618, 504, 582, 457, 544, 411, 504, 363, 440, 331, 360, 326, 280, 331,
    216, 363, 176, 411, 138, 457, 360, 402, 360, 483, 360, 562, 360, 610, 360, 653, 360, 698, 321, 708, 305, 756, 328,
    795, 360, 808, 392, 795, 415, 756, 399, 708, 334, 757, 360, 757, 386, 757, 360, 827, 331, 828, 297, 826, 269, 811,
    243, 806, 268, 833, 298, 854, 330, 851, 360, 852, 390, 851, 422, 854, 452, 833, 477, 806, 451, 811, 423, 826, 389,
    828, 205, 552, 224, 535, 249, 533, 269, 550, 278, 574, 258, 589, 234, 590, 215, 574, 515, 552, 496, 535, 471, 533,
    451, 550, 442, 574, 462, 589, 486, 590, 505, 574, 241, 560, 479, 560, 66, 439, 48, 364, 41, 287, 53, 214, 103, 226,
    146, 263, 183, 312, 537, 312, 574, 263, 617, 226, 667, 214, 679, 287, 672, 364, 654, 439,
];
//# sourceMappingURL=GraphHelper.js.map