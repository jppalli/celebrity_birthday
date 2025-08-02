const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5361: function(t, e, i) {
            var s, o = this && this.__decorate || function(t, e, i, s) {
                var o, r = arguments.length, a = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, s); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (a = (r < 3 ? o(a) : r > 3 ? o(e, i, a) : o(e, i)) || a);
                return r > 3 && a && Object.defineProperty(e, i, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Physics3D = void 0;
            const r = i(1012), a = i(3968), n = i(4187), d = i(4885), l = i(7841), p = i(9067), c = i(2005), h = i(2807), f = i(7563);
            let m = s = class Physics3D {
                constructor() {
                    this.gravityAcceleration = new a.Vector3f(0, -980, 0), this.gravityFactor = 100, 
                    this.framerateIndependence = !1, this.substeps = 5, this.fixedTimestep = .02, this.maxAllowedTimestep = .333, 
                    this.timeScale = 1, this.frameCount = 0, this.deltaTime = 0, this.m_pbdSimulator = new n.AMGPbdSimulator, 
                    this.m_collisionFinder = new d.AMGCollisionFinder, this.m_modifiedPropertiesHandler = new p.AMGModifiedPropertyHandler, 
                    this.modifiedPropertyFixedOffset = 2, this.propertiesBufferIdx = 0, this.propertiesBufferSize = 100, 
                    this.modifiedPropertiesBuffer = new c.FloatVector, this.modifiedProperties = new h.Vector, 
                    this.animationUpdateCallbackStatus = s.AnimationUpdateCallbackStatus.Idle, this.maskBitsArr = [], 
                    this.rigidBodyMap = new Map, this.rigidBodyWithUpdatedInertiaTensor = new Map, this.physicsMaterialMap = new Map, 
                    this.colliderMap = new Map, this.positionSolveIterations = 5, this.contactVelocitySolveIter = 5, 
                    this.contactPositionSolveIter = 5, this.distanceIterations = 5, this.angularIterations = 5, 
                    this.bendingIterations = 5, this.tetherIterations = 5, this.balloonIterations = 2, 
                    this.tetVolumeIterations = 5, this.isAddingImpulse = !1, this.clothActorComponents = [], 
                    this.softBodyActorComponents = [], this.m_pbdSimulator = new n.AMGPbdSimulator, 
                    this.m_collisionFinder = new d.AMGCollisionFinder, this.m_modifiedPropertiesHandler = new p.AMGModifiedPropertyHandler, 
                    this._scene = null, this.initializePhysicsSystem();
                }
                get pbdSimulator() {
                    return this.m_pbdSimulator;
                }
                get collisionFinder() {
                    return this.m_collisionFinder;
                }
                get modifiedPropertiesHandler() {
                    return this.m_modifiedPropertiesHandler;
                }
                static getInstance() {
                    return s.instance || (s.instance = new s), s.instance;
                }
                static getPbdSimulator() {
                    return this.getInstance().pbdSimulator;
                }
                static getCollisionFinder() {
                    return this.getInstance().collisionFinder;
                }
                static getModifiedPropertiesHandler() {
                    return this.getInstance().modifiedPropertiesHandler;
                }
                static get gravity() {
                    return this.getInstance().gravityAcceleration;
                }
                static set gravity(t) {
                    this.getInstance().gravityAcceleration = t;
                }
                static get gravityFactor() {
                    return this.getInstance().gravityFactor;
                }
                static set gravityFactor(t) {
                    this.getInstance().gravityFactor = t;
                }
                static get enableFrameRateIndependentUpdate() {
                    return this.getInstance().framerateIndependence;
                }
                static set enableFrameRateIndependentUpdate(t) {
                    this.getInstance().framerateIndependence = t;
                }
                static get substeps() {
                    return this.getInstance().substeps;
                }
                static set substeps(t) {
                    this.getInstance().substeps = t;
                }
                static get fixedDeltaTime() {
                    return this.getInstance().fixedTimestep;
                }
                static set fixedDeltaTime(t) {
                    this.getInstance().fixedTimestep = t;
                }
                static get maximumAllowedTimestep() {
                    return this.getInstance().maxAllowedTimestep;
                }
                static set maximumAllowedTimestep(t) {
                    this.getInstance().maxAllowedTimestep = t;
                }
                static get frameCount() {
                    return this.getInstance().frameCount;
                }
                static set frameCount(t) {
                    this.getInstance().frameCount = t;
                }
                static get timeScale() {
                    return this.getInstance().timeScale;
                }
                static set timeScale(t) {
                    this.getInstance().timeScale = t;
                }
                static get isAddingImpulse() {
                    return this.getInstance().isAddingImpulse;
                }
                static set isAddingImpulse(t) {
                    this.getInstance().isAddingImpulse = t;
                }
                initializePhysicsSystem() {
                    this.pbdSimulator.enableApplyForceOnchange(), this.modifiedPropertiesBuffer.resize(this.propertiesBufferSize), 
                    this.collisionFinder.enableParticleRigidbodyCollision(), this.pbdSimulator.setAutoAddBendingConstraint(!1), 
                    this.pbdSimulator.setStoreComponentIdWithBitsCopy(!0), this.pbdSimulator.setOnlyVelocitySolveForContacts(!1);
                }
                static onInit(t) {
                    this.getInstance().init(t);
                }
                init(t) {
                    if (this._scene = t, this._scene && void 0 !== this._scene.getSettings) {
                        const t = this._scene.getSettings();
                        if (this.updatePhysicsSettings(t, "substeps"), this.updatePhysicsSettings(t, "framerateIndependence"), 
                        this.updatePhysicsSettings(t, "fixedTimestep"), this.updatePhysicsSettings(t, "maxAllowedTimestep"), 
                        this.updatePhysicsSettings(t, "timeScale"), this.framerateIndependence ? (this.pbdSimulator.enableFixedTimestepIndependentOfFramerate(), 
                        this.gravityFactor = 10) : (this.pbdSimulator.disableFixedTimestepIndependentOfFramerate(), 
                        this.gravityFactor = 100), this.timeScale > 1 ? this.pbdSimulator.enableSlowMotionMode() : this.pbdSimulator.disableSlowMotionMode(), 
                        t.has("worldForce")) {
                            const e = t.get("worldForce");
                            3 === e.size() && (this.gravityAcceleration = new a.Vector3f(e.get(0) * this.gravityFactor, e.get(1) * this.gravityFactor, e.get(2) * this.gravityFactor));
                        }
                        if (t.has("physicsCollisionConfigure")) {
                            const e = t.get("physicsCollisionConfigure"), i = this.parseMaskBitsFromTwoDArr((0, 
                            r.transferToAPJSObj)(e));
                            this.maskBitsArr = i;
                        }
                        this.updatePhysicsSettings(t, "contactVelocitySolveIter"), this.updatePhysicsSettings(t, "contactPositionSolveIter"), 
                        this.updatePhysicsSettings(t, "distanceIterations"), this.updatePhysicsSettings(t, "angularIterations"), 
                        this.updatePhysicsSettings(t, "hingeJointSolveIters"), this.updatePhysicsSettings(t, "bendingIterations"), 
                        this.updatePhysicsSettings(t, "tetherIterations"), this.updatePhysicsSettings(t, "balloonIterations"), 
                        this.updatePhysicsSettings(t, "tetVolumeIterations");
                    }
                    this.pbdSimulator.setTimestep(this.fixedTimestep), this.pbdSimulator.setMaxDeltaTime(this.maxAllowedTimestep), 
                    this.pbdSimulator.setNumSubsteps(this.substeps), this.pbdSimulator.setNumPositionSolveIterationsForContact(this.contactPositionSolveIter), 
                    this.pbdSimulator.setNumVelocitySolveIterationsForContact(this.contactVelocitySolveIter), 
                    s.addModifiedPropertyFast(s.PropertyType.DistanceConstraintIterations, 0, [ this.distanceIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.FixedRelativeRotationJointIterations, 0, [ this.angularIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.HingeJointIterations, 0, [ this.angularIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.BendConstraintIterations, 0, [ this.bendingIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.LongRangeAttachmentConstraintIterations, 0, [ this.tetherIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.ClothBalloonConstraintIterations, 0, [ this.balloonIterations ]), 
                    s.addModifiedPropertyFast(s.PropertyType.TetVolumeIterations, 0, [ this.tetVolumeIterations ]);
                }
                static onUpdate(t) {
                    this.getInstance().update(t);
                }
                update(t) {
                    if (this.preUpdate(), this.deltaTime = t, this._scene && this.animationUpdateCallbackStatus === s.AnimationUpdateCallbackStatus.NeedToBeRegistered) {
                        const t = this._scene.getSystem("AnimatorSystem");
                        f.EventManager.getObjectEmitter(t).on(effect.Amaz.AnimSysEventType.ANIMSYS_END, this.PBDSystemUpdate, this), 
                        this.animationUpdateCallbackStatus = s.AnimationUpdateCallbackStatus.Registered;
                    }
                }
                static onLateUpdate(t) {
                    this.getInstance().lateUpdate(t);
                }
                lateUpdate(t) {
                    this.animationUpdateCallbackStatus !== s.AnimationUpdateCallbackStatus.Registered && this.PBDSystemUpdate();
                }
                updatePhysicsSettings(t, e) {
                    if (t.has(e)) {
                        const i = t.get(e);
                        switch (e) {
                          case "substeps":
                            this.substeps = i;
                            break;

                          case "framerateIndependence":
                            this.framerateIndependence = i;
                            break;

                          case "fixedTimestep":
                            this.fixedTimestep = i;
                            break;

                          case "maxAllowedTimestep":
                            this.maxAllowedTimestep = i;
                            break;

                          case "timeScale":
                            this.timeScale = i;
                            break;

                          case "contactVelocitySolveIter":
                            this.contactVelocitySolveIter = i;
                            break;

                          case "contactPositionSolveIter":
                            this.contactPositionSolveIter = i;
                            break;

                          case "distanceIterations":
                            this.distanceIterations = i;
                            break;

                          case "angularIterations":
                            this.angularIterations = i;
                            break;

                          case "bendingIterations":
                            this.bendingIterations = i;
                            break;

                          case "tetherIterations":
                            this.tetherIterations = i;
                            break;

                          case "balloonIterations":
                            this.balloonIterations = i;
                            break;

                          case "tetVolumeIterations":
                            this.tetVolumeIterations = i;
                        }
                    }
                }
                updateProperties() {
                    this.propertiesBufferIdx > 0 && (this.propertiesBufferIdx > this.propertiesBufferSize - 1 && (this.propertiesBufferSize = this.propertiesBufferIdx + 1, 
                    this.modifiedPropertiesBuffer.resize(this.propertiesBufferSize)), this.modifiedPropertiesBuffer.set(this.propertiesBufferIdx, -1), 
                    this.modifiedPropertiesHandler.updateProperties(this.pbdSimulator, this.collisionFinder, this.modifiedPropertiesBuffer), 
                    this.propertiesBufferIdx = 0);
                }
                preUpdate() {
                    this.rigidBodyWithUpdatedInertiaTensor.forEach(((t, e) => {
                        t.updateInertiaTensor();
                    })), this.rigidBodyWithUpdatedInertiaTensor.clear(), this.updateProperties(), this.physicsMaterialMap.forEach(((t, e) => {
                        e && e.isDirty() && (t.forEach((t => {
                            t.updatePhysicsMaterialData();
                        })), e.clearDirty());
                    }));
                }
                PBDSystemUpdate() {
                    this.collisionFinder.updateAllColliderBaseTransformFromEntities(), this.pbdSimulator.fetchRigidBodyTransformFromEntity(!0, !0);
                    const t = this.deltaTime * this.timeScale;
                    this.timeScale < 1 && t > this.fixedTimestep && this.pbdSimulator.setTimestep(this.fixedTimestep * this.timeScale), 
                    this.framerateIndependence && this.isAddingImpulse ? (this.pbdSimulator.step(this.fixedTimestep, this.collisionFinder), 
                    this.rigidBodyMap.forEach(((t, e) => {
                        t.removeImpulse();
                    })), this.propertiesBufferIdx > 0 && (this.propertiesBufferIdx > this.propertiesBufferSize - 1 && (this.propertiesBufferSize = this.propertiesBufferIdx + 1, 
                    this.modifiedPropertiesBuffer.resize(this.propertiesBufferSize)), this.modifiedPropertiesBuffer.set(this.propertiesBufferIdx, -1), 
                    this.modifiedPropertiesHandler.updateProperties(this.pbdSimulator, this.collisionFinder, this.modifiedPropertiesBuffer), 
                    this.propertiesBufferIdx = 0), this.pbdSimulator.step(t - this.fixedTimestep, this.collisionFinder), 
                    this.isAddingImpulse = !1) : this.pbdSimulator.step(t, this.collisionFinder), this.pbdSimulator.pushRigidBodyTransformToEntity();
                }
                static onDestroy() {
                    this.getInstance().destroy();
                }
                destroy() {
                    var t;
                    if (this.animationUpdateCallbackStatus === s.AnimationUpdateCallbackStatus.Registered) {
                        const e = null === (t = this._scene) || void 0 === t ? void 0 : t.getSystem("AnimatorSystem");
                        e && effect.Amaz.AmazingManager.removeListener(e, effect.Amaz.AnimSysEventType.ANIMSYS_END, this.PBDSystemUpdate, this);
                    }
                }
                addModifiedProperty(t, e, i, s) {
                    const o = new l.AMGModifiedProperty;
                    o.componentType = t, o.componentId = e, o.propertyType = i, o.newValue = s, this.modifiedProperties.pushBack(o);
                }
                static addModifiedPropertyFast(t, e, i) {
                    this.getInstance().addModifiedPropertyFastInternal(t, e, i);
                }
                addModifiedPropertyFastInternal(t, e, i) {
                    if (e < 0) return;
                    this.propertiesBufferIdx + this.modifiedPropertyFixedOffset + i.length > this.propertiesBufferSize && (this.propertiesBufferSize = this.propertiesBufferIdx + this.modifiedPropertyFixedOffset + i.length, 
                    this.modifiedPropertiesBuffer.resize(this.propertiesBufferSize)), this.modifiedPropertiesBuffer.set(this.propertiesBufferIdx++, t);
                    const s = new ArrayBuffer(4), o = new DataView(s);
                    o.setUint32(0, e, !0), this.modifiedPropertiesBuffer.set(this.propertiesBufferIdx++, o.getFloat32(0, !0));
                    for (let t = 0; t < i.length; t++) this.modifiedPropertiesBuffer.set(this.propertiesBufferIdx++, i[t]);
                }
                static registerAnimationUpdateCallback() {
                    this.getInstance().animationUpdateCallbackStatus !== s.AnimationUpdateCallbackStatus.Registered && (this.getInstance().animationUpdateCallbackStatus = s.AnimationUpdateCallbackStatus.NeedToBeRegistered);
                }
                static onComponentAdded(t) {
                    this.getInstance().componentAdded(t);
                }
                componentAdded(t) {
                    if (t instanceof effect.Amaz.JSScriptComponent) switch (t.path) {
                      case "js/ClothActor.js":
                        this.clothActorComponents.push(t.getScript().ref);
                        break;

                      case "js/SoftBodyActor.js":
                        this.softBodyActorComponents.push(t.getScript().ref);
                    }
                }
                static onEvent(t) {
                    this.getInstance().event(t);
                }
                event(t) {
                    var e;
                    if (t.type !== effect.Amaz.AppEventType.COMPAT_BEF || t.args.size() < 2) return;
                    const i = t.args.get(0), s = t.args.get(1);
                    if (i === effect.Amaz.BEFEventType.BET_RECORD_VIDEO && 1 === s && void 0 !== (null === (e = this._scene) || void 0 === e ? void 0 : e.getSettings)) {
                        if (!0 !== this._scene.getSettings().get("auto_reset_effect")) return;
                        this.pbdSimulator.resetPhysics(), this.collisionFinder.reset();
                        for (let t = 0; t < this.clothActorComponents.length; t++) {
                            const e = this.clothActorComponents[t];
                            !e || e.clothId < 0 || (this.pbdSimulator.getNative().reinitializeClothActor(e.clothId, e.clothTrans, e.constCloth, !1, null), 
                            this.pbdSimulator.getNative().updateMeshVertexPosition(e.clothId, e.clothTrans));
                        }
                        for (let t = 0; t < this.softBodyActorComponents.length; t++) {
                            const e = this.softBodyActorComponents[t];
                            !e || e.softBodyId < 0 || (this.pbdSimulator.getNative().reinitializeSoftBodyActor(e.softBodyId, e.softBodyTrans, e.softBodyMesh, e.tetMeshInfo, !1), 
                            this.pbdSimulator.getNative().updateSoftBodyMeshVertexPosition(e.softBodyId, e.tetMeshInfo, e.softBodyTrans));
                        }
                    }
                }
                parseMaskBitsFromTwoDArr(t) {
                    const e = [], i = t.size();
                    for (let s = 0; s < i; s++) {
                        let i = 0;
                        const o = t.get(s), r = o.size();
                        for (let t = 0; t < r; t++) {
                            o.get(t) && (i += Math.pow(2, r - 1 - t));
                        }
                        e.push(i);
                    }
                    return e;
                }
            };
            e.Physics3D = m, m.radianPerDegree = Math.PI / 180, m.PropertyType = {
                RigidBodyMass: 0,
                RigidBodyInertiaTensorDiagonal: 1,
                RigidBodyLinearDamping: 2,
                RigidBodyRotationalDamping: 3,
                RigidBodyExternalForce: 4,
                ColliderRestitutionCoef: 5,
                ColliderDynamicFrictionCoef: 6,
                BoxColliderHalfExtent: 7,
                SphereColliderRadius: 8,
                DistanceJointCompressCompliance: 9,
                DistanceJointStretchCompliance: 10,
                DistanceJointDampingCoef: 11,
                FixedRelativeRotationJointCompliance: 12,
                FixedRelativeRotationJointDampingCoef: 13,
                RigidBodyExternalTorque: 14,
                ColliderOffset: 15,
                CapsuleColliderRadius: 16,
                CapsuleColliderHeight: 17,
                RigidBodyRestPosition: 18,
                RigidBodyRelativePosEntitySpace: 19,
                RigidBodyVelocity: 20,
                ClothMass: 21,
                ClothThickness: 22,
                ClothStrechCompliance: 23,
                ClothBendCompliance: 24,
                ClothDamping: 25,
                ClothLRAScale: 26,
                ClothLRACompliance: 27,
                ClothWindVelocity: 28,
                ClothWindDrag: 29,
                ClothWindLift: 30,
                ColliderStaticFrictionCoef: 31,
                JointGlobalConnector: 32,
                JointBreakingLimit: 33,
                HingeJointMinAngle: 34,
                HingeJointMaxAngle: 35,
                HingeJointAxis: 36,
                ColliderIsTangible: 37,
                RigidBodyInertiaTensorUpdate: 38,
                ClothInterCollisions: 39,
                DistanceConstraintIterations: 40,
                FixedRelativeRotationJointIterations: 41,
                HingeJointIterations: 42,
                SphericalJointIterations: 43,
                AnisotropicSphericalJointIterations: 44,
                BendConstraintIterations: 45,
                ParticleStaticPinConstraintIterations: 46,
                LongRangeAttachmentConstraintIterations: 47,
                ClothMotionBackstopConstraintIterations: 48,
                MeshColliderUseConvexHull: 49,
                ClothBalloonConstraintIterations: 50,
                ClothBalloonPressure: 51,
                ColliderRelativeRotation: 52,
                SoftBodyInterCollisions: 53,
                SoftBodyMass: 54,
                SoftBodyEdgeCompliance: 55,
                SoftBodyVolumeCompliance: 56,
                SoftBodyDamping: 57,
                SoftBodyContactRadius: 58,
                TetVolumeIterations: 59,
                RigidBodyPosition: 60,
                RigidBodyRotation: 61,
                RigidBodyAngularVelocity: 62
            }, m.AnimationUpdateCallbackStatus = {
                Idle: 0,
                NeedToBeRegistered: 1,
                Registered: 2
            }, e.Physics3D = m = s = o([ (0, r.registerClass)() ], m);
        },
        4885: function(t) {
            t.exports = APJS_Require("AMGCollisionFinder");
        },
        7841: function(t) {
            t.exports = APJS_Require("AMGModifiedProperty");
        },
        9067: function(t) {
            t.exports = APJS_Require("AMGModifiedPropertyHandler");
        },
        4187: function(t) {
            t.exports = APJS_Require("AMGPbdSimulator");
        },
        7563: function(t) {
            t.exports = APJS_Require("EventManager");
        },
        2005: function(t) {
            t.exports = APJS_Require("FloatVector");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        2807: function(t) {
            t.exports = APJS_Require("Vector");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        }
    }, e = {};
    var i = function i(s) {
        var o = e[s];
        if (void 0 !== o) return o.exports;
        var r = e[s] = {
            exports: {}
        };
        return t[s].call(r.exports, r, r.exports, i), r.exports;
    }(5361), s = exports;
    for (var o in i) s[o] = i[o];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();