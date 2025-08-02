//@ScriptComponent

const Amaz = effect.Amaz;
const used = (x)=>{} // mark a variable was used, to avoid the optimization of V8 Engine
const APJS = require('./amazingpro');
function clamp(v, _min, _max) {
  return v < _min ? _min : v > _max ? _max : v;
}

const MAX_AABB = 100000;

class OrbitControl {
    constructor() {
        this.target = new APJS.Vector3f(0.0, 0.0, 0.0);
        this.offset = new APJS.Vector3f(0.0, 0.0, 0.0);
        this.camerPos = new APJS.Vector3f(0.0, 0.0, 0.0);
        // How far you can orbit vertically, upper and lower limits.
		    // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians
        // How far you can orbit horizontally, upper and lower limits.
        // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
        this.minAzimuthAngle = -Math.PI; // radians
        this.maxAzimuthAngle = Math.PI; // radians
        // spherical
        this.radius = 1.0;
        this.phi = 0.0; // polar angle
        this.theta = 0.0; // azimuthal angle
        this.deltaPhi = 0.0; // polar angle
        this.deltaTheta = 0.0; // azimuthal angle
        // rotate delta
        this.rotateDelta = new APJS.Vector2f();
        this.rotateStart = new APJS.Vector2f();
        this.rotateEnd = new APJS.Vector2f();
        this.rotateSpeed = 1.0;
        this.screenRatio = 720/1280;
        this.rotateFirst = new APJS.Vector2f();
        this.rotateSum = new APJS.Vector2f();
        // default rotation
        this.quat = new APJS.Quaternionf();
        this.quatInverse = this.quat.clone().inverse();
    }

    onStart() {
      // Calculate the bounding box of all entities (same as before)
      const allEntities = this.scene.entities;
      let minx = MAX_AABB;
      let miny = MAX_AABB;
      let minz = MAX_AABB;
      let maxx = -MAX_AABB;
      let maxy = -MAX_AABB;
      let maxz = -MAX_AABB;
  
      for (let i = 0; i < allEntities.size(); ++i) {
          const entity = allEntities.get(i);
          if (entity && entity.name !== '__PreviewSkybox__' && entity.name !== '__PreviewGround__') {
              const meshRenderer = entity.getComponent('MeshRenderer');
              if (meshRenderer) {
                  const aabb = meshRenderer.getBoundingBox();
                  minx = Math.min(minx, aabb.min_x);
                  miny = Math.min(miny, aabb.min_y);
                  minz = Math.min(minz, aabb.min_z);
                  maxx = Math.max(maxx, aabb.max_x);
                  maxy = Math.max(maxy, aabb.max_y);
                  maxz = Math.max(maxz, aabb.max_z);
              }
          }
      }
  
      // Set the target at the center of the bounding box (same as before)
      this.target = new APJS.Vector3f(
          (maxx + minx) * 0.5,
          (maxy + miny) * 0.5,
          (maxz + minz) * 0.5
      );
  
      // Compute the radius based on the size of the bounding box (same as before)
      const side = Math.max(maxx - minx, maxy - miny, maxz - minz);
      this.radius = 1.73205 * side;
  
      const camera = this.entity.getComponent('Camera');
      const transform = this.entity.getComponent('Transform');
  
      // Adjust the distance to zoom in (same as before)
      const distance = this.radius * 1.5 / Math.abs(Math.sin(camera.fovy * 0.5));
  
      // Set initial theta to -90 degrees plus 10 degrees (i.e., -80 degrees)
      const tenDegreesInRadians = Math.PI / 18; // 10 degrees in radians
      this.theta = -Math.PI / 2 + tenDegreesInRadians; // -80 degrees in radians
  
      // Alternatively, simplifying:
      // this.theta = -4 * Math.PI / 9; // -80 degrees in radians
  
      // Set initial phi to π/2 radians to look straight at the target (same as before)
      this.phi = Math.PI / 2;
  
      // Compute the offset using spherical to Cartesian conversion
      const sinPhiRadius = Math.sin(this.phi) * distance;
      const ox = sinPhiRadius * Math.sin(this.theta);
      const oy = Math.cos(this.phi) * distance;
      const oz = sinPhiRadius * Math.cos(this.theta);
      this.offset.set(ox, oy, oz);
  
      // Set the camera position by adding the offset to the target position
      transform.localPosition = this.camerPos
          .set(this.target.x, this.target.y, this.target.z)
          .add(this.offset)
          .getNative();
  
      // Adjust the far and near planes to avoid clipping (same as before)
      camera.zFar = distance + this.radius;
      camera.zNear = camera.zFar > 1000.0 ? 1.0 : camera.zNear;
  
      // Compute the camera's forward direction and set its orientation (same as before)
      const forward = this.offset.clone().normalize();
      const newRotation = APJS.Quaternionf.lookAt(forward, APJS.Vector3f.up());
      transform.localOrientation = newRotation.getNative();
  
      // Resize the ground entity (if applicable, same as before)
      let groundEntity = this.scene.findEntityBy('__PreviewGround__');
      if (groundEntity !== undefined) {
          const size = Math.max(maxx - minx, maxz - minz) * 10.0;
          const groundEntityTransform = groundEntity.getComponent('Transform');
          groundEntityTransform.localScale = new Amaz.Vector3f(size, size, 1);
          groundEntityTransform.localPosition = new Amaz.Vector3f(
              0,
              miny - 0.01 * (maxy - miny),
              0
          );
      } else {
          console.error('PreviewInteraction: Cannot find ground entity.');
      }
    }

