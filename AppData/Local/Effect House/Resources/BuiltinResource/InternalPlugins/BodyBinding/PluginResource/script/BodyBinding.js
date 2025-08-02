// Amaz
const Amaz = effect.Amaz;


const PT_NUM_IDS_BACK = {
    Nose: 0,
    Neck: 1,
    RightShoulder: 2,
    RightElbow: 3,
    RightWrist: 4,
    LeftShoulder: 5,
    LeftElbow: 6,
    LeftWrist: 7,
    RightHip: 8,
    RightKnee: 9,
    RightAnkle: 10,
    LeftHip: 11,
    LeftKnee: 12,
    LeftAnkle: 13,
    RightEye: 14,
    LeftEye: 15,
    RightEar: 16,
    LeftEar: 17,
}

const PT_NUM_IDS_FONT = {
    Nose: 0,
    Neck: 1,
    LeftShoulder: 2,
    LeftElbow: 3,
    LeftWrist: 4,
    RightShoulder: 5,
    RightElbow: 6,
    RightWrist: 7,
    LeftHip: 8,
    LeftKnee: 9,
    LeftAnkle: 10,
    RightHip: 11,
    RightKnee: 12,
    RightAnkle: 13,
    LeftEye: 14,
    RightEye: 15,
    LeftEar: 16,
    RightEar: 17,
}

class BodyBinding {
    constructor() {
        this.name = "BodyBinding";
        this.bodyAnchorID = 0;
        this.bodyNumber = 0;
        this.bodyTransform = null;
        this.camera = null;
        this.cameraTramsform = null;
        this.distance = 120;
    }

    onEnable(){
        console.log("[OnEnable]",this.name);
    }

    onStart() {
        console.log("running:BodyBinding:onStart"); 
        this.bodyTransform = this.entity.getComponent("Transform");
        this.camera = this.getCamera();
        this.cameraTramnsform = this.camera.entity.getComponent("Transform");
    }


    getCamera() {
        let entities = this.entity.scene.entities;
        for (let i = 0; i < entities.size(); i++) {
            let ent = entities.get(i);
            let cameras = ent.getComponentsRecursive('Camera');
            if (0 < cameras.size()) return cameras.get(0);
        }
        return null;
    }

    onUpdate(deltaTime) {
        const componentProperties = this.component().properties;
        this.bodyAnchor = componentProperties.get("bodyAnchor");
        this.bodyNumber = componentProperties.get("bodyNumber");
        const algorithmManager = Amaz.AmazingManager.getSingleton('Algorithm');
        const result = algorithmManager.getAEAlgorithmResult();
        const skeletonCount = result.getSkeletonCount();
        if (skeletonCount === 0) {
            return;
        } 

        const skeletonInfo = result.getSkeletonInfo(this.bodyNumber);
        if (!skeletonInfo) {
            return;
        }

        const anchorIndex = this.getRealBodyAnchor(this.bodyAnchor);
        const keyPoint = skeletonInfo.key_points_xy.get(anchorIndex);
        const isDected = skeletonInfo.key_points_detected.get(anchorIndex);

        if (isDected&& this.camera && this.camera.renderTexture) {
            let bodyPos = this.camera.viewportToWorldPoint(new Amaz.Vector3f(keyPoint.x, keyPoint.y, this.distance - this.camera.zNear + 4));
            this.bodyTransform.setWorldPosition(bodyPos);
        } else if (!this.camera) {
            this.camera = this.getCamera();
        }
    }

    calAnchorLen(skeletonInfo, anchorfrom, anchorto) {
        if (skeletonInfo && skeletonInfo.key_points_xy && skeletonInfo.key_points_xy.size() > 0) {
            let fromPoint = skeletonInfo.key_points_xy.get(anchorfrom);
            let toPoint = skeletonInfo.key_points_xy.get(anchorto);
            if (fromPoint && toPoint) {
                let dx = fromPoint.x - toPoint.x;
                let dy = fromPoint.y - toPoint.y;
                let dis = Math.sqrt(dx * dx + dy * dy);
                return dis;
            }
        }
        return 0;
    }

    getRealBodyAnchor(backAnchor) {
        const toward = effect.Amaz.Platform.getCameraToward();
        if (toward === 1) {
            return backAnchor;
        } else {
            switch (backAnchor) {
                case PT_NUM_IDS_BACK.RightShoulder:
                    return PT_NUM_IDS_FONT.RightShoulder;
                case PT_NUM_IDS_BACK.RightElbow:
                    return PT_NUM_IDS_FONT.RightElbow;
                case PT_NUM_IDS_BACK.RightWrist:
                    return PT_NUM_IDS_FONT.RightWrist;
                case PT_NUM_IDS_BACK.LeftShoulder:
                    return PT_NUM_IDS_FONT.LeftShoulder;
                case PT_NUM_IDS_BACK.LeftElbow:
                    return PT_NUM_IDS_FONT.LeftElbow;
                case PT_NUM_IDS_BACK.LeftWrist:
                    return PT_NUM_IDS_FONT.LeftWrist;
                case PT_NUM_IDS_BACK.RightHip:
                    return PT_NUM_IDS_FONT.RightHip;
                case PT_NUM_IDS_BACK.RightKnee:
                    return PT_NUM_IDS_FONT.RightKnee;
                case PT_NUM_IDS_BACK.RightAnkle:
                    return PT_NUM_IDS_FONT.RightAnkle;
                case PT_NUM_IDS_BACK.LeftHip:
                    return PT_NUM_IDS_FONT.LeftHip;
                case PT_NUM_IDS_BACK.LeftKnee:
                    return PT_NUM_IDS_FONT.LeftKnee;
                case PT_NUM_IDS_BACK.LeftAnkle:
                    return PT_NUM_IDS_FONT.LeftAnkle;
                case PT_NUM_IDS_BACK.RightEye:
                    return PT_NUM_IDS_FONT.RightEye;
                case PT_NUM_IDS_BACK.LeftEye:
                    return PT_NUM_IDS_FONT.LeftEye;
                case PT_NUM_IDS_BACK.RightEar:
                    return PT_NUM_IDS_FONT.RightEar;
                case PT_NUM_IDS_BACK.LeftEar:
                    return PT_NUM_IDS_FONT.LeftEar;
                default:
                    return backAnchor
            }
        }
    }

    onLateUpdate(deltaTime) { 	
    }

    onEvent(event) {
    }

    onDestroy(sys) {
    }

    component() {
        const jsScriptComps = this.entity.getComponents('JSScriptComponent');
        for (let i = 0; i < jsScriptComps.size(); i++) {
            const comp = jsScriptComps.get(i);
            const className = comp.getScript().className;
            if (className === this.script.className) {
                return comp;
            }
        }
    }

    debugPrint(result) {
        const count = result.getSkeletonCount();
        console.log('bodybinding skeletonCount:', count);
        if (count===1) {
            const i0 = result.getSkeletonInfo(0);
            console.log('i0 ID=', i0.ID);
        } else if (count===2) {
            const i0 = result.getSkeletonInfo(0);
            console.log('i0 ID=', i0.ID);
            const i1 = result.getSkeletonInfo(1);
            console.log('i1 ID=', i1.ID);

        }
    }
}

exports.BodyBinding = BodyBinding;
