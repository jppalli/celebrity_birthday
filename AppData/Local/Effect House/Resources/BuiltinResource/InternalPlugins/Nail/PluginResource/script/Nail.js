// Amaz
const Amaz = effect.Amaz;
const APJS = require('amazingpro.js');

const fingerNames = [
    "unknown",
    "thumb",
    "index",
    "mid",
    "ring",
    "pinky",
];

class Nail {
    constructor() {
        this.name = "Nail";
        this.apjsSceneObject = null;
    }

    onEnable(){
        console.log("[OnEnable]",this.name);
        if (this.nailMeshRenderer) {
            this.nailMeshRenderer.enabled = true;
        }
    }

    onDisable() {
        if (this.nailMeshRenderer) {
            this.nailMeshRenderer.enabled = false;
        }
    }

    onStart() {
	    console.log("running:Nail:onStart"); 
        this.uvList = this.generateUvList();
        this.indices = this.generateIndices();
        this.apjsSceneObject = APJS.transferToAPJSObj(this.entity);
        this.nailMeshRenderer = this.apjsSceneObject.addComponent("MeshRenderer");
        this.nailMeshRenderer.autoSortingOrder = this.autoSortingOrder;
        this.nailMeshRenderer.sortingOrder = this.sortingOrder;
        this.nailMeshRenderer.instancedMaterial = APJS.transferToAPJSObj(this.materialNail.instantiate());
        this.pointCache = [];
        this.smooth_gidx = 1;
        this.width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
        this.height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
        if (this.nailMeshRenderer.setEditorFlag) {
            this.nailMeshRenderer.setEditorFlag(1, true);
        }
    }

    onUpdate(deltaTime) {        
        const alResult =  APJS.AlgorithmManager.getResult();
        if (!alResult) {
            return;
        }

        const nailcount = alResult.getNailKeyPointInfoCount();
        if (nailcount <= 0) {
            return;
        }
        let foundNail = false;
        for (let i = 0; i < nailcount; i++) {
            const nailInfo = alResult.getNailKeyPointInfo(i);
            if (nailInfo.cls <= 0 || fingerNames[nailInfo.cls] !== this.nailType) {
                continue;
            }
            foundNail = true;
            this.vertexList = this.generateVertexBy(nailInfo.kpts);
            this.generateMeshOnMeshRendererComponent();
            this.setMaterialProperties();
            break;
        }

        if(this.nailMeshRenderer.autoSortingOrder !== this.autoSortingOrder) {
            this.nailMeshRenderer.autoSortingOrder = this.autoSortingOrder;
        }
        if(this.nailMeshRenderer.sortingOrder !== this.sortingOrder) {
            this.nailMeshRenderer.sortingOrder = this.sortingOrder;
        }

        if (!foundNail) {
            this.nailMeshRenderer.enabled = false;
        } else {
            this.nailMeshRenderer.enabled = true;
        }
    }

    onLateUpdate(deltaTime) { 	
    }

    onEvent(event) {
    }

    onRelease() {
        this.removeMeshRenderer();
    }

    onDestroy(sys) {
        this.removeMeshRenderer();
    }

    removeMeshRenderer() {
        if (this.nailMeshRenderer) {
            this.apjsSceneObject.removeComponent(this.nailMeshRenderer);
            this.nailMeshRenderer = undefined;
        }
    }

    generateUvList() {
        const uvMapKey = [
            {x: 44, y: 218},
            {x: 46, y: 152},
            {x: 130, y: 50},
            {x: 213, y: 160},
            {x: 218, y: 218},
            {x: 214, y: 358},
            {x: 132, y: 412},
            {x: 50, y: 358}
        ];
        let uvMapCenter = {x: 0, y: 0};
        const uvMapSize = {x: 258, y: 453};

        let p_num = 0;
        for (let j = 0; j < uvMapKey.length; j++) {
            if (j !== 0 && j !== 4) {
                uvMapCenter.x += uvMapKey[j].x;
                uvMapCenter.y += uvMapKey[j].y;
                p_num++;
            }
        }
        uvMapCenter.x /= p_num;
        uvMapCenter.y /= p_num;
    
        uvMapKey.forEach(point => {
            point.x = uvMapCenter.x + (point.x - uvMapCenter.x) * 2.0;
            point.y = uvMapCenter.y + (point.y - uvMapCenter.y) * 2.0;
        });
    
        uvMapKey.forEach(point => {
            point.x /= uvMapSize.x;
            point.y /= uvMapSize.y;
        });
        uvMapCenter.x /= uvMapSize.x;
        uvMapCenter.y /= uvMapSize.y;
    
        const uvList = uvMapKey.map(point => [point.x, 1 - point.y]);
        uvList.push([uvMapCenter.x, 1 - uvMapCenter.y]);

        return uvList;
    }

    generateIndices() {
        const indices = [
            8, 1, 0,
            8, 2, 1,
            8, 3, 2,
            8, 4, 3,
            8, 5, 4,
            8, 6, 5,
            8, 7, 6,
            8, 0, 7
        ];
        return indices;
    }
    
    generateVertexBy(nailKeyPoints) {
        let p = [];
        let fp = [];
        for (let j = 0; j < 8; j++) {
            p.push({x: nailKeyPoints[j*2], y: nailKeyPoints[j*2 + 1]});
            fp.push({x: nailKeyPoints[j*2], y: nailKeyPoints[j*2 + 1]});
        }
    
        let factor = 1.15;
        fp[2].x = p[6].x + factor * (p[2].x - p[6].x);
        fp[2].y = p[6].y + factor * (p[2].y - p[6].y);
    
        factor = 0.001;
        fp[1].x = fp[0].x + factor * (fp[2].x - p[6].x);
        fp[1].y = fp[0].y + factor * (fp[2].y - p[6].y);
        fp[3].x = fp[4].x + factor * (fp[2].x - p[6].x);
        fp[3].y = fp[4].y + factor * (fp[2].y - p[6].y);

        factor = 0.005;
        fp[1].x += factor * (fp[4].x - fp[0].x);
        fp[1].y += factor * (fp[4].y - fp[0].y);
        fp[3].x += factor * (fp[0].x - fp[4].x);
        fp[3].y += factor * (fp[0].y - fp[4].y);
    
        let centerp = {x: 0, y: 0};
        let p_num = 0;
        for (let j = 0; j < 8; j++) {
            if (j !== 0 && j !== 4) { 
                centerp.x += fp[j].x;
                centerp.y += fp[j].y;
                p_num++;
            }
        }
        centerp.x /= p_num;
        centerp.y /= p_num;
    
        for (let j = 0; j < 8; j++) {
            fp[j].x = centerp.x + (fp[j].x - centerp.x) * 2.0;
            fp[j].y = centerp.y + (fp[j].y - centerp.y) * 2.0;
        }
        
        let filteredResult = this.smoothFilter(fp, centerp);
        let applyedLengthResult = this.applyLength(filteredResult);
        
        let vertexList = [];
        for (let j = 0; j < 8; j++) {
            vertexList.push([applyedLengthResult[j].x*2-1, 1-applyedLengthResult[j].y*2, 0]);
        }
        vertexList.push([centerp.x*2-1, 1-centerp.y*2, 0]);
    
        return vertexList;
    }

    squareDistance(point1, point2) {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    }
    
    pixelDistance(point1, point2) {
        return Math.abs(point1.x - point2.x) * this.width + Math.abs(point1.y - point2.y) * this.height;
    }
    
    smoothFilter(points, pcenter) {
        let dirty = true;
        const limit = 20.0;
        for (let i = 0; i < this.pointCache.length; i++) {
            const sdist = this.pixelDistance(this.pointCache[i].center, pcenter);
            if (sdist < limit) {
                dirty = false;
                for (let j = 0; j < points.length; j++) {
                this.pointCache[i].points[j].x =
                    pcenter.x + (this.pointCache[i].points[j].x - this.pointCache[i].center.x) * 0.8 +
                    (points[j].x - pcenter.x) * 0.2;
                this.pointCache[i].points[j].y =
                    pcenter.y + (this.pointCache[i].points[j].y - this.pointCache[i].center.y) * 0.8 +
                    (points[j].y - pcenter.y) * 0.2;
                }
                this.pointCache[i].center.x = pcenter.x;
                this.pointCache[i].center.y = pcenter.y;
        
                return this.pointCache[i].points;
            }
        }
        if (dirty) {
            if (this.pointCache.length < 6) {
                this.pointCache.push({ points: points, center: pcenter });
            } else {
                this.pointCache[this.smooth_gidx - 1] = { points: points, center: pcenter };
                this.smooth_gidx += 1;
                if (this.smooth_gidx > 6) {
                this.smooth_gidx = 1;
                }
            }   
        }
        return points;
    }
    
