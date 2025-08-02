/* eslint-disable */
 // Amaz
const Amaz = effect.Amaz;
class DyeHair {
    constructor() {
        this.name = "DyeHair";
        this.nodeName = "bleachhair";

        // BleachHair GAN
        this.ganTextureUniform = "ganTexture";
        this.maskTextureUniform = "maskTexture";
        this.ganTransform = "mvpMat"
        this.enableUniform = "enable";

        this.typeEnum = {
            all: 'all',
            gradient: 'gradient',
            highlight: 'highlight',
            picture: 'picture',
        };

        this.gradientType = {
            leftRight : 'leftRight',
            upDown : 'upDown',
        }

        // 0-3 tiaoran mask, 4 -> whole mask
        this.maskUniformMap = [
            'tiaoRanMask0', 
            'tiaoRanMask1', 
            'tiaoRanMask2', 
            'tiaoRanMask3', 
            'tiaoRanMask4'
        ];

        this.reflectorUniformMap = [
            'reflector0',
            'reflector1',
            'reflector2',
            'reflector3',
            'reflector4'
        ];

        this.testerResult_isHair = false;
        this.testerResult_isHair_tiaoran = false;
        this.testerResult_isGAN = false;
    }

    onEnable(){
        this.dynamicSetAlgorithmEnable(true);
    }

    onDisable() {
        this.dyeHairMeshRender.enabled = false;
        this.dynamicSetAlgorithmEnable(false);
    }

    dynamicSetAlgorithmEnable(enable) {
        let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
        const algoList = ["blit_0", "hair_0"];
        const _isGAN = this.isCurrentTypeGAN();

        if (enable) {
          for (let i = 0; i < algoList.length; ++i) {
            Algorithm.setAlgorithmEnable(this.graphName, algoList[i], true);
          }
          if (_isGAN) Algorithm.setAlgorithmEnable(this.graphName, "bleachhair", true);
        } else {
          for (let i = algoList.length - 1; i >= 0; --i) {
            Algorithm.setAlgorithmEnable(this.graphName, algoList[i], false);
          }
          if (_isGAN) Algorithm.setAlgorithmEnable(this.graphName, "bleachhair", false);
        }
    }

    onStart() {
        this.faceIndices = new Amaz.Vector(); 
        this.faceIndices.pushBack(0);

        // create meshRenderer
        this.dyeHairMeshRender = this.entity.addComponent("MeshRenderer");
        this.dyeHairMeshRender.autoSortingOrder = this.autoSortingOrder;
        this.dyeHairMeshRender.sortingOrder = this.sortingOrder;

        if(!this.quadMesh){
            this.quadMesh = this.defaultQuad;
        }


        if(!this.resultMat){
            //create material by default mat, cannot use this.defaultMaterial directly,otherwise,it will cause mutil components use same one mat, change
            //one mat param, all component will be change
            // this.resultMat = this.createMaterialInstance("DyeHairMat", this.defaultMaterial); 
        
            // init shader
            switch (this.type) {
                case this.typeEnum.gradient:
                    if (this.isGAN_gradient) this.initGANShader();
                    else {
                        this.resultMat = this.Material_DyeHair_gradient.instantiate();
                        this.resultMat.enableMacro("AE_isGradient",1);
                        if(this.type_gradient == this.gradientType.leftRight){
                            this.resultMat.enableMacro("AE_Horizontal",1);
                        }else{
                            this.resultMat.disableMacro("AE_Horizontal");
                        }
                    }
                    break;
                case this.typeEnum.picture:
                    if (this.isGAN_picture) this.initGANShader();
                    else{
                        this.resultMat = this.Material_DyeHair_picture.instantiate();
                    }
                    break;
                case this.typeEnum.all:
                    if (this.isGAN_all) this.initGANShader();
                    else{
                        this.resultMat = this.Material_DyeHair_gradient.instantiate();
                        this.resultMat.enableMacro("AE_isAll",1);
                    }
                    break;
                case this.typeEnum.highlight:
                    this.resultMat = this.Material_DyeHair_gradient.instantiate();
                    this.resultMat.enableMacro("AE_isHighlight",1);
                    break;
            }

            // init uniform and tex
            switch (this.type) {
                case this.typeEnum.gradient:
                    this.resultMat.setTex(this.maskTextureUniform, new Amaz.Texture2D());
                    break;  
                case this.typeEnum.highlight:
                    this.maskUniformMap.forEach( uniform => {
                        this.resultMat.setTex(uniform, new Amaz.Texture2D());
                    })

                    this.reflectorUniformMap.forEach( uniform => {
                        this.resultMat.setFloat(uniform, 0);
                    })
                    break;  
                case this.typeEnum.picture:
                    this.resultMat.setTex(this.maskTextureUniform, new Amaz.Texture2D());
                    break;  
                default: // all & others
                    this.resultMat.setTex(this.maskTextureUniform, new Amaz.Texture2D());
            }
        }


        this.dyeHairMeshRender.mesh = this.quadMesh;
        this.dyeHairMeshRender.material = this.resultMat;

        this.initTransform();
    }