    onUpdate(){
    }
    onEvent(event) {
      if (event.type === APJS.EventType.TOUCH) {
        const touch = event.args.get(0);
        const currentTouchPosition = new APJS.Vector2f(touch.x, touch.y);

        if (touch.type === APJS.TouchType.TOUCH_BEGAN) {
          this.rotateStart.set(currentTouchPosition.x, currentTouchPosition.y);
          this.rotateFirst.set(currentTouchPosition.x, currentTouchPosition.y);
          this.deltaTheta = 0;
          this.deltaPhi = 0;
          this.rotateSum.set(0, 0);
        } else {
          this.rotateEnd.set(currentTouchPosition.x, currentTouchPosition.y);
          this.rotateDelta.set(currentTouchPosition.x, currentTouchPosition.y);
          this.rotateDelta.subtract(this.rotateStart).multiply(this.rotateSpeed);
          this.rotateSum.set(this.rotateSum.x + this.rotateDelta.x, this.rotateSum.y + this.rotateDelta.y);
          // reset
          this.rotateStart.set(currentTouchPosition.x, currentTouchPosition.y);
          // rotate left
          this.deltaTheta = -2 * Math.PI * this.rotateDelta.x * this.screenRatio;
          // rotate Up
          this.deltaPhi = -2 * Math.PI * this.rotateDelta.y
          // camera position
          const transform = this.entity.getComponent("Transform");
          const entityPos = transform.localPosition;
          this.offset.set(entityPos.x - this.target.x, entityPos.y - this.target.y, entityPos.z - this.target.z);

          // angle from z-axis around y-axis
          this.radius = this.offset.magnitude();
				  this.phi = Math.acos( clamp( this.offset.y / this.radius, -1.0, 1.0 ) );
          this.theta = Math.atan2( this.offset.x, this.offset.z );
          // update
					this.theta = this.theta + this.deltaTheta;
          this.theta = ((this.theta + Math.PI) % (2 * Math.PI)) - Math.PI;

          // Clamp theta within the specified azimuth limits
          this.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this.theta));

					this.phi = this.phi + this.deltaPhi;
          // limit
          //this.theta = Math.max( this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, this.theta ) );
          this.phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, this.phi ) );
          // make safe
          const EPS = 0.00001;
          this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );
          // offset from Spherical
          const sinPhiRadius = Math.sin( this.phi ) * this.radius;
          const ox = sinPhiRadius * Math.sin( this.theta );
          const oy = Math.cos( this.phi ) * this.radius;
          const oz = sinPhiRadius * Math.cos( this.theta );
          this.offset.set(ox, oy, oz);
          // rotate offset back to "camera-up-vector-is-up" space
          transform.localPosition = this.camerPos.set(this.target.x, this.target.y, this.target.z).add(this.offset).getNative();
          const forward = this.offset.clone().normalize();
          const newRotation = APJS.Quaternionf.lookAt(forward, APJS.Vector3f.up());
          transform.localOrientation = newRotation.getNative();
        }
      }
    }
}

exports.OrbitControl = OrbitControl;
