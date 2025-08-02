/**
 * @file CGLineRenderer2D.js
 * @author Zhen Geng
 * @date 2024/08/08
 * @brief CGLineRenderer2D.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */
const APJS = require('../../../amazingpro');
const {screenWidth, screenHeight, lookAt, createRT} = require('../Utils/GraphHelper');
const {BaseNode} = require('../Utils/BaseNode');

class CGLineRenderer2D extends BaseNode {
  constructor() {
    super();
    this.mesh = null;
    this.material = null;
    this.camera = null;
    this.pts = [];
    this.width = 1;
    this.pixelPerUnit = 32;
    this.commandBuffer = new APJS.CommandBuffer();
    this.outputTexture = null;
    //support multiple mesh rendering
    this.transformMeshMap = new Map();
    this.transformMaterialMap = new Map();
  }

  execute(index) {
    switch (index) {
      case 0:
        this.updateMesh();
        break;
      default:
        break;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  getOutput(index) {
    switch (index) {
      case 1:
        return this.outputTexture;
      default:
        break;
    }
  }

  createLineMesh(pts, width, pixelPerUnit) {
    const size = pts.length;
    if (size < 2) return null;
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

    // // attTexCoord1
    const uv1 = new APJS.VertexAttribDesc();
    uv1.semantic = APJS.VertexAttribType.TEXCOORD1;

    const vertexAttribsDesc = new APJS.Vector();
    vertexAttribsDesc.pushBack(pos);
    vertexAttribsDesc.pushBack(normal);
    vertexAttribsDesc.pushBack(tangent);
    vertexAttribsDesc.pushBack(uv0);
    vertexAttribsDesc.pushBack(uv1);
    mesh.vertexAttribs = vertexAttribsDesc;

    const meshData = this.generateMeshDataFromLinePt(pts, width, pixelPerUnit);

    const amgVerts = new APJS.Vec3Vector();
    const amgNormals = new APJS.Vec3Vector();
    const amgTangents = new APJS.Vec4Vector();
    const amg2DTexCoord = new APJS.Vec2Vector();

    for (let i = 0; i < meshData.positions.length; i++) {
      amgVerts.pushBack(meshData.positions[i]);
      amg2DTexCoord.pushBack(meshData.uvs[i]);
      amgNormals.pushBack(new APJS.Vector3f(0, 0, 1));
      amgTangents.pushBack(new APJS.Vector4f(1, 0, 0, -1));
    }

    mesh.setVertexArray(amgVerts, 0, amgVerts.size(), true);
    mesh.setNormalArray(amgNormals, 0, amgNormals.size());
    mesh.setTangentArray(amgTangents, 0, amgTangents.size());
    mesh.setUvArray(0, amg2DTexCoord, 0, amg2DTexCoord.size());
    mesh.setUvArray(1, amg2DTexCoord, 0, amg2DTexCoord.size());

    const subMesh = new APJS.SubMesh();
    subMesh.primitive = APJS.Primitive.TRIANGLES;
    const indices = new APJS.UInt16Vector();
    for (let i = 0; i < meshData.indices.length; i++) {
      indices.pushBack(meshData.indices[i]);
    }
    subMesh.indices16 = indices;
    subMesh.mesh = mesh;
    mesh.addSubMesh(subMesh);
    mesh.clearAfterUpload = false;
    return mesh;
  }

  updateLineMeshVertex(mesh, pts, width, pixelPerUnit) {
    const currentVertCount = mesh.getVertexCount();
    const newMeshData = this.generateMeshDataFromLinePt(pts, width, pixelPerUnit);
    const newVertCount = newMeshData.positions.length;
    const amg2DTexCoord = new APJS.Vec2Vector();
    const amgVerts = new APJS.Vec3Vector();
    for (let i = 0; i < newMeshData.positions.length; i++) {
      amgVerts.pushBack(newMeshData.positions[i]);
      amg2DTexCoord.pushBack(newMeshData.uvs[i]);
    }
    mesh.setVertexArray(amgVerts, 0, amgVerts.size(), true);
    mesh.setUvArray(0, amg2DTexCoord, 0, amg2DTexCoord.size());
    mesh.setUvArray(1, amg2DTexCoord, 0, amg2DTexCoord.size());

    if (currentVertCount !== newVertCount) {
      const amgNormals = new APJS.Vec3Vector();
      const amgTangents = new APJS.Vec4Vector();
      const amgIndices = new APJS.UInt16Vector();

      for (let i = 0; i < newMeshData.positions.length; i++) {
        amgNormals.pushBack(new APJS.Vector3f(0, 0, 1));
        amgTangents.pushBack(new APJS.Vector4f(1, 0, 0, -1));
      }
      for (let i = 0; i < newMeshData.indices.length; i++) {
        amgIndices.pushBack(newMeshData.indices[i]);
      }
      mesh.setNormalArray(amgNormals, 0, amgNormals.size());
      mesh.setTangentArray(amgTangents, 0, amgTangents.size());
      const subMesh = mesh.getSubMesh(0);
      subMesh.indices16 = amgIndices;
    }
  }

  generateMeshDataFromLinePt(pts, width, pixelPerUnit) {
    const data = {
      positions: [],
      uvs: [],
      indices: [],
    };
    if (pts.length < 2) return data;
    const ajustWidth = width / pixelPerUnit;
    for (let i = 0; i < pts.length; i++) {
      const point = new APJS.Vector3f(pts[i].x / pixelPerUnit, pts[i].y / pixelPerUnit, 0);
      let ptNormal = new APJS.Vector3f();
      if (i === 0) {
        // First point
        const nextPoint = new APJS.Vector3f(pts[i + 1].x / pixelPerUnit, pts[i + 1].y / pixelPerUnit, 0);
        const direction = nextPoint.clone().subtract(point).normalize();
        ptNormal = direction
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2);
      } else if (i === pts.length - 1) {
        // Last point
        const prevPoint = new APJS.Vector3f(pts[i - 1].x / pixelPerUnit, pts[i - 1].y / pixelPerUnit, 0);
        const direction = point.clone().subtract(prevPoint).normalize();
        ptNormal = direction
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2);
      } // Middle points
      else {
        const prevPoint = new APJS.Vector3f(pts[i - 1].x / pixelPerUnit, pts[i - 1].y / pixelPerUnit, 0);
        const nextPoint = new APJS.Vector3f(pts[i + 1].x / pixelPerUnit, pts[i + 1].y / pixelPerUnit, 0);
        const directionPrev = point.clone().subtract(prevPoint).normalize();
        const directionNext = nextPoint.clone().subtract(point).normalize();
        const normalPrev = directionPrev
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2);
        const normalNext = directionNext
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2);
        ptNormal = normalPrev.add(normalNext).multiplyScalar(0.5);
        const normalDir = ptNormal.clone().normalize();
        const nextDir = directionNext.clone().normalize();
        const cosTheta =
          normalDir.clone().cross(nextDir.clone()).magnitude() / normalDir.magnitude() / nextDir.magnitude();
        ptNormal = ptNormal.multiplyScalar(Math.min(1.0 / cosTheta, 3.0));
      }
      data.positions.push(point.clone().add(ptNormal));
      data.positions.push(point.clone().subtract(ptNormal));

