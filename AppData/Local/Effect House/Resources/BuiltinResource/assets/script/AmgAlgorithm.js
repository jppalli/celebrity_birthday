const AmgAlgorithm = (function() {
    let _instance = null;

    function AmgAlgorithm() {
        this.algMgr = effect.Amaz.AmazingManager.getSingleton('Algorithm');
    }

    AmgAlgorithm.getInstance = function() {
        if (_instance == null) {
        _instance = new AmgAlgorithm();
        }
        return _instance;
    };

    AmgAlgorithm.prototype.onUpdate = function() {
        if (!this.algMgr) {
        return;
        }
        Body3D.getInstance().onUpdate();
    };

    return AmgAlgorithm;
})();
  
const Body3D = (function() {
    let _instance = null;

    function Body3D() {
        this.trackingMode = false;
        this.bodies = [];
    }

    Body3D.getInstance = function() {
        if (_instance == null) {
        _instance = new Body3D();
        }
        return _instance;
    };

    Body3D.prototype.onUpdate = function() {
        const algMgr = AmgAlgorithm.getInstance().algMgr;
        const algResult = algMgr.getAEAlgorithmResult();
        if (!algResult || !algResult.getAvatar3DInfoTracking) {
            return;
        }

        //tracking mode is used to decide whether to enable skeleton 2d algorithm to help avatar3d
        this.trackingMode = algResult.getAvatar3DInfoTracking();
        const avatar3DCount = algResult.getAvatar3DInfoCount();
        this.bodies = [];

        if (avatar3DCount > 0) {
        for (let bodyIndex = 0; bodyIndex < avatar3DCount; bodyIndex++) {
            const avatar3DInfo = algResult.getAvatar3DInfo(bodyIndex);
            if (avatar3DInfo != null) {
            this.bodies[bodyIndex] = avatar3DInfo;
            }
        }
    }
    };

    return Body3D;
})();

exports.AmgAlgorithm = AmgAlgorithm;
exports.Body3D = Body3D;