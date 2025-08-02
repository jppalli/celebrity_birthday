const Amaz = effect.Amaz;

class TargetTrackingCamera_Component {
    constructor() {
        this.name = "TargetTrackingCamera_Component";
        this.graphName = "";
    }

    onEnable(){
    }

    onStart() {
        this.camera = this.entity.getComponent("Camera");
        this.transform = this.entity.getComponent("Transform");
        this.scene.postMessage(71, 2, 0, null); // auto switch to rear camera
    }

    onUpdate(deltaTime) {
      const result = Amaz.AmazingManager.getSingleton("Algorithm").getAEAlgorithmResult();
      const info = result.getAlgorithmInfo(this.graphName, '', 'general_ar', 0);
      const inputTex = result.getAlgorithmInfo(this.graphName, '', 'blit', 0)
  
      if (info && inputTex) { 
        const cameraInfo = info.get("cameraInfo");
        if (cameraInfo) {
          const fx = cameraInfo.get("fx");
          const fy = cameraInfo.get("fy");
          const cx = cameraInfo.get("cx");
          const cy = cameraInfo.get("cy");
  
          const zNear = this.camera.zNear;
          const zFar = this.camera.zFar;
  
          let projMat = this.camera.projectionMatrix;
  
          projMat.set(0,0,fx * 2.0 /inputTex.width);
          projMat.set(0,1,0.0);
          projMat.set(0,2,1.0 - 2.0 * cx / inputTex.width);
          projMat.set(0,3,0.0);
  
          projMat.set(1,0,0.0);
          projMat.set(1,1,fy * 2.0/ inputTex.height);
          projMat.set(1,2,-(1.0 - 2.0 * cy / inputTex.height));
          projMat.set(1,3,0.0);
  
          projMat.set(2,0,0.0);
          projMat.set(2,1,0.0);
          projMat.set(2,2,-(zNear + zFar) / (zFar - zNear));
          projMat.set(2,3,-(2.0 * zNear * zFar) / (zFar - zNear));
  
          projMat.set(3,0,0.0);
          projMat.set(3,1,0.0);
          projMat.set(3,2,-1.0);
          projMat.set(3,3,0.0);
          
          this.camera.projectionMatrix = projMat;
          this.transform.localMatrix = new Amaz.Matrix4x4f();
        }
      }
    }

    onLateUpdate(deltaTime) {
	  	
    }

    onEvent(event) {
        
    }

    onDestroy(sys) {

    }
}

exports.TargetTrackingCamera_Component = TargetTrackingCamera_Component;