    initTransform(){
        this.entityTransform = this.entity.getComponent("Transform");
        this.oriPosition = new Amaz.Vector3f(0,0,0);
        this.oriScale = new Amaz.Vector3f(0,0,0);
        const quat = new Amaz.Quaternionf();
        const newRot =  new Amaz.Vector3f(0,0,0);
        this.oriRotation = quat.eulerToQuaternion(newRot);
    }

    setTransform(){
        if(this.entityTransform){
            this.entityTransform.setWorldPosition(this.oriPosition);
            this.entityTransform.setWorldScale(this.oriScale);
            this.entityTransform.setWorldOrientation(this.oriRotation);
        }
    }

    initGANShader() {
        this.resultMat = this.Material_DyeHair_GAN.instantiate();
        switch (this.type) {
            case this.typeEnum.gradient:
                this.resultMat.enableMacro("AE_isGradient",1);
                if(this.type_gradient == this.gradientType.leftRight){
                    this.resultMat.enableMacro("AE_Horizontal",1);
                }else{
                    this.resultMat.disableMacro("AE_Horizontal");
                }
                break;
            case this.typeEnum.all:
                this.resultMat.enableMacro("AE_isAll",1);
                break;
            case this.typeEnum.highlight:
                this.resultMat.enableMacro("AE_isHighlight",1);
                break;
            case this.typeEnum.picture:
                this.resultMat.enableMacro("AE_isPicture",1);
                break;
        }

        this.resultMat.setTex(this.ganTextureUniform, new Amaz.Texture2D());

        // Hair result mask
        this.resultMat.setTex(this.maskTextureUniform, new Amaz.Texture2D());
        
        // GAN mask
        this.resultMat.setTex("GANmaskTexture", this.ganmask);
        this.resultMat.setFloat(this.enableUniform, 0.0);
    }

    onUpdate(deltaTime) {

        this.setTransform();

        this.activeAlgoTester();

        this.dyeHairMeshRender.enabled = false;

        switch (this.type) {
            case this.typeEnum.all:
                if (this.testerResult_isHair || this.testerResult_isHair_tiaoran) this.show_all();

                break;
            case this.typeEnum.gradient:
                if (this.testerResult_isHair || this.testerResult_isHair_tiaoran) this.show_gradient();

                break;
            case this.typeEnum.highlight:
                if (this.testerResult_isHair_tiaoran) this.show_highlight();

                break;

            case this.typeEnum.picture:
                if (this.testerResult_isHair || this.testerResult_isHair_tiaoran) this.show_picture();

                break;
            default:
        }
        this.show_GAN();
    }

    isCurrentTypeGAN() {
        switch (this.type) {
            case this.typeEnum.all:
                return this.isGAN_all;
                break;
            case this.typeEnum.gradient:
                return this.isGAN_gradient;
                break;
            case this.typeEnum.picture:
                return this.isGAN_picture
                break;
            default:
                return false;
        }
    }

    show_GAN () {

        // disable at first
        const material = this.dyeHairMeshRender.material;
        material.setFloat(this.enableUniform, 0.0);

        if (!this.isCurrentTypeGAN() || !this.testerResult_isGAN || this.type === this.typeEnum.highlight) { // not include tiaoran
            return;
        }
            
        let transform=this.entity.getComponent("Transform");
        if(transform){
            transform.worldOrientation=new Amaz.Vector3f(0,0,0);
            transform.worldPosition=new Amaz.Vector3f(0,0,0);
            transform.worldScale=new Amaz.Vector3f(1,1,1);
        }

        const _algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
        const algoResult = _algorithm.getAEAlgorithmResult();

        if (!algoResult) return; 

        // GAN
        let GANresult = _algorithm.getAEAlgorithmResult(this.graphName);

        let nodeInfo = GANresult.getAlgorithmInfo(this.graphName, this.nodeName, "", this.faceIndices.get(0));
        if (!nodeInfo) nodeInfo = GANresult.getAlgorithmInfo("orion_default_graph_name", this.nodeName, "", this.faceIndices.get(0));

        const faceCount = algoResult.getFaceCount();

        if (nodeInfo && faceCount > 0.001) {
            let data = nodeInfo.outputMap;
            let matrix = data.get("mvpMat");
            let image0 = data.get("image");
            material.setMat4(this.ganTransform, matrix);
            material.getTex(this.ganTextureUniform).storage(image0);
            if(this.type_gradient == this.gradientType.leftRight){
                material.enableMacro("AE_Horizontal",1);
            }else{
                material.disableMacro("AE_Horizontal");
            }

            this.setSharpenContrast();

            material.setFloat(this.enableUniform, 1.0);
        } else { 
            material.setFloat(this.enableUniform, 0.0);
        }
    }

    show_all () {
        const hairmaskImage = this.getHairMaskImage();
        const material = this.dyeHairMeshRender.material;
        if (hairmaskImage) {
            material.getTex(this.maskTextureUniform).storage(hairmaskImage);
            material.setVec4("_Color", this.colorToVec4(this.color_all, this.opacity_all));
            material.setFloat("_smoothness", 0.9 * (1.0 - this.smoothness_all));
            this.dyeHairMeshRender.enabled = true;
        };
    } 

    show_gradient () {
        const hairmaskImage = this.getHairMaskImage();
        const material = this.dyeHairMeshRender.material;
        if (hairmaskImage) {
            if(this.type_gradient == this.gradientType.leftRight){
                material.enableMacro("AE_Horizontal",1);
            }else{
                material.disableMacro("AE_Horizontal");
            }
            material.getTex(this.maskTextureUniform).storage(hairmaskImage);

            material.setVec4("_FirstColor", this.colorToVec4(this.color_gradient_1,this.opacity_gradient_1));
            material.setVec4("_SecondColor", this.colorToVec4(this.color_gradient_2,this.opacity_gradient_2));

            material.setFloat("_smoothness", 0.9 * (1.0 - this.smoothness_gradient));
            material.setFloat("_RampRatio", this._lerp( this.gradient_ratio));

            if (this.isFlip) {
                material.setFloat("isFlip", 0.0);
            } else {
                material.setFloat("isFlip", 1.0);
            }
            
            this.dyeHairMeshRender.enabled = true;
        }
    }

    show_highlight () {

        const algoResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
        const hairGerCnt = algoResult.getHairGerInfoCount();
        const material = this.dyeHairMeshRender.material;
        if (hairGerCnt > 0) {
            for (let i = 0; i < hairGerCnt; i++) {
                const hairGerInfo = algoResult.getHairGerInfo(i);
                material.getTex(this.maskUniformMap[i]).storage(hairGerInfo.image);
                material.setFloat(this.reflectorUniformMap[i], hairGerInfo.reflector);
            }
            // set color and 1
            material.setVec4("color_tiaoran_1", this.colorToVec4(this.color_tiaoran_1,this.opacity_tiaoran_1));
            material.setVec4("color_tiaoran_2", this.colorToVec4(this.color_tiaoran_2,this.opacity_tiaoran_2));
            material.setVec4("color_tiaoran_3", this.colorToVec4(this.color_tiaoran_3,this.opacity_tiaoran_3));
            material.setVec4("color_tiaoran_4", this.colorToVec4(this.color_tiaoran_4,this.opacity_tiaoran_4));

            material.setFloat("_smoothness", (1.0 - this.smoothness_tiaoran));

            this.dyeHairMeshRender.enabled = true;
        } 
    }

