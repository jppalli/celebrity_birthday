const APJS = require('./amazingpro');
const Amaz = effect.Amaz;

class PBDSystem {
    
    constructor() {
        this.name = "PBDSystem";
        this.physics3DInstance = APJS.Physics3D.getInstance();
    }

    onInit() {
        APJS.Physics3D.onInit(this.scene);
    }

    onUpdate(deltaTime) {
        APJS.Physics3D.onUpdate(deltaTime);
    }

    onLateUpdate(deltaTime) {
        APJS.Physics3D.onLateUpdate(deltaTime);
    }

    onEvent(event) {
        APJS.Physics3D.onEvent(event);
    }

    onComponentAdded(comp) {
        APJS.Physics3D.onComponentAdded(comp);
    }

    
    onDestroy(sys) {
        APJS.Physics3D.onDestroy();
    }


}

exports.PBDSystem = PBDSystem;