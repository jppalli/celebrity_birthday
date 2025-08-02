//@ScriptComponent
const Amaz = effect.Amaz;
const used = (x) => { } // mark a variable was used, to avoid the optimization of V8 Engine

/**
 * FindContour will build sprites around the largest portrait contour.
 * PRD - https://bytedance.us.feishu.cn/docx/GofYdjh8po4744xtqVluWTl2sld
 * EHI PRD - https://bytedance.us.feishu.cn/docx/Mwn1dBGpzo7V0fxOuV8uH3EQsLf
 * Dependencies - MeshRenderer, AnimSeqComponent.  both added via script
 * Algorithm dependencies - FindPortraitContour, Matting
 */

var gradients = [1, -1, 0]

const permutation = [151, 160, 137, 91, 90, 15,
    131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
    190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
    88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
    102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
    135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
    5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
    223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
    251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
    49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
    138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function perlinNoise(x) {

    let X = Math.floor(x);
    x = x - X;
    X = X % 255;

    const n00 = gradients[(permutation[X]) % 2] * x;
    const n10 = gradients[(permutation[X + 1]) % 2] * (x - 1);

    const u = fade(x);

    return lerp(n00, n10, u);
}

class FindContour{

    constructor() {
        this.name = 'FindContour';
        this._curTime = 0;
        this._screenWidth = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
        this._screenHeight = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
        this._size = new Amaz.Vector2f(25.0, 25.0);
    }

    onStart() {
        this.findContourMeshRender = this.entity.addComponent("MeshRenderer");
        this.findContourMeshRender.autoSortingOrder = this.autoSortingOrder;
        this.findContourMeshRender.sortingOrder = this.sortingOrder;

        if(!this.resultMesh){
            this.resultMesh = this.createMesh();//create empty mesh
        }
        if(!this.resultMat){
            //create material by default mat, cannot use this.defaultMaterial directly,otherwise,it will cause mutil components use same one mat, change
            //one mat param, all component will be change
            this.resultMat = this.createMaterialInstance("findContourMat", this.defaultMaterial.xshader); 
        }

        this.findContourMeshRender.mesh = this.resultMesh;
        this.findContourMeshRender.material = this.resultMat;
        this.findContourMeshRender.enabled = false;
        
    }


    onUpdate(dt) {
        this._curTime = this._curTime + dt;
        this._createCustomMesh();

        //update material
        if(this.missingTex){
            //missing tex dont influce by color
            this.findContourMeshRender.material.setVec4("_AlbedoColor",new Amaz.Vector4f(1,1,1,1));
        }else{
            this.findContourMeshRender.material.setVec4("_AlbedoColor",new Amaz.Vector4f(this.color.r,this.color.g,this.color.b,this.color.a));
        }
        
        let ratio = this.itemTexture.width /this.itemTexture.height;

        this.findContourMeshRender.material.setTex("_AlbedoTexture", this.itemTexture);
        this.findContourMeshRender.material.setFloat("_Ratio", ratio); //ratio will make tex dont stretch
    }
    
    set size(size) {
        if (size instanceof Amaz.Vector2f) {
            this._size = size;
        }
        else {
            this._size = new Amaz.Vector2f(size, size);
        }
    }

    get size() {
        return this._size;
    }

    //#region calculation functions so that we show 0-100 sliders but process them here
    calcScaleX() {
        return (this.size.x / 100.0) * 10;
    }

    calcScaleY() {
        return (this.size.y / 100.0) * 10;
    }

    calcOffsetX() {
        return this.offset.x / 100;
    }

    calcOffsetY() {
        return this.offset.y / 100;
    }

    calcScaleOffset() {
        return this.perimeterGrowth / 100 * 20;
    }

    //takes a vec2 and crosses it with the back vector <0,0,-1>. returns a vec2
    //math is simplified and boiled down`
    calcNormal(a){
        return {x:-a.y, y:a.x};
    }

    normalize(vector){
        let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        let inv = 1 / length; 
        return {x:vector.x * inv, y:vector.y*inv};
    }

    //#endregion calculation functions


    _createCustomMesh() {
        const result = Amaz.AmazingManager.getSingleton("Algorithm").getAEAlgorithmResult();//RTTI functions for getting algorithm results
        if (!result) {
            if ( this.findContourMeshRender) {
                this.findContourMeshRender.enabled = false;
            }
            return;
        }
        const findContourCount = result.getFindContourCount();//RTTI result
        if (findContourCount === 0) {
            if ( this.findContourMeshRender) {
                this.findContourMeshRender.enabled = false;
            }
            return;
        }

        const verticesList = new Float32Array(4*5*this.number);  //use this type push vertice data,it will improve performance; 4 vert, every vert have 5 data(xyz, uv)
        const indices = new Uint16Array(6*this.number); //use this type push vertice data,it will improve performance; two triangle, 6 index

        const scaleX = this.calcScaleX() * 0.01;
        const scaleY = this.calcScaleY() * 0.01;
        const ratio = this._screenHeight / this._screenWidth;

        //there can be many contours found. The last contour tends to have the most points
        const findContourInfo = result.getFindContourInfo(findContourCount - 1);//RTTI contour info
        const contours = findContourInfo.contours;//RTTI vector of vector2f's. Will be converted to amg once we get the vecto2fs out.
        const pointXYArray = new Float32Array(Amaz.AmazingUtil.getArrayBuffer(contours)); //convert algo data to typearray,it will improve performance; one point x,y is adjacent two data in array,like x=a[0],y=a[1]

        const num = contours.size(); //the total point in the contourline
        const dis = num / this.number; //(the number of point to be shown): distance between two points
        const normalizedDist = dis * this.spread / 100;
        const delta = num / 150; //Interval how many point to create one item
        let gIndex = 0;

        const scaleOffset = this.calcScaleOffset();
        const offsetX = this.calcOffsetX();
        const offsetY = this.calcOffsetY();

        
        //builds a mesh by finding poins along the contour and then creating squares (2 triangles) around each point.
        for (let i = 0; i < this.number; i++) {
            let index_float = 1000;
            index_float = i * normalizedDist + num * 2 - this._curTime * this.speed * num / 500;

            if (index_float < 0 || index_float > 5000) {
                index_float = 1000;
                this._curTime = 0;
            }
            const indexNum = Math.floor(index_float) % num;
            const indexNum2 = Math.floor(index_float + delta) % num;

            //contours is RTTI and returns Amaz vectors so they need to be turned into amg vectors
            const sucaipoint = {x:pointXYArray[indexNum*2] ,y:pointXYArray[indexNum*2+1]} ; //position of each dot.
            const sucaipoint2 = {x:pointXYArray[indexNum2*2] ,y:pointXYArray[indexNum2*2+1]} ;

            const sucaipointX =  (sucaipoint.x / findContourInfo.width - 0.5) * 2; //convert from -1 to 1
            const sucaipointY = (1.0 - sucaipoint.y / findContourInfo.height - 0.5) * 2;

            const tDirStart = this.normalize({x:sucaipoint2.x-sucaipoint.x, y:sucaipoint2.y-sucaipoint.y});
            const tangentDir = {x:tDirStart.y, y:tDirStart.x};


            let noise = 0;
            if (this.noiseAmplitude != 0) {
                const p = permutation[i % 256] / 255.0;
                noise = perlinNoise((this.noiseFrequency / 50 * this._curTime) + p) * this.noiseAmplitude;
            }
            //calculate vertex position based on the center
            const flipVertically = this.flipVertically ? -1 : 1;
            const flipHorizontally = this.flipHorizontally ? -1 : 1;

            let x = flipHorizontally*(sucaipointX + 0.01 * (-scaleOffset + noise) * tangentDir.x);
            let y = flipVertically*(sucaipointY + 0.01 * (-scaleOffset + noise) * tangentDir.y);
            const point = {x:x,y:y};

            let dirVector = null;//the up dir vector for each sprite
            if (this.rotationAlignment === 'ROT_ALIGN_TAN') {
                dirVector = this.normalize({x:sucaipoint2.x-sucaipoint.x, y:sucaipoint2.y-sucaipoint.y});
                dirVector = {x:dirVector.y, y:dirVector.x};
            } else if (this.rotationAlignment === 'ROT_ALIGN_NORMAL') {
                let a = this.normalize({x:sucaipoint2.x-sucaipoint.x, y:sucaipoint2.y-sucaipoint.y});
                dirVector = this.calcNormal({x:a.y, y:a.x});
            }  else if (this.rotationAlignment === 'ROT_ALIGN_RANDOM') {
                const p = permutation[i % 256] / 255.0;
                const noiseRotation = perlinNoise(this._curTime + p)
                let randomTick = Math.floor(Math.sin(noiseRotation * this.rotationSpeed) * 3.0); // get a random value related with time
                let radius = ((Math.sin((i+1) * randomTick) * 0.5 + 0.5) * 43567.5453)%1 * 6.2831852; // get a random value related with index
                dirVector = {x:Math.cos(radius), y:Math.sin(radius)};
            }
            else {
                dirVector = {x:1.0, y:0.0};
            }

            //now that we have the contour points we can build 2 triangles for each point in order to make a square to render the texture on
            for (let j = 0; j < 4; j++) {
                const uv = {};
                const squareVertex = {};

                if (j == 0) {
                    uv.x = 0;
                    uv.y = 0;
                    squareVertex.x = ratio * (dirVector.y - dirVector.x);
                    squareVertex.y = -dirVector.x - dirVector.y;
                }
                else if (j == 1) {
                    uv.x = 1;
                    uv.y = 0;
                    squareVertex.x = ratio * (dirVector.x + dirVector.y);
                    squareVertex.y = dirVector.y - dirVector.x;
                }
                else if (j == 2) {
                    uv.x = 1;
                    uv.y = 1;
                    squareVertex.x = ratio * (dirVector.x - dirVector.y);
                    squareVertex.y = dirVector.x + dirVector.y;
                }
                else if (j == 3) {
                    uv.x = 0;
                    uv.y = 1;
                    squareVertex.x = -ratio * (dirVector.x + dirVector.y);
                    squareVertex.y = dirVector.x - dirVector.y;
                }

                let index = (i*4+j)*5;
                verticesList[index] = point.x + squareVertex.x*scaleX + offsetX;
                verticesList[index+1] = point.y + squareVertex.y*scaleY + offsetY;
                verticesList[index+2] = 0;
                verticesList[index+3] = uv.x;
                verticesList[index+4] = uv.y;
            }
            const indice = [0, 1, 2, 0, 2, 3];
            for (let j = 0; j < 6; j++) {
                indices[i*6+j] = gIndex + indice[j];
            }
            gIndex += 4;
        }


        if(this.findContourMeshRender){
            //use arrayBufferToPrimitiveVector improve performance
            let vertices = new Amaz.FloatVector();
            let indicesVector = new Amaz.UInt16Vector();
            Amaz.AmazingUtil.arrayBufferToPrimitiveVector(verticesList.buffer , vertices);
            Amaz.AmazingUtil.arrayBufferToPrimitiveVector(indices.buffer , indicesVector);

            this.findContourMeshRender.mesh.vertices = vertices;
            this.findContourMeshRender.mesh.submeshes.get(0).indices16 = indicesVector;
            this.findContourMeshRender.enabled = true;
        }

    }


    onEnable(){
        if ( this.findContourMeshRender) {
            this.findContourMeshRender.enabled = true;
        }
        console.log("[onEnable]",this.name);
    }

    onDisable() {
        if ( this.findContourMeshRender) {
            this.findContourMeshRender.enabled = false;
        }
        console.log("[onDisable]",this.name);
    }

    createMaterialInstance(name, xshader) {
        var mat = new Amaz.Material();
        mat.name = name;
        mat.xshader = xshader;
        return mat;
    }



    createMesh() {
        let mesh = new Amaz.Mesh()
        let subMesh = new Amaz.SubMesh()
        // setup attributes
        let attribs = new Amaz.Vector()
        let attribPos = new Amaz.VertexAttribDesc()
        attribPos.semantic = Amaz.VertexAttribType.POSITION
        attribs.pushBack(attribPos);
        let attribuv = new Amaz.VertexAttribDesc();
        attribuv.semantic = Amaz.VertexAttribType.TEXCOORD0;
        attribs.pushBack(attribuv);
        mesh.vertexAttribs = attribs
        subMesh.primitive = Amaz.Primitive.TRIANGLES
        subMesh.mesh = mesh
        mesh.addSubMesh(subMesh)
        return mesh
      }



}

exports.FindContour = FindContour;