    show_picture () {
        const hairmaskImage = this.getHairMaskImage();
        const material = this.dyeHairMeshRender.material;
        if (hairmaskImage) {
            material.getTex(this.maskTextureUniform).storage(hairmaskImage);
            material.setTex("inputTexture", this.texture_picture);
            material.setFloat("opacity", this.opacity_texture);
            material.setFloat("_smoothness", 0.9 * (1.0 - this.smoothness_picture));

            this.dyeHairMeshRender.enabled = true;
        }
    }

    getHairMaskImage() {
        if (this.testerResult_isHair) {
            const algoResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
            if (!algoResult) {
                return;
            }
            const hairInfo = algoResult.getHairInfo();
    
            if (!hairInfo) {
                return
            }

            return hairInfo.mask;
        } else if (this.testerResult_isHair_tiaoran) {
            const algoResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
            const hairGerCnt = algoResult.getHairGerInfoCount();
            if (hairGerCnt > 0) {
                    const hairGerInfo = algoResult.getHairGerInfo(4);
                    if (hairGerInfo) return hairGerInfo.image;
                    else return;
            }
        } else {
            return;
        }
    }


    onDestroy(sys) {
    }

    // util methods ↓

    colorToVec4(color, alpha) {
        if(alpha === undefined || alpha === null){
            alpha = color.a;
        }
        return new Amaz.Vector4f(color.r, color.g, color.b, alpha);
    }


    createMaterialInstance(name, material) {
        var mat = new Amaz.Material();
        mat.name = name;
        mat.xshader = material.xshader;

        // get omtl default properties
        mat.properties = material.properties;

        return mat;
    }

    activeAlgoTester() {
        const _algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
        const algoResult = _algorithm.getAEAlgorithmResult();
        
        let isHair = false;
        let isHair_tiaoran = false;
        let _isGAN = false;

        if (!algoResult) return; 

        // hair
        const hairInfo = algoResult.getHairInfo();
        if (hairInfo) isHair = true;

        // tiaoran
        const hairGerCnt = algoResult.getHairGerInfoCount();
        if (hairGerCnt){
            if (hairGerCnt > 0) isHair_tiaoran = true;
        }

        // GAN
        const nodeName = "bleachhair";
        let GANresult = _algorithm.getAEAlgorithmResult(this.graphName);

        let nodeInfo = GANresult.getAlgorithmInfo(this.graphName, nodeName, "", this.faceIndices.get(0));
        if (!nodeInfo) nodeInfo = GANresult.getAlgorithmInfo("orion_default_graph_name", nodeName, "", this.faceIndices.get(0));

        if (nodeInfo) _isGAN = true;

        // update tester result
        this.testerResult_isHair = isHair;
        this.testerResult_isHair_tiaoran = isHair_tiaoran;
        this.testerResult_isGAN = _isGAN;
    }


    setSharpenContrast() {
        const material = this.dyeHairMeshRender.material;
        material.setFloat("_contrast", this.GAN_contrast);

        switch (this.type) {
            case this.typeEnum.all:
                material.setFloat("_midtone", this.GAN_midtone_all);
                break;
            case this.typeEnum.gradient:
                material.setFloat("_midtone", this.GAN_midtone_gradient);
                break;
            case this.typeEnum.picture:
                material.setFloat("_midtone", this.GAN_midtone_picture);
                break;
            default:
                return false;
        }
    }

    _lerp(input) {
        // Define the input range
        const inputStart = 0;
        const inputEnd = 1;

        // Define the output range
        // const outputStart = 0.000001;
        const outputStart = 0.2;
        const outputEnd = 3;

        // Calculate the ratio of the input range
        const inputRange = inputEnd - inputStart;
        const outputRange = outputEnd - outputStart;

        // Check if the input is within the expected range
        if (input < inputStart || input > inputEnd) {
            return null;
        }

        // Calculate the interpolated value
        const normalizedInput = (input - inputStart) / inputRange;
        const lerpValue = normalizedInput * outputRange + outputStart;

        return lerpValue;
    }
}

exports.DyeHair = DyeHair;



// set reflectBlendMode(_blendMode: number) {
//     BlendModeTypeToMacro.forEach(macro => {
//       this._cloneEyeColorOMTL.setStaticMacroByName(macro.value + '_FORREFLECT', macro.key === _blendMode);
//     });
//     this.setTargetProperty('reflectBlendMode', _blendMode);
//   }
//   get reflectBlendMode(): number {
//     return this.getTargetProperty('reflectBlendMode') as number;
//   }
