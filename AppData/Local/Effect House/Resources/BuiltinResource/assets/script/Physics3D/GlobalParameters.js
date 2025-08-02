// Amaz
const Amaz = effect.Amaz;

const GlobalParameters = {
    modifiedPropertyFixedOffset: 2,
    propertiesBufferIdx: 0,
    propertiesBufferSize: 100,
    modifiedPropertiesBuffer: new Amaz.FloatVector(),
    modifiedProperties: new Amaz.Vector(),

    colliderMap: new Map(),
    rigidBodyMap: new Map(),
    rigidBodyWithUpdatedInertiaTensor: new Map(),
    physicsMaterialMap: new Map(),

    gravityAcceleration: new effect.Amaz.Vector3f(0, -980, 0),
    gravityFactor: 100,
    substeps: 5,
    framerateIndependence: false,
    fixedTimestep: 0.02,
    maxAllowedTimestep: 0.333,
    timeScale: 1,
    positionSolveIterations: 5,
    contactVelocitySolveIter: 5,
    contactPositionSolveIter: 5,
    
    distanceIterations: 5,
    angularIterations: 5,
    bendingIterations: 5,
    tetherIterations: 5,
    balloonIterations: 2,
    tetVolumeIterations: 5,
    isAddingImpulse: false,
    radianPerDegree: Math.PI / 180.0,
    deltaTime: 0,
    maskBitsArr: [],

    animationUpdateCallbackStatus: 0, // 0: idle, 1: need to be registered, 2: registered
    registerAnimationUpdateCallback: function () {
        if (GlobalParameters.animationUpdateCallbackStatus === 2) 
            return;
        GlobalParameters.animationUpdateCallbackStatus = 1;
    },

    addModifiedProperty: function(compType, compId, propertyType, newValue) {
        let modifiedProperty = new effect.Amaz.AMGModifiedProperty();
        modifiedProperty.componentType = compType;
        modifiedProperty.componentId = compId;
        modifiedProperty.propertyType = propertyType;
        modifiedProperty.newValue = newValue;
        GlobalParameters.modifiedProperties.pushBack(modifiedProperty);
    },

    addModifiedPropertyFast: function (propertyType, compId, newValue) {
        if (GlobalParameters.propertiesBufferIdx + GlobalParameters.modifiedPropertyFixedOffset + 
                newValue.length > GlobalParameters.propertiesBufferSize) {
            GlobalParameters.propertiesBufferSize = GlobalParameters.propertiesBufferIdx + 
            GlobalParameters.modifiedPropertyFixedOffset + newValue.length;
            GlobalParameters.modifiedPropertiesBuffer.resize(GlobalParameters.propertiesBufferSize);
        }
        GlobalParameters.modifiedPropertiesBuffer.set(GlobalParameters.propertiesBufferIdx++, propertyType);

        // encode unsigned int Id to float vector 
        const buffer = new ArrayBuffer(4);
        const dataView = new DataView(buffer);
        dataView.setUint32(0, compId, true);
        GlobalParameters.modifiedPropertiesBuffer.set(GlobalParameters.propertiesBufferIdx++, dataView.getFloat32(0, true));
        for (let i = 0; i < newValue.length; i++) {
            GlobalParameters.modifiedPropertiesBuffer.set(GlobalParameters.propertiesBufferIdx++, newValue[i]);
        }
    },

    /**
     * @description: generate maskBits array from a 2d Vector
     * @param {*} twoDArr is of type Amaz.Vector, whose element are also of type Amaz.Vector
     * twoDArr.get(x) is of type Amaz.Vector, whose element are of type boolean
     * @return {*} a 1d JS array of maskBits, each representing the maskBits of layerX, where X is the index
     */
    parseMaskBitsFromTwoDArr: function(twoDArr) {
        const resultArr = [];
        const row = twoDArr.size();
        for (let i = 0; i < row; i++)
        {
            let maskBitOfRowI = 0;
            const rowElement = twoDArr.get(i);
            const col = rowElement.size();
            for (let j = 0; j < col; j++)
            {
                
                const colElement = rowElement.get(j);
                if (colElement)
                {
                    maskBitOfRowI += Math.pow(2, col - 1 - j);
                }
            }
            resultArr.push(maskBitOfRowI);
        }
        return resultArr;
    },

    // PropertyType
    RigidBodyMass : 0,
    RigidBodyInertiaTensorDiagonal : 1,
    RigidBodyLinearDamping : 2,
    RigidBodyRotationalDamping : 3,
    RigidBodyExternalForce : 4,
    ColliderRestitutionCoef : 5,
    ColliderDynamicFrictionCoef : 6,
    BoxColliderHalfExtent : 7,
    SphereColliderRadius : 8,
    DistanceJointCompressCompliance : 9,
    DistanceJointStretchCompliance : 10,
    DistanceJointDampingCoef : 11,
    FixedRelativeRotationJointCompliance : 12,
    FixedRelativeRotationJointDampingCoef : 13,
    RigidBodyExternalTorque : 14,
    ColliderOffset : 15,
    CapsuleColliderRadius : 16,
    CapsuleColliderHeight : 17,
    RigidBodyRestPosition : 18,
    RigidBodyRelativePosEntitySpace : 19,
    RigidBodyVelocity: 20,
    ClothMass : 21,
    ClothThickness : 22,
    ClothStrechCompliance : 23,
    ClothBendCompliance : 24,
    ClothDamping: 25,
    ClothLRAScale : 26,
    ClothLRACompliance : 27,
    ClothWindVelocity: 28,
    ClothWindDrag : 29,
    ClothWindLift : 30,
    ColliderStaticFrictionCoef : 31,
    JointGlobalConnector : 32,
    JointBreakingLimit : 33,
    HingeJointMinAngle : 34,
    HingeJointMaxAngle : 35,
    HingeJointAxis : 36,
    ColliderIsTangible : 37,

    RigidBodyInertiaTensorUpdate: 38,
    ClothInterCollisions: 39,

    DistanceConstraintIterations : 40,
    FixedRelativeRotationJointIterations : 41,
    HingeJointIterations : 42,
    SphericalJointIterations : 43,
    AnisotropicSphericalJointIterations : 44,
    BendConstraintIterations : 45,
    ParticleStaticPinConstraintIterations : 46,
    LongRangeAttachmentConstraintIterations : 47,
    ClothMotionBackstopConstraintIterations : 48,
    MeshColliderUseConvexHull : 49,
    ClothBalloonConstraintIterations : 50,
    ClothBalloonPressure : 51,
    ColliderRelativeRotation : 52,
    SoftBodyInterCollisions : 53,
    SoftBodyMass : 54,
    SoftBodyEdgeCompliance : 55,
    SoftBodyVolumeCompliance : 56,
    SoftBodyDamping : 57,
    SoftBodyContactRadius : 58,
    TetVolumeIterations : 59,
}

exports.GlobalParameters = GlobalParameters;