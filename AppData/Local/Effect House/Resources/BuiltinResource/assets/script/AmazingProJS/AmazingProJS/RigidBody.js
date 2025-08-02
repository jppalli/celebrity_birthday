const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1473: function(t, i, e) {
            var s = this && this.__decorate || function(t, i, e, s) {
                var o, r = arguments.length, a = r < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, i, e, s); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (a = (r < 3 ? o(a) : r > 3 ? o(i, e, a) : o(i, e)) || a);
                return r > 3 && a && Object.defineProperty(i, e, a), a;
            };
            Object.defineProperty(i, "__esModule", {
                value: !0
            }), i.RigidBody = void 0;
            const o = e(1012), r = e(4666), a = e(2286), n = e(7276), d = e(3968), h = e(214), l = e(2005), c = e(8453);
            let y = class RigidBody extends n.DynamicComponent {
                constructor(t) {
                    super(t), this._mass = 1, this._damping = 0, this._angularDamping = 0, this._force = new d.Vector3f(0, 0, 0), 
                    this._torque = new d.Vector3f(0, 0, 0), this._externalForce = new d.Vector3f(0, 0, 0), 
                    this._externalTorque = new d.Vector3f(0, 0, 0), this._isKinematic = !1, this._freezeX = !1, 
                    this._freezeY = !1, this._freezeZ = !1, this._static = !1, this._physicsAnimation = !1, 
                    this._physicsAnimationRate = 0, this._useGravity = !0, this._bodyId = -1, this._initialized = !1, 
                    this._localCenterOfMass = new d.Vector3f(0, 0, 0), this._inertiaDiagonalUnit = new d.Vector3f(1, 1, 1), 
                    this._totalExternalForce = new d.Vector3f(0, 0, 0), this._totalExternalTorque = new d.Vector3f(0, 0, 0), 
                    this._prevMass = 1, this._previousExternalForce = new d.Vector3f(0, 0, 0), this._previousExternalTorque = new d.Vector3f(0, 0, 0), 
                    this._parameters = new l.FloatVector, this._impulse = new d.Vector3f(0, 0, 0), this._torqueFromImpulse = new d.Vector3f(0, 0, 0), 
                    this._shadowDistanceJoint = -1, this._shadowFixedJoint = -1, this._shadowBodyId = -1, 
                    this._physicsAnimationEnabled = !1, this._physicsAnimationInitialized = !1, this._hasAnimation = !1, 
                    this._trans = null, this._sceneObject = null, this.name = "RigidBody", this._bodyId = -1, 
                    this._localCenterOfMass = new d.Vector3f(0, 0, 0), this._inertiaDiagonalUnit = new d.Vector3f(1, 1, 1), 
                    this._colliders = new Array, this._collidersJsscript = new Array, this._initialized = !1, 
                    this._totalExternalForce = new d.Vector3f(0, 0, 0), this._totalExternalTorque = new d.Vector3f(0, 0, 0), 
                    this._prevMass = 0, this._previousExternalForce = new d.Vector3f(0, 0, 0), this._previousExternalTorque = new d.Vector3f(0, 0, 0), 
                    this._parameters = new l.FloatVector, this._parameters.resize(10), this._impulse = new d.Vector3f(0, 0, 0), 
                    this._torqueFromImpulse = new d.Vector3f(0, 0, 0), this._shadowDistanceJoint = -1, 
                    this._shadowFixedJoint = -1, this._shadowBodyId = -1, this._physicsAnimationEnabled = !1, 
                    this._physicsAnimationInitialized = !1, this._hasAnimation = !1;
                }
                get mass() {
                    return this._mass;
                }
                set mass(t) {
                    if (this._mass = t, -1 !== this.bodyId) {
                        this._useGravity && (this._totalExternalForce.subtract(a.Physics3D.gravity.clone().multiply(this._prevMass)), 
                        this._totalExternalForce.add(a.Physics3D.gravity.clone().multiply(t)));
                        const i = [ t ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyMass, this.bodyId, i);
                        const e = [ this._inertiaDiagonalUnit.x * t, this._inertiaDiagonalUnit.y * t, this._inertiaDiagonalUnit.z * t ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyInertiaTensorDiagonal, this.bodyId, e);
                        for (let i = 0; i < this._colliders.length; i++) this._colliders[i].bodyMass = t;
                        const s = this._totalExternalForce.clone(), o = [ s.x, s.y, s.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, o), 
                        this._prevMass = t;
                    }
                }
                get damping() {
                    return this._damping;
                }
                set damping(t) {
                    if (this._damping = t, -1 !== this.bodyId) {
                        const t = [ this.obtainDamping() ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyLinearDamping, this.bodyId, t);
                    }
                }
                get angularDamping() {
                    return this._angularDamping;
                }
                set angularDamping(t) {
                    if (this._angularDamping = t, -1 !== this.bodyId) {
                        const t = [ this.obtainAngularDamping() ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyRotationalDamping, this.bodyId, t);
                    }
                }
                get force() {
                    return this._force;
                }
                set force(t) {
                    this._force = t, -1 !== this.bodyId && this.applyForce();
                }
                get torque() {
                    return this._torque;
                }
                set torque(t) {
                    this._torque = t, -1 !== this.bodyId && this.applyTorque();
                }
                get freezeX() {
                    return this._freezeX;
                }
                set freezeX(t) {
                    this._freezeX = t, -1 !== this.bodyId && (t ? a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 0) : (a.Physics3D.getPbdSimulator().unfreezeRigidBodyTranslation(this.bodyId, 0), 
                    this.applyForce()));
                }
                get freezeY() {
                    return this._freezeY;
                }
                set freezeY(t) {
                    this._freezeY = t, -1 !== this.bodyId && (t ? a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 1) : (a.Physics3D.getPbdSimulator().unfreezeRigidBodyTranslation(this.bodyId, 1), 
                    this.applyForce()));
                }
                get freezeZ() {
                    return this._freezeZ;
                }
                set freezeZ(t) {
                    this._freezeZ = t, -1 !== this.bodyId && (t ? a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 2) : (a.Physics3D.getPbdSimulator().unfreezeRigidBodyTranslation(this.bodyId, 2), 
                    this.applyForce()));
                }
                get static() {
                    return this._static;
                }
                set static(t) {
                    this._static = t, -1 !== this.bodyId && (this._static ? a.Physics3D.getPbdSimulator().enableBodyKinematic(this.bodyId) : a.Physics3D.getPbdSimulator().disableBodyKinematic(this.bodyId));
                }
                get physicsAnimation() {
                    return this._physicsAnimation;
                }
                set physicsAnimation(t) {
                    if (this._physicsAnimation = t, this._physicsAnimation) {
                        if (!this._hasAnimation) return;
                        this._physicsAnimationInitialized ? this.enablePhysicsAnimation() : (this.addShadowBodyAndJoint(this._trans), 
                        this._physicsAnimationInitialized = !0);
                    } else this.disablePhysicsAnimation();
                }
                get physicsAnimationRate() {
                    return this._physicsAnimationRate;
                }
                set physicsAnimationRate(t) {
                    this._physicsAnimationRate = t, this._physicsAnimation && this.updatePhysicsAnimationRate();
                }
                get useGravity() {
                    return this._useGravity;
                }
                set useGravity(t) {
                    if (this._useGravity !== t && (this._useGravity = t, -1 !== this.bodyId)) {
                        this._useGravity ? this._totalExternalForce.add(a.Physics3D.gravity.clone().multiply(this._mass)) : this._totalExternalForce.subtract(a.Physics3D.gravity.clone().multiply(this._mass));
                        const t = [ this._totalExternalForce.x, this._totalExternalForce.y, this._totalExternalForce.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, t);
                    }
                }
                get externalForce() {
                    return this._externalForce;
                }
                set externalForce(t) {
                    this._externalForce = t;
                }
                get externalTorque() {
                    return this._externalTorque;
                }
                set externalTorque(t) {
                    this._externalTorque = t;
                }
                get isKinematic() {
                    return this._isKinematic;
                }
                set isKinematic(t) {
                    this._isKinematic = t;
                }
                get bodyId() {
                    return this._bodyId;
                }
                set bodyId(t) {
                    this._bodyId = t;
                }
                get position() {
                    return -1 !== this.bodyId ? a.Physics3D.getPbdSimulator().getRigidBodyPosition(this.bodyId) : new d.Vector3f(0, 0, 0);
                }
                set position(t) {
                    if (-1 !== this.bodyId) {
                        const i = [ t.x, t.y, t.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyPosition, this.bodyId, i);
                    }
                }
                get rotation() {
                    return -1 !== this.bodyId ? a.Physics3D.getPbdSimulator().getRigidBodyOrientation(this.bodyId) : new h.Quaternionf(0, 0, 0, 0);
                }
                set rotation(t) {
                    if (-1 !== this.bodyId) {
                        const i = [ t.x, t.y, t.z, t.w ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyRotation, this.bodyId, i);
                    }
                }
                get eulerAngles() {
                    return this.rotation.toEulerAngles();
                }
                set eulerAngles(t) {
                    const i = h.Quaternionf.makeFromEulerAngles(t);
                    this.rotation = i;
                }
                get velocity() {
                    return -1 !== this.bodyId ? a.Physics3D.getPbdSimulator().getRigidBodyVelocity(this.bodyId) : new d.Vector3f(0, 0, 0);
                }
                set velocity(t) {
                    if (-1 !== this.bodyId) {
                        const i = [ t.x, t.y, t.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyVelocity, this.bodyId, i);
                    }
                }
                get angularVelocity() {
                    return -1 !== this.bodyId ? a.Physics3D.getPbdSimulator().getRigidBodyAngularVelocity(this.bodyId) : new d.Vector3f(0, 0, 0);
                }
                set angularVelocity(t) {
                    if (-1 !== this.bodyId) {
                        const i = [ t.x, t.y, t.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyAngularVelocity, this.bodyId, i);
                    }
                }
                get inertiaTensor() {
                    return -1 !== this.bodyId ? a.Physics3D.getPbdSimulator().getRigidBodyInertiaTensor(this.bodyId) : new d.Vector3f(0, 0, 0);
                }
                set inertiaTensor(t) {
                    if (-1 !== this.bodyId) {
                        const i = [ t.x, t.y, t.z ];
                        a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyInertiaTensorDiagonal, this.bodyId, i);
                    }
                }
                get totalExternalForce() {
                    return this._totalExternalForce;
                }
                set totalExternalForce(t) {
                    this._totalExternalForce = t;
                }
                get totalExternalTorque() {
                    return this._totalExternalTorque;
                }
                set totalExternalTorque(t) {
                    this._totalExternalTorque = t;
                }
                addForce(t, i = !1) {
                    let e = t.clone();
                    if (i) {
                        e = this.getSceneObject().getComponent("Transform").getWorldRotation().multiplyVector(e);
                    }
                    e.multiply(a.Physics3D.gravityFactor), this._totalExternalForce.add(e);
                    const s = [ this._totalExternalForce.x, this._totalExternalForce.y, this._totalExternalForce.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, s);
                }
                addForceAtPosition(t, i, e = !1) {
                    var s, o;
                    let r = i.clone(), n = t.clone();
                    if (e) {
                        const t = this.getSceneObject().getComponent("Transform");
                        n = t.getWorldRotation().multiplyVector(n), r = t.getWorldRotation().clone().multiplyVector(r).add(t.getWorldPosition());
                    }
                    n.multiply(a.Physics3D.gravityFactor), this._totalExternalForce.add(n);
                    const h = null !== (o = null === (s = this.position) || void 0 === s ? void 0 : s.clone()) && void 0 !== o ? o : new d.Vector3f(0, 0, 0), l = r.clone().subtract(h);
                    this._totalExternalTorque.add(l.cross(n));
                    const c = [ this._totalExternalForce.x, this._totalExternalForce.y, this._totalExternalForce.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, c);
                    const y = [ this._totalExternalTorque.x, this._totalExternalTorque.y, this._totalExternalTorque.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalTorque, this.bodyId, y);
                }
                addTorque(t) {
                    this._totalExternalTorque.add(t), this.applyTorque();
                }
                recalculateIntertiaTensor() {
                    this.setInertiaTensorDirty();
                }
                updateAttachedColliders() {
                    this._sceneObject = this.getSceneObject(), this._trans = this._sceneObject.getComponent("Transform"), 
                    this._sceneObject && this._trans && (this._colliders = new Array, this._collidersJsscript = new Array, 
                    this.findAttachedColliders(this._trans, !0));
                }
                findAttachedColliders(t, i) {
                    if (!t || !t.getSceneObject()) return;
                    const e = t.getSceneObject();
                    if (!i) {
                        if (e.getComponent("RigidBody")) return;
                    }
                    const s = e.getComponents("JSScriptComponent");
                    for (let t = 0; t < s.length; t++) {
                        const i = s[t];
                        if (i && i.path && i.path.endsWith("Collider.js")) {
                            const t = i.getNative().getScript();
                            if (t) {
                                this._collidersJsscript.push(i);
                                const e = t.ref;
                                e.initialize(), e && e.colliderId >= 0 && this._colliders.push(e);
                            }
                        }
                    }
                    const o = e.getChildren();
                    for (let t = 0; t < o.length; t++) {
                        const i = o[t].getComponent("Transform");
                        i && this.findAttachedColliders(i, !1);
                    }
                }
                initialize() {
                    if (this._initialized) return;
                    this._sceneObject = this.getSceneObject(), this._trans = this._sceneObject.getComponent("Transform"), 
                    this.updateAttachedColliders();
                    const t = this.mass, i = new d.Vector3f(0, 0, 0), e = new d.Vector3f(0, 0, 0);
                    this._bodyId = a.Physics3D.getPbdSimulator().addRigidBodyToEntity(t, this._inertiaDiagonalUnit.clone().multiply(this.mass), this._sceneObject, i, e, this.obtainDamping(), this.obtainAngularDamping()), 
                    a.Physics3D.getInstance().rigidBodyMap.set(this.bodyId, this), this._prevMass = this.mass, 
                    this._useGravity && this._totalExternalForce.add(a.Physics3D.gravity.clone().multiply(t)), 
                    this.applyForce(), this.applyTorque(), this.static && a.Physics3D.getPbdSimulator().enableBodyKinematic(this.bodyId), 
                    this.freezeX && a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 0), 
                    this.freezeY && a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 1), 
                    this.freezeZ && a.Physics3D.getPbdSimulator().freezeRigidBodyTranslation(this.bodyId, 2), 
                    this.attachColliders(), this.updateInertiaTensor(), this.animatorCheck(this._sceneObject) && a.Physics3D.registerAnimationUpdateCallback(), 
                    this.physicsAnimation && (this.addShadowBodyAndJoint(this._trans), this._physicsAnimationInitialized = !0, 
                    this._physicsAnimationEnabled = !0), this._initialized = !0;
                }
                animatorCheck(t) {
                    return !!t && (t.getComponent("Animator") ? (this._hasAnimation = !0, !0) : this.animatorCheck(t.parent));
                }
                attachColliders() {
                    for (let t = 0; t < this._colliders.length; t++) {
                        const i = this._colliders[t];
                        a.Physics3D.getCollisionFinder().attachColliderToRigidBody(a.Physics3D.getPbdSimulator(), i.colliderId, this.bodyId, !0), 
                        i.rigidBody = this;
                    }
                }
                addShadowBodyAndJoint(t) {
                    if (!t || this.bodyId < 0) return;
                    this._shadowBodyId = a.Physics3D.getPbdSimulator().addRigidBody(1, new d.Vector3f(1, 1, 1), t.getWorldPosition(), t.getWorldRotation(), new d.Vector3f(0, 0, 0), new d.Vector3f(0, 0, 0), 0, 0), 
                    a.Physics3D.getPbdSimulator().enableBodyKinematic(this._shadowBodyId), a.Physics3D.getPbdSimulator().setRigidbodyShadowBodyId(this.bodyId, this._shadowBodyId);
                    const i = this.transformPoint(t, new d.Vector3f(0, 0, 0)), e = a.Physics3D.getPbdSimulator().addDistanceJoint(this.bodyId, !1, i, this._shadowBodyId, !1, i, new d.Vector3f(1, 1, .2), -1), s = a.Physics3D.getPbdSimulator().addFixedRelativeRotationJoint(this.bodyId, this._shadowBodyId, 1, .2, !0);
                    this._shadowDistanceJoint = e, this._shadowFixedJoint = s;
                    let o = [ 0 === this.physicsAnimationRate ? 0 : Math.pow(10, 8 * this.physicsAnimationRate - 6) ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.DistanceJointCompressCompliance, e, o), 
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.DistanceJointStretchCompliance, e, o);
                    o = [ 0 === this.physicsAnimationRate ? 0 : Math.pow(10, 8 * this.physicsAnimationRate - 6) ], 
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.FixedRelativeRotationJointCompliance, s, o);
                }
                transformPoint(t, i) {
                    if (!t || !i) return new d.Vector3f(0, 0, 0);
                    i.multiply(t.getWorldScale());
                    const e = t.getWorldRotation().multiplyVector(i);
                    return t.getWorldPosition().clone().add(e);
                }
                setInertiaTensorDirty() {
                    this.bodyId >= 0 && a.Physics3D.getInstance().rigidBodyWithUpdatedInertiaTensor.set(this.bodyId, this);
                }
                updateInertiaTensor() {
                    const t = new Array;
                    let i = 0;
                    t.push(0);
                    for (let e = 0; e < this._colliders.length; e++) {
                        const s = this._colliders[e];
                        if (s.entity.visible && this._collidersJsscript[e].enabled) {
                            t.push(s.colliderId);
                            let e = effect.Amaz.Vector3f.mul(s.rotation, a.Physics3D.radianPerDegree);
                            null === e && (e = new effect.Amaz.Vector3f(0, 0, 0));
                            let o = new effect.Amaz.Quaternionf(0, 0, 0, 0);
                            o = o.eulerToQuaternion(e);
                            let r = s.center;
                            const n = s.entity.getComponent("Transform"), d = this.getSceneObject().getComponent("Transform");
                            if (s.entity.eq(this.getSceneObject().getNative())) r = d.getWorldScale().getNative().scale(r); else {
                                r = d.getWorldScale().getNative().scale(r);
                                const t = d.getWorldRotation().inverse(), i = effect.Amaz.Quaternionf.mul(t.getNative(), n.getWorldOrientation());
                                o = effect.Amaz.Quaternionf.mul(i, o);
                                const e = t.getNative().rotateVectorByQuat(effect.Amaz.Vector3f.sub(n.getWorldPosition(), d.getWorldPosition().getNative()));
                                r.add(e);
                            }
                            t.push(r.x), t.push(r.y), t.push(r.z), t.push(o.x), t.push(o.y), t.push(o.z), t.push(o.w), 
                            i += 1;
                        }
                    }
                    if (t[0] = i, this._initialized) a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyInertiaTensorUpdate, this.bodyId, t); else {
                        const i = new l.FloatVector;
                        i.resize(t.length);
                        for (let e = 0; e < t.length; e++) i.set(e, t[e]);
                        a.Physics3D.getPbdSimulator().updateRigidBodyInertiaTensor(this.bodyId, i, a.Physics3D.getCollisionFinder());
                    }
                }
                obtainDamping() {
                    return Math.pow(10, 8 * (this.damping - .75)) * this.mass;
                }
                obtainAngularDamping() {
                    return Math.pow(10, 6 * (this.angularDamping - .5)) * this.mass;
                }
                onEnable() {
                    if (this.bodyId >= 0) {
                        for (let t = 0; t < this._colliders.length; t++) {
                            this._colliders[t].rigidBody = this;
                        }
                        this._parameters.set(0, this.mass), this._parameters.set(1, this.obtainDamping()), 
                        this._parameters.set(2, this.obtainAngularDamping()), this._parameters.set(3, 0), 
                        this._parameters.set(4, 0), this._parameters.set(5, 0), this._parameters.set(6, 0), 
                        this._parameters.set(7, 0), this._parameters.set(8, 0);
                        let t = 0;
                        this.static && (t |= 2), this.freezeX && (t |= 8), this.freezeY && (t |= 16), this.freezeZ && (t |= 32), 
                        this._parameters.set(9, t), a.Physics3D.getPbdSimulator().enableRigidBody(this.bodyId, this._parameters), 
                        this.setInertiaTensorDirty(), this.enablePhysicsAnimation();
                    }
                }
                onDisable() {
                    if (this.bodyId >= 0) {
                        for (let t = 0; t < this._colliders.length; t++) this._colliders[t].rigidBody = null;
                        a.Physics3D.getPbdSimulator().disableRigidBody(this.bodyId);
                    }
                    this.disablePhysicsAnimation();
                }
                removeRigidBody() {
                    a.Physics3D.getPbdSimulator().removeRigidBody(this.bodyId), a.Physics3D.getInstance().rigidBodyMap.delete(this.bodyId), 
                    this._bodyId = -1;
                    for (let t = 0; t < this._colliders.length; t++) a.Physics3D.getCollisionFinder().detachCollider(this._colliders[t].colliderId, !1), 
                    this._colliders[t].rigidBody = null;
                    this._initialized = !1;
                }
                onInit() {
                    this.initialize(), this.onDisable();
                }
                onEvent(t) {
                    const i = t.args;
                    if (t.type === c.EventType.DUAL_INSTANCE && i.size() > 0) {
                        "SceneReset" === i.get(0) && (this.enabled ? this.onEnable() : this.onDisable());
                    }
                }
                removePhysicsAnimation() {
                    this._shadowFixedJoint >= 0 && (a.Physics3D.getPbdSimulator().removeConstraint(this._shadowFixedJoint), 
                    this._shadowFixedJoint = -1), this._shadowDistanceJoint >= 0 && (a.Physics3D.getPbdSimulator().removeConstraint(this._shadowDistanceJoint), 
                    this._shadowDistanceJoint = -1), this._shadowBodyId >= 0 && (a.Physics3D.getPbdSimulator().removeRigidBody(this._shadowBodyId), 
                    this._shadowBodyId = -1);
                }
                enablePhysicsAnimation() {
                    this._physicsAnimationEnabled || (a.Physics3D.getPbdSimulator().enableConstraint(this._shadowFixedJoint), 
                    a.Physics3D.getPbdSimulator().enableConstraint(this._shadowDistanceJoint), this._physicsAnimationEnabled = !0);
                }
                disablePhysicsAnimation() {
                    this._physicsAnimationEnabled && (a.Physics3D.getPbdSimulator().disableConstraint(this._shadowFixedJoint), 
                    a.Physics3D.getPbdSimulator().disableConstraint(this._shadowDistanceJoint), this._physicsAnimationEnabled = !1);
                }
                updatePhysicsAnimationRate() {
                    if (!this.physicsAnimation) return;
                    let t = [ 0 === this.physicsAnimationRate ? 0 : Math.pow(10, 8 * this.physicsAnimationRate - 6) ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.DistanceJointCompressCompliance, this._shadowDistanceJoint, t), 
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.DistanceJointStretchCompliance, this._shadowDistanceJoint, t);
                    t = [ 0 === this.physicsAnimationRate ? 0 : Math.pow(10, 8 * this.physicsAnimationRate - 6) ], 
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.FixedRelativeRotationJointCompliance, this._shadowFixedJoint, t);
                }
                applyForce() {
                    this._totalExternalForce.subtract(this._previousExternalForce);
                    const t = new d.Vector3f(this.force.x, this.force.y, this.force.z).multiply(a.Physics3D.gravityFactor);
                    this._totalExternalForce.add(t), this._previousExternalForce = t;
                    const i = this._totalExternalForce.clone(), e = [ i.x, i.y, i.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, e);
                }
                applyTorque() {
                    this._totalExternalTorque.subtract(this._previousExternalTorque), this._totalExternalTorque.add(this.torque), 
                    this._previousExternalTorque = this.torque;
                    const t = [ this._totalExternalTorque.x, this._totalExternalTorque.y, this._totalExternalTorque.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalTorque, this.bodyId, t);
                }
                removeImpulse() {
                    if (!this.enabled) return;
                    this._totalExternalForce.subtract(this._impulse);
                    const t = this._totalExternalForce.clone(), i = [ t.x, t.y, t.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, i), 
                    this._totalExternalTorque.subtract(this._torqueFromImpulse);
                    const e = [ this._totalExternalTorque.x, this._totalExternalTorque.y, this._totalExternalTorque.z ];
                    a.Physics3D.addModifiedPropertyFast(a.Physics3D.PropertyType.RigidBodyExternalTorque, this.bodyId, e);
                }
                onDestroy() {
                    this.bodyId >= 0 && (this.removeRigidBody(), this.removePhysicsAnimation()), this._initialized = !1, 
                    this._typedRtti.ref = null;
                }
                onColliderAdded() {
                    this.updateAttachedColliders(), this.attachColliders(), this.setInertiaTensorDirty();
                }
            };
            i.RigidBody = y, s([ (0, r.serializedAccessor)(1) ], y.prototype, "mass", null), 
            s([ (0, r.serializedAccessor)(0) ], y.prototype, "damping", null), s([ (0, r.serializedAccessor)(0) ], y.prototype, "angularDamping", null), 
            s([ (0, r.serializedAccessor)(new d.Vector3f(0, 0, 0)) ], y.prototype, "force", null), 
            s([ (0, r.serializedAccessor)(new d.Vector3f(0, 0, 0)) ], y.prototype, "torque", null), 
            s([ (0, r.serializedAccessor)(!1) ], y.prototype, "freezeX", null), s([ (0, r.serializedAccessor)(!1) ], y.prototype, "freezeY", null), 
            s([ (0, r.serializedAccessor)(!1) ], y.prototype, "freezeZ", null), s([ (0, r.serializedAccessor)(!1) ], y.prototype, "static", null), 
            s([ (0, r.serializedAccessor)(!1) ], y.prototype, "physicsAnimation", null), s([ (0, 
            r.serializedAccessor)(0) ], y.prototype, "physicsAnimationRate", null), s([ (0, 
            r.serializedAccessor)(!0) ], y.prototype, "useGravity", null), s([ (0, r.serializedAccessor)(new d.Vector3f(0, 0, 0)) ], y.prototype, "externalForce", null), 
            s([ (0, r.serializedAccessor)(new d.Vector3f(0, 0, 0)) ], y.prototype, "externalTorque", null), 
            s([ (0, r.serializedAccessor)(!1) ], y.prototype, "isKinematic", null), i.RigidBody = y = s([ (0, 
            o.registerClass)() ], y);
        },
        7276: function(t) {
            t.exports = APJS_Require("DynamicComponent");
        },
        2005: function(t) {
            t.exports = APJS_Require("FloatVector");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        2286: function(t) {
            t.exports = APJS_Require("Physics3D");
        },
        214: function(t) {
            t.exports = APJS_Require("Quaternionf");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        },
        4666: function(t) {
            t.exports = APJS_Require("serialize");
        },
        8453: function(t) {
            t.exports = effect.Amaz;
        }
    }, i = {};
    var e = function e(s) {
        var o = i[s];
        if (void 0 !== o) return o.exports;
        var r = i[s] = {
            exports: {}
        };
        return t[s].call(r.exports, r, r.exports, e), r.exports;
    }(1473), s = exports;
    for (var o in e) s[o] = e[o];
    e.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();