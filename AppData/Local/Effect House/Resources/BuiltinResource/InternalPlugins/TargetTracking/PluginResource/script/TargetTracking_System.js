'use strict';
const Amaz = effect.Amaz;
const JSAssetRuntimeManager = require('./JSAssetRuntimeManager');

const SCRIPT_NAME = 'TargetTracking_System';

class TargetTracking_System {

    constructor() {
        this.comps = new Amaz.Map()
        this._ARPlatform = undefined;
        this.count = 0;
    }

    onDestroy() {
        if (this._ARPlatform) {
            this._ARPlatform.stop()
            this._ARPlatform = undefined;
        }
    }

    onComponentAdded(comp) {
        if (comp.isInstanceOf("JSScriptComponent")) {
            let jsScript = comp.getScript()
            if (jsScript.className === "TargetTracking_Component" && comp.entity.visible === true) {
                console.log(SCRIPT_NAME, 'onComponentAdded');
                this.comps.insert(`productARAnchor${this.count++}`, comp)
            }
        }
    }

    onComponentRemoved(comp) {}

    onStart() {
        const path = this.scene.assetMgr.rootDir;
    
        const imageModelPath = new Amaz.Map();
        const keys = this.comps.getVectorKeys();
        const count = keys.size();
        for (let i = 0; i < count; i++) {
            const config = this.comps.get(keys.get(i));
            const jsScript = config.getScript();
            console.log(SCRIPT_NAME, jsScript.ref.targetGuid);
            imageModelPath.insert(keys.get(i), `${path}algModel/${jsScript.ref.targetGuid}_model.dat`);
        }

        this._ARPlatform = Amaz.AmazingManager.getSingleton("ARPlatform")
    
        const imageTrackingReferenceLib = new Amaz.ARPImageReferenceLib();
        imageTrackingReferenceLib.referenceModelPaths = imageModelPath;
        imageTrackingReferenceLib.isUseMultiModel = false;
    
        const imageTrackingConfig = new Amaz.ARPImageTrackingConfig();
        imageTrackingConfig.physicWidth = 0.15; // not useful in atom, but will be used in ARKit/ARCore
        imageTrackingConfig.referenceLib = imageTrackingReferenceLib;
        imageTrackingConfig.preferPlatforms = Amaz.ARPlatformType.ARAtom;
        this._ARPlatform.config.addConfiguration(imageTrackingConfig);
    
        const returnCode = this._ARPlatform.config.checkAvailability();
        var configValid = false;
    
        console.log(SCRIPT_NAME, `checkAvailability:" ${returnCode}`);

        if (returnCode === Amaz.ARPlatformReturnCode.Success) {
            console.log(SCRIPT_NAME, "checkAvailability is valid");
            configValid = true;
        }

        const path_models_systemOption = `${path}algModel/systemOption.json`;
        console.log(SCRIPT_NAME, `systemOptionPath: ${path_models_systemOption}`);

        Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmParamStr("", "general_ar_0", "general_ar_atom_system_option_path", path_models_systemOption); // -- arg3

        console.log(SCRIPT_NAME, 'afterset');

        // manually se
        const ARFramework_enabled = true;

        if (ARFramework_enabled === true && configValid === true) {
            // start AR session
            const _returnCode = this._ARPlatform.start();
            console.log(SCRIPT_NAME, `ReturnCode: ${_returnCode}`);
        }

        Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable("", "general_ar_0", true);
    }



    onUpdate(dt) {

        // set all entities visible to false at begining
        const keys = this.comps.getVectorKeys();
        const count = keys.size();
        for (let i = 0; i < count; i++) {
            const comp = this.comps.get(keys.get(i));
            comp.entity.visible = false;
        }

        if (this._ARPlatform === undefined) {
            return;
        }

        const anchors = this._ARPlatform.ARAnchors;
        const anchorSize = anchors.size();
        // console.log(SCRIPT_NAME, `anchorSize: ${anchorSize}`);

        for (let i = 0; i < anchorSize; i++) {

            const anchor = anchors.get(i);

            if (!anchor) break;

            if (anchor.anchorType !== "ARPImageAnchor") {
                break;
            }


            const guid = anchor.Guid;
            // console.log(SCRIPT_NAME, `anchor GUID: ${guid}`);

            const trackingComp = this.comps.get(guid);
            if (!trackingComp) continue;
            const ent = trackingComp.entity;
            if (!ent) return;

            const anchorTrans = anchor.transform;

            // set transform
            const ent_trans = ent.getComponent("Transform");

            // console.log(SCRIPT_NAME, `isTracked: ${isTracked}`);
            ent_trans.localMatrix = anchorTrans;

            ent.visible = true;
        }
    }

    onEvent(event) {
       
    }
}

exports.TargetTracking_System = TargetTracking_System;