    applyLength(points) {
        let vp = [];
        for (let j = 0; j < points.length; j++) {
            vp.push({x: points[j].x, y: points[j].y});
        }
        this.nailLength = Math.min(Math.max(this.nailLength, 0), 3);
        if (this.nailLength >= 1) {
            let offsetx = vp[2].x - vp[6].x;
            let offsety = vp[2].y - vp[6].y;
            let offsetLength = this.squareDistance(vp[2],vp[6]);
            let ratios1 = [this.squareDistance(vp[0],vp[7])/offsetLength, this.squareDistance(vp[1],vp[7])/offsetLength, 1.0, this.squareDistance(vp[3],vp[5])/offsetLength, this.squareDistance(vp[4],vp[5])/offsetLength];
            let ratios2 = [1.1-0.1*this.nailLength, 1.05-0.05*this.nailLength, 1, 1.05-0.05*this.nailLength, 1.1-0.1*this.nailLength];

            for (let j = 0; j < 5; j++) {
                let ratio1 = ratios1[j];
                let ratio2 = ratios2[j];
                vp[j].x = vp[j].x + offsetx * (this.nailLength - 1) * ratio1 * ratio2;
                vp[j].y = vp[j].y + offsety * (this.nailLength - 1) * ratio1 * ratio2;
            }
        } else {
            let targetIndexs = [7, 7, 6, 5, 5];
            for (let j = 0; j < 5; j++) {
                let targetIndex = targetIndexs[j];
                vp[j].x = vp[j].x * this.nailLength + vp[targetIndex].x * (1 - this.nailLength);
                vp[j].y = vp[j].y * this.nailLength + vp[targetIndex].y * (1 - this.nailLength);
            }
        }
        return vp;
    }

    generateMeshOnMeshRendererComponent() {
        if (this.nailMeshRenderer.mesh === null) {
            const mesh = new APJS.Mesh();
            const pos = new APJS.VertexAttribDesc();
            pos.semantic = APJS.VertexAttribType.POSITION;
            const uv = new APJS.VertexAttribDesc();
            uv.semantic = APJS.VertexAttribType.TEXCOORD0;
            const vads = new APJS.Vector();
            vads.pushBack(pos);
            vads.pushBack(uv);
            mesh.vertexAttribs = vads;

            mesh.vertices = this.generateVertices();

            const subMesh = new APJS.SubMesh();
            subMesh.primitive = APJS.Primitive.TRIANGLES;
            const indices = new APJS.UInt16Vector();
            for (let i = 0; i < this.indices.length; ++i) {
                indices.pushBack(this.indices[i]);
            }
            subMesh.indices16 = indices;
            subMesh.mesh = mesh;
            mesh.addSubMesh(subMesh);

            this.nailMeshRenderer.mesh = mesh;
        } else {
            this.nailMeshRenderer.mesh.vertices = this.generateVertices();
        }
    }

    generateVertices() { 
        const fv = new APJS.FloatVector();
        for (let i = 0; i < this.vertexList.length; ++i) {
            for (let j = 0; j < this.vertexList[i].length; ++j) {
                fv.pushBack(this.vertexList[i][j]);
            }
            for (let j = 0; j < this.uvList[i].length; ++j) {
                fv.pushBack(this.uvList[i][j]);
            }
        }
        return fv;
    }

    setMaterialProperties() {
        this.nailMeshRenderer.instancedMaterial.setTex('_MainTex', APJS.transferToAPJSObj(this.nailTexture));
    }
}

exports.Nail = Nail;