      const uvY = (i * 1.0) / (pts.length - 1);
      data.uvs.push(new APJS.Vector2f(0, uvY));
      data.uvs.push(new APJS.Vector2f(1, uvY));
    }

    for (let i = 0; i < pts.length - 1; i++) {
      const startIndex = i * 2;

      data.indices.push(startIndex);
      data.indices.push(startIndex + 1);
      data.indices.push(startIndex + 2);

      data.indices.push(startIndex + 2);
      data.indices.push(startIndex + 1);
      data.indices.push(startIndex + 3);
    }
    return data;
  }

  renderMesh(transform, mesh, material) {
    if (!mesh || !this.camera || !material) return;
    let transformMatrix = new APJS.Matrix4x4f();
    transformMatrix.setIdentity();
    if (transform) {
      transformMatrix = transform.getWorldMatrix().clone();
    }
    const viewMatrix = lookAt(
      new APJS.Vector3f(0.0, 0.0, 40.0),
      new APJS.Vector3f(0.0, 0.0, 0.0),
      new APJS.Vector3f(0.0, 1.0, 0.0)
    );

    this.commandBuffer.setViewMatrix(viewMatrix);
    this.commandBuffer.setProjectionMatrix(this.camera.projectionMatrix);

    material.setMat4('u_Model', transformMatrix);
    material.setMat4('u_View', viewMatrix);
    material.setMat4('u_Projection', this.camera.projectionMatrix);

    const vpMatrix = this.camera.getWorldToClipMatrix();
    material.setMat4('u_MVP', vpMatrix.multiply(transformMatrix));

    this.commandBuffer.drawMesh(mesh, transformMatrix, material, 0, 0, null);
  }

  updateMesh() {
    this.pts = this.inputs[2]();
    this.width = this.inputs[3]();
    this.pixelPerUnit = this.inputs[4]();
    this.transform = this.inputs[6]();
    if (!this.transform) {
      if (this.mesh === null) {
        this.mesh = this.createLineMesh(this.pts, this.width, this.pixelPerUnit);
      } else {
        this.updateLineMeshVertex(this.mesh, this.pts, this.width, this.pixelPerUnit);
      }
    } else {
      if (this.transformMeshMap.has(this.transform)) {
        this.mesh = this.transformMeshMap.get(this.transform);
        this.updateLineMeshVertex(this.mesh, this.pts, this.width, this.pixelPerUnit);
      } else {
        this.mesh = this.createLineMesh(this.pts, this.width, this.pixelPerUnit);
        if (this.mesh) {
          if (this.material) {
            this.transformMaterialMap.set(this.transform, this.material.instantiate());
          }
          this.transformMeshMap.set(this.transform, this.mesh);
        }
      }
    }
  }

  beforeStart(sys) {
    this.sys = sys;
    if (this.outputTexture === null) {
      this.outputTexture = createRT(screenWidth, screenHeight);
    }
  }

  onStart() {
    this.camera = this.inputs[1]();
    this.pts = this.inputs[2]();
    this.width = this.inputs[3]();
    this.pixelPerUnit = this.inputs[4]();
    this.mesh = null;
    const matArray = this.inputs[5]();
    if (matArray && matArray[0]) {
      this.material = matArray[0].instantiate();
    }
  }

  submitRender() {
    this.commandBuffer.clearAll();
    let renderTarget = this.outputTexture;
    if (!renderTarget) {
      renderTarget = this.camera.renderTexture;
    }
    this.commandBuffer.setRenderTexture(renderTarget);
    this.commandBuffer.clearRenderTexture(true, true, new APJS.Color(0.0, 0.0, 0.0, 0.0), 1);
    if (this.transformMeshMap && this.transformMeshMap.size > 0) {
      this.transformMeshMap.forEach((value, key) => {
        let mat = this.transformMaterialMap.get(key);
        if (!mat) {
          mat = this.material;
        }
        this.renderMesh(key, value, mat);
      });
    } else {
      this.renderMesh(this.transform, this.mesh, this.material);
    }
    this.sys.APJScene.commitCommandBuffer(this.commandBuffer);
  }

  onUpdate(sys, dt) {
    this.submitRender();
  }

  clear() {
    this.pts = [];
    this.transformMeshMap.clear();
    this.mesh = null;
    if (this.material) {
      this.material.release();
      this.material = null;
    }
    this.transformMaterialMap.forEach((value, key) => {
      if (value) {
        value.release();
      }
    });
    this.transformMaterialMap.clear();
  }

  resetOnRecord() {
    this.clear();
  }

  onDestroy(sys) {
    this.renderTexture = null;
    this.clear();
  }
}
exports.CGLineRenderer2D = CGLineRenderer2D;
