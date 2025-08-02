const Amaz = effect.Amaz;

class TargetTracking_Component {
    constructor() {
        this.name = "TargetTracking_Component";
    }

    onEnable(){
    }

    onStart() {
        this.entity.visible = false;
    }

    onUpdate(deltaTime) {
    }

    onLateUpdate(deltaTime) {
    }

    onEvent(event) {
    }

    onDestroy(sys) {
    }
}

exports.TargetTracking_Component = TargetTracking_Component;
