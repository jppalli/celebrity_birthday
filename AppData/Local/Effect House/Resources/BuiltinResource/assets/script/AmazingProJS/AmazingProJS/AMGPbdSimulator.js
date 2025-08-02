const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4096: function(t, e, i) {
            var o = this && this.__decorate || function(t, e, i, o) {
                var d, a = arguments.length, n = a < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, o); else for (var s = t.length - 1; s >= 0; s--) (d = t[s]) && (n = (a < 3 ? d(n) : a > 3 ? d(e, i, n) : d(e, i)) || n);
                return a > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGPbdSimulator = void 0;
            const d = i(1012), a = i(2864), n = i(3968);
            let s = class AMGPbdSimulator extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGPbdSimulator), this._typedRtti = this._rtti;
                }
                dumpRigidBodyTransform(t, e) {
                    this._typedRtti.dumpRigidBodyTransform(t, e.getNative());
                }
                setNumSubsteps(t) {
                    this._typedRtti.setNumSubsteps(t);
                }
                setNumPositionSolveIterations(t) {
                    this._typedRtti.setNumPositionSolveIterations(t);
                }
                setNumPositionSolveIterationsForContact(t) {
                    this._typedRtti.setNumPositionSolveIterationsForContact(t);
                }
                setNumVelocitySolveIterationsForContact(t) {
                    this._typedRtti.setNumVelocitySolveIterationsForContact(t);
                }
                setGravityAcceleration(t) {
                    this._typedRtti.setGravityAcceleration(t.getNative());
                }
                setRigidBodyInitialVelocity(t, e) {
                    this._typedRtti.setRigidBodyInitialVelocity(t, e.getNative());
                }
                step(t, e) {
                    this._typedRtti.step(t, e.getNative());
                }
                IKStep() {
                    this._typedRtti.IKStep();
                }
                addParticle(t, e, i, o) {
                    return this._typedRtti.addParticle(t, e.getNative(), i.getNative(), o);
                }
                getParticlePosition(t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.getParticlePosition(t));
                }
                addRigidBody(t, e, i, o, d, a, n, s) {
                    return this._typedRtti.addRigidBody(t, e.getNative(), i.getNative(), o.getNative(), d.getNative(), a.getNative(), n, s);
                }
                addRigidBodyToEntity(t, e, i, o, d, a, n) {
                    return this._typedRtti.addRigidBodyToEntity(t, e.getNative(), i.getNative(), o.getNative(), d.getNative(), a, n);
                }
                removeRigidBody(t) {
                    this._typedRtti.removeRigidBody(t);
                }
                getRigidBodyPosition(t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.getRigidBodyPosition(t));
                }
                getRigidBodyVelocity(t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.getRigidBodyVelocity(t));
                }
                getRigidBodyAngularVelocity(t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.getRigidBodyAngularVelocity(t));
                }
                getRigidBodyOrientation(t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.getRigidBodyOrientation(t));
                }
                setRigidBodyTransformFromEntity(t, e, i) {
                    this._typedRtti.setRigidBodyTransformFromEntity(t, e, i);
                }
                fetchRigidBodyTransformFromEntity(t, e) {
                    this._typedRtti.fetchRigidBodyTransformFromEntity(t, e);
                }
                pushRigidBodyTransformToEntity() {
                    this._typedRtti.pushRigidBodyTransformToEntity();
                }
                setRigidBodyRelativePosEntitySpace(t, e) {
                    this._typedRtti.setRigidBodyRelativePosEntitySpace(t, e.getNative());
                }
                removeConstraint(t) {
                    this._typedRtti.removeConstraint(t);
                }
                enableFixedTimestepIndependentOfFramerate() {
                    this._typedRtti.enableFixedTimestepIndependentOfFramerate();
                }
                disableFixedTimestepIndependentOfFramerate() {
                    this._typedRtti.disableFixedTimestepIndependentOfFramerate();
                }
                enableSlowMotionMode() {
                    this._typedRtti.enableSlowMotionMode();
                }
                disableSlowMotionMode() {
                    this._typedRtti.disableSlowMotionMode();
                }
                disableConstraint(t) {
                    this._typedRtti.disableConstraint(t);
                }
                enableConstraint(t) {
                    this._typedRtti.enableConstraint(t);
                }
                removeStretch() {
                    this._typedRtti.removeStretch();
                }
                resetRigidBodyToInitialStates(t) {
                    this._typedRtti.resetRigidBodyToInitialStates(t);
                }
                enableBodyKinematic(t) {
                    this._typedRtti.enableBodyKinematic(t);
                }
                disableBodyKinematic(t) {
                    this._typedRtti.disableBodyKinematic(t);
                }
                disableRigidBody(t) {
                    this._typedRtti.disableRigidBody(t);
                }
                enableRigidBody(t, e) {
                    this._typedRtti.enableRigidBody(t, e.getNative());
                }
                addDistanceJoint(t, e, i, o, d, a, n, s) {
                    return this._typedRtti.addDistanceJoint(t, e, i.getNative(), o, d, a.getNative(), n.getNative(), s);
                }
                setDistanceJointRestLength(t, e) {
                    this._typedRtti.setDistanceJointRestLength(t, e);
                }
                setDistanceJointConnectorLocalPos(t, e, i) {
                    this._typedRtti.setDistanceJointConnectorLocalPos(t, e.getNative(), i.getNative());
                }
                addFixedRelativeRotationJoint(t, e, i, o, d) {
                    return this._typedRtti.addFixedRelativeRotationJoint(t, e, i, o, d);
                }
                addHingeJoint(t, e, i, o, d, a, n, s) {
                    return this._typedRtti.addHingeJoint(t, e, i.getNative(), o, d, a, n, s);
                }
                setHingeJointAngleLimits(t, e, i, o) {
                    this._typedRtti.setHingeJointAngleLimits(t, e, i, o.getNative());
                }
                addAnisotropicSphericalJoint(t, e, i, o, d, a, n, s) {
                    return this._typedRtti.addAnisotropicSphericalJoint(t, e, i.getNative(), o.getNative(), d, a, n, s);
                }
                addSphericalJoint(t, e, i, o, d, a, n) {
                    return this._typedRtti.addSphericalJoint(t, e, i.getNative(), o, d, a, n);
                }
                setSphericalJointAngleLimit(t, e, i, o, d) {
                    return this._typedRtti.setSphericalJointAngleLimit(t, e, i, o, d);
                }
                setParticlePosition(t, e) {
                    this._typedRtti.setParticlePosition(t, e.getNative());
                }
                setRigidBodyPosition(t, e) {
                    this._typedRtti.setRigidBodyPosition(t, e.getNative());
                }
                setIKAngularJointPreferredAngle(t, e) {
                    this._typedRtti.setIKAngularJointPreferredAngle(t, e.getNative());
                }
                setIKAngularJointPreferredAngleStatus(t, e) {
                    this._typedRtti.setIKAngularJointPreferredAngleStatus(t, e);
                }
                applyIKAngularJointPreferredAngle(t, e) {
                    this._typedRtti.applyIKAngularJointPreferredAngle(t, e);
                }
                setJointInitialRelativeDeltaRotation(t, e) {
                    this._typedRtti.setJointInitialRelativeDeltaRotation(t, e.getNative());
                }
                setJointInitialRelativeDeltaRotationStatus(t, e) {
                    this._typedRtti.setJointInitialRelativeDeltaRotationStatus(t, e);
                }
                setRigidBodyRotation(t, e) {
                    this._typedRtti.setRigidBodyRotation(t, e.getNative());
                }
                setRigidBodyVelocity(t, e) {
                    this._typedRtti.setRigidBodyVelocity(t, e.getNative());
                }
                setRigidBodyAngularVelocity(t, e) {
                    this._typedRtti.setRigidBodyAngularVelocity(t, e.getNative());
                }
                applyExternalForceToRigidBodyCenterOfMass(t, e) {
                    this._typedRtti.applyExternalForceToRigidBodyCenterOfMass(t, e.getNative());
                }
                enableParticleKinematic(t) {
                    this._typedRtti.enableParticleKinematic(t);
                }
                disableParticleKinematic(t) {
                    this._typedRtti.disableParticleKinematic(t);
                }
                addClothActor(t, e, i, o, d) {
                    return this._typedRtti.addClothActor(t.getNative(), e.getNative(), i.getNative(), o.getNative(), d.getNative());
                }
                reinitializeClothActor(t, e, i, o, d) {
                    return this._typedRtti.reinitializeClothActor(t, e.getNative(), i.getNative(), o, d.getNative());
                }
                addSoftBodyActor(t, e, i, o, d) {
                    return this._typedRtti.addSoftBodyActor(t.getNative(), e.getNative(), i.getNative(), o.getNative(), d.getNative());
                }
                reinitializeSoftBodyActor(t, e, i, o, d) {
                    return this._typedRtti.reinitializeSoftBodyActor(t, e.getNative(), i.getNative(), o.getNative(), d);
                }
                addWindForce(t, e, i) {
                    return this._typedRtti.addWindForce(t.getNative(), e, i);
                }
                bindWindWithMesh(t, e) {
                    this._typedRtti.bindWindWithMesh(t, e);
                }
                removeWindMeshBind(t, e) {
                    this._typedRtti.removeWindMeshBind(t, e);
                }
                updateMeshVertexPosition(t, e) {
                    this._typedRtti.updateMeshVertexPosition(t, e.getNative());
                }
                updateSoftBodyMeshVertexPosition(t, e, i) {
                    this._typedRtti.updateSoftBodyMeshVertexPosition(t, e.getNative(), i.getNative());
                }
                removeClothActor(t, e) {
                    this._typedRtti.removeClothActor(t, e.getNative());
                }
                enableClothActor(t) {
                    this._typedRtti.enableClothActor(t);
                }
                disableClothActor(t) {
                    this._typedRtti.disableClothActor(t);
                }
                enableSoftBodyActor(t) {
                    this._typedRtti.enableSoftBodyActor(t);
                }
                disableSoftBodyActor(t) {
                    this._typedRtti.disableSoftBodyActor(t);
                }
                updateInertiaTensorForAll(t, e) {
                    this._typedRtti.updateInertiaTensorForAll(t.getNative(), e.getNative());
                }
                updateInertiaTensor(t, e, i, o) {
                    this._typedRtti.updateInertiaTensor(t, e.getNative(), i.getNative(), o.getNative());
                }
                freezeRigidBodyTranslation(t, e) {
                    this._typedRtti.freezeRigidBodyTranslation(t, e);
                }
                unfreezeRigidBodyTranslation(t, e) {
                    this._typedRtti.unfreezeRigidBodyTranslation(t, e);
                }
                setJointBreakingLimit(t, e) {
                    this._typedRtti.setJointBreakingLimit(t, e);
                }
                attachJoints(t) {
                    this._typedRtti.attachJoints(t.getNative());
                }
                setJointGlobalConnector(t, e, i) {
                    this._typedRtti.setJointGlobalConnector(t, e, i.getNative());
                }
                enableApplyForceOnchange() {
                    this._typedRtti.enableApplyForceOnchange();
                }
                disableApplyForceOnchange() {
                    this._typedRtti.disableApplyForceOnchange();
                }
                setOnlyVelocitySolveForContacts(t) {
                    this._typedRtti.setOnlyVelocitySolveForContacts(t);
                }
                resetPhysics() {
                    this._typedRtti.resetPhysics();
                }
                addExternalForceToCloth(t, e) {
                    this._typedRtti.addExternalForceToCloth(t, e.getNative());
                }
                addExternalForceToSoftBody(t, e) {
                    this._typedRtti.addExternalForceToSoftBody(t, e.getNative());
                }
                findSoftBodyAttachParticleIndices(t, e, i) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.findSoftBodyAttachParticleIndices(t, e.getNative(), i));
                }
                attachSoftBodyParticlesToRigidbody(t, e, i, o, d) {
                    this._typedRtti.attachSoftBodyParticlesToRigidbody(t, e.getNative(), i, o, d.getNative());
                }
                detachSoftBodyParticlesFromRigidbody(t, e, i) {
                    this._typedRtti.detachSoftBodyParticlesFromRigidbody(t, e.getNative(), i.getNative());
                }
                attachParticlesToRigidbody(t, e, i, o, d) {
                    this._typedRtti.attachParticlesToRigidbody(t, e.getNative(), i, o, d.getNative());
                }
                detachParticlesFromRigidbody(t, e, i) {
                    this._typedRtti.detachParticlesFromRigidbody(t, e.getNative(), i.getNative());
                }
                addLRAConstrintsToCloth(t, e, i, o) {
                    this._typedRtti.addLRAConstrintsToCloth(t, e.getNative(), i, o);
                }
                removeLRAConstrintsFromCloth(t) {
                    this._typedRtti.removeLRAConstrintsFromCloth(t);
                }
                setTimestep(t) {
                    this._typedRtti.setTimestep(t);
                }
                setMaxDeltaTime(t) {
                    this._typedRtti.setMaxDeltaTime(t);
                }
                getMaxDeltaTime() {
                    return this._typedRtti.getMaxDeltaTime();
                }
                setClothMotionBackstopConstraints(t, e, i, o, d, a, n) {
                    this._typedRtti.setClothMotionBackstopConstraints(t, e.getNative(), i.getNative(), o, d, a, n);
                }
                updatePositionsNormalsClothMotionBackstopConstraints(t, e, i) {
                    this._typedRtti.updatePositionsNormalsClothMotionBackstopConstraints(t, e.getNative(), i.getNative());
                }
                setClothMotionBackstopConstraintParameters(t, e, i, o, d, a) {
                    this._typedRtti.setClothMotionBackstopConstraintParameters(t, e.getNative(), i, o, d, a);
                }
                setAutoAddBendingConstraint(t) {
                    this._typedRtti.setAutoAddBendingConstraint(t);
                }
                setStoreComponentIdWithBitsCopy(t) {
                    this._typedRtti.setStoreComponentIdWithBitsCopy(t);
                }
                updateRigidBodyInertiaTensor(t, e, i) {
                    this._typedRtti.updateRigidBodyInertiaTensor(t, e.getNative(), i.getNative());
                }
                setRigidbodyShadowBodyId(t, e) {
                    this._typedRtti.setRigidbodyShadowBodyId(t, e);
                }
                getRigidBodyInertiaTensor(t) {
                    return new n.Vector3f(this._typedRtti.getRigidBodyInertiaTensor(t));
                }
                addBendingConstraintsToCloth(t, e) {
                    return this._typedRtti.addBendingConstraintsToCloth(t, e);
                }
                addBalloonConstraintToCloth(t, e, i) {
                    return this._typedRtti.addBalloonConstraintToCloth(t, e, i);
                }
                isBodyKinematic(t) {
                    return this._typedRtti.isBodyKinematic(t);
                }
                removeBendingConstraintsFromCloth(t) {
                    return this._typedRtti.removeBendingConstraintsFromCloth(t);
                }
                removeBalloonConstraintFromCloth(t) {
                    return this._typedRtti.removeBalloonConstraintFromCloth(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGPbdSimulator = s, e.AMGPbdSimulator = s = o([ (0, d.registerClass)() ], s);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        }
    }, e = {};
    var i = function i(o) {
        var d = e[o];
        if (void 0 !== d) return d.exports;
        var a = e[o] = {
            exports: {}
        };
        return t[o].call(a.exports, a, a.exports, i), a.exports;
    }(4096), o = exports;
    for (var d in i) o[d] = i[d];
    i.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();