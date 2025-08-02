const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1810: function(t, e, i) {
            var d = this && this.__decorate || function(t, e, i, d) {
                var r, o = arguments.length, l = o < 3 ? e : null === d ? d = Object.getOwnPropertyDescriptor(e, i) : d;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, i, d); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (l = (o < 3 ? r(l) : o > 3 ? r(e, i, l) : r(e, i)) || l);
                return o > 3 && l && Object.defineProperty(e, i, l), l;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGCollisionFinder = void 0;
            const r = i(2864), o = i(1012), l = i(1012);
            let a = class AMGCollisionFinder extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGCollisionFinder), this._typedRtti = this._rtti;
                }
                addBoxCollider(t, e, i, d, r, o) {
                    return this._typedRtti.addBoxCollider(t.getNative(), e.getNative(), i.getNative(), d.getNative(), r, o);
                }
                addBoxColliderToEntity(t, e, i, d) {
                    return this._typedRtti.addBoxColliderToEntity(t.getNative(), e.getNative(), i, d);
                }
                addBoxColliderToRigidBody(t, e, i, d, r, o, l) {
                    return this._typedRtti.addBoxColliderToRigidBody(t.getNative(), e.getNative(), i, d.getNative(), r, o, l);
                }
                addSphereCollider(t, e, i, d, r, o) {
                    return this._typedRtti.addSphereCollider(t, e.getNative(), i.getNative(), d.getNative(), r, o);
                }
                addSphereColliderToEntity(t, e, i, d) {
                    return this._typedRtti.addSphereColliderToEntity(t.getNative(), e, i, d);
                }
                addSphereColliderToRigidBody(t, e, i, d, r, o, l) {
                    return this._typedRtti.addSphereColliderToRigidBody(t.getNative(), e, i, d.getNative(), r, o, l);
                }
                addCapsuleCollider(t, e, i, d, r, o, l) {
                    return this._typedRtti.addCapsuleCollider(t, e, i.getNative(), d.getNative(), r.getNative(), o, l);
                }
                addCapsuleColliderToEntity(t, e, i, d, r) {
                    return this._typedRtti.addCapsuleColliderToEntity(t.getNative(), e, i, d, r);
                }
                addCapsuleColliderToRigidBody(t, e, i, d, r, o, l, a) {
                    return this._typedRtti.addCapsuleColliderToRigidBody(t.getNative(), e, i, d, r.getNative(), o, l, a);
                }
                addCylinderCollider(t, e, i, d, r, o) {
                    return this._typedRtti.addCylinderCollider(t.getNative(), e.getNative(), i.getNative(), d.getNative(), r, o);
                }
                addCylinderColliderToEntity(t, e, i, d) {
                    return this._typedRtti.addCylinderColliderToEntity(t.getNative(), e.getNative(), i, d);
                }
                addCylinderColliderToRigidBody(t, e, i, d, r, o, l) {
                    return this._typedRtti.addCylinderColliderToRigidBody(t.getNative(), e.getNative(), i, d.getNative(), r, o, l);
                }
                addConeCollider(t, e, i, d, r, o, l) {
                    return this._typedRtti.addConeCollider(t, e, i.getNative(), d.getNative(), r.getNative(), o, l);
                }
                addConeColliderToEntity(t, e, i, d, r) {
                    return this._typedRtti.addConeColliderToEntity(t.getNative(), e, i, d, r);
                }
                addConeColliderToRigidBody(t, e, i, d, r, o, l, a) {
                    return this._typedRtti.addConeColliderToRigidBody(t.getNative(), e, i, d, r.getNative(), o, l, a);
                }
                addDiscreteParticleCollider(t, e, i, d) {
                    return this._typedRtti.addDiscreteParticleCollider(t, e.getNative(), i, d);
                }
                addDiscreteParticleColliderToEntity(t, e, i, d) {
                    return this._typedRtti.addDiscreteParticleColliderToEntity(t.getNative(), e, i, d);
                }
                addDiscreteParticleColliderToParticle(t, e, i, d, r) {
                    return this._typedRtti.addDiscreteParticleColliderToParticle(t.getNative(), e, i, d, r);
                }
                attachColliderToRigidBody(t, e, i, d) {
                    return this._typedRtti.attachColliderToRigidBody(t.getNative(), e, i, d);
                }
                detachCollider(t, e) {
                    this._typedRtti.detachCollider(t, e);
                }
                getAttachedRigidBodyIndex(t) {
                    return this._typedRtti.getAttachedRigidBodyIndex(t);
                }
                getAssociatedParticleIndex(t) {
                    return this._typedRtti.getAssociatedParticleIndex(t);
                }
                setColliderBaseTransform(t, e, i, d) {
                    this._typedRtti.setColliderBaseTransform(t, e.getNative(), i.getNative(), d.getNative());
                }
                setColliderBaseTransformFromEntity(t) {
                    this._typedRtti.setColliderBaseTransformFromEntity(t);
                }
                updateAllColliderBaseTransformFromEntities() {
                    this._typedRtti.updateAllColliderBaseTransformFromEntities();
                }
                setColliderRestitutionCoef(t, e) {
                    this._typedRtti.setColliderRestitutionCoef(t, e);
                }
                setColliderDynamicFrictionCoef(t, e) {
                    this._typedRtti.setColliderDynamicFrictionCoef(t, e);
                }
                setColliderStaticFrictionCoef(t, e) {
                    this._typedRtti.setColliderStaticFrictionCoef(t, e);
                }
                setColliderIsTangible(t, e) {
                    this._typedRtti.setColliderIsTangible(t, e);
                }
                setColliderRelativeTransform(t, e, i) {
                    this._typedRtti.setColliderRelativeTransform(t, e.getNative(), i.getNative());
                }
                disableColliderRelativeTransform(t) {
                    this._typedRtti.disableColliderRelativeTransform(t);
                }
                updateColliderTransform(t) {
                    this._typedRtti.updateColliderTransform(t);
                }
                updateTransforms() {
                    this._typedRtti.updateTransforms();
                }
                updateColliderAABB(t) {
                    this._typedRtti.updateColliderAABB(t);
                }
                updateAABBs() {
                    this._typedRtti.updateAABBs();
                }
                getAABB(t) {
                    return (0, l.transferToAPJSObj)(this._typedRtti.getAABB(t));
                }
                removeCollider(t) {
                    this._typedRtti.removeCollider(t);
                }
                doCollisionDetection() {
                    this._typedRtti.doCollisionDetection();
                }
                doCollisionDetectionSingleCollider(t) {
                    this._typedRtti.doCollisionDetectionSingleCollider(t);
                }
                deactivateCollider(t) {
                    this._typedRtti.deactivateCollider(t);
                }
                activateCollider(t, e) {
                    this._typedRtti.activateCollider(t, e.getNative());
                }
                contactCount() {
                    return this._typedRtti.contactCount();
                }
                getContactInfoList(t) {
                    this._typedRtti.getContactInfoList(t.getNative());
                }
                rayTestClosestHit(t, e, i, d, r) {
                    return this._typedRtti.rayTestClosestHit(t.getNative(), e.getNative(), i, d, r.getNative());
                }
                rayTestAllHits(t, e, i, d) {
                    this._typedRtti.rayTestAllHits(t.getNative(), e.getNative(), i, d);
                }
                rayHitCount() {
                    return this._typedRtti.rayHitCount();
                }
                getRayHitInfoList(t) {
                    this._typedRtti.getRayHitInfoList(t.getNative());
                }
                enableInterParticleCollision() {
                    this._typedRtti.enableInterParticleCollision();
                }
                disableInterParticleCollision() {
                    this._typedRtti.disableInterParticleCollision();
                }
                enableParticleRigidbodyCollision() {
                    this._typedRtti.enableParticleRigidbodyCollision();
                }
                disableParticleRigidbodyCollision() {
                    this._typedRtti.disableParticleRigidbodyCollision();
                }
                reset() {
                    this._typedRtti.reset();
                }
                colliderCurrentFrameContactsCount(t) {
                    return this._typedRtti.colliderCurrentFrameContactsCount(t);
                }
                getColliderCurrentFrameContactInfoList(t, e) {
                    this._typedRtti.getColliderCurrentFrameContactInfoList(t, e.getNative());
                }
                addColliderCollisionEventFocus(t) {
                    this._typedRtti.addColliderCollisionEventFocus(t);
                }
                removeColliderCollisionEventFocus(t) {
                    this._typedRtti.removeColliderCollisionEventFocus(t);
                }
                generateConvexHull(t, e, i) {
                    this._typedRtti.generateConvexHull(t.getNative(), e.getNative(), i.getNative());
                }
                updateColliderGroupBits(t, e) {
                    this._typedRtti.updateColliderGroupBits(t, e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGCollisionFinder = a, e.AMGCollisionFinder = a = d([ (0, o.registerClass)() ], a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(d) {
        var r = e[d];
        if (void 0 !== r) return r.exports;
        var o = e[d] = {
            exports: {}
        };
        return t[d].call(o.exports, o, o.exports, i), o.exports;
    }(1810), d = exports;
    for (var r in i) d[r] = i[r];
    i.__esModule && Object.defineProperty(d, "__esModule", {
        value: !0
    });
}();