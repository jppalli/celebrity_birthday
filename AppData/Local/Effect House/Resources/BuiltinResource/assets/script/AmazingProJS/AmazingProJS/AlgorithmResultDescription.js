const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        }
    }, t = {};
    function a(r) {
        var n = t[r];
        if (void 0 !== n) return n.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r](o, o.exports, a), o.exports;
    }
    var r = {};
    !function() {
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.implementInterfaceResult = void 0;
        const t = a(1012), n = a(4542), o = {
            AEAlgorithmResult: {
                propertyNames: [],
                methodNames: [ "getActionRecognitionCount", "getActionRecognitionInfo", "getActionRecognitionIsExecuted", "getAvatar3DInfo", "getAvatar3DInfoCount", "getAvatar3DInfoTracking", "getAvatar3DIsExecuted", "getAvatarDriveCount", "getAvatarDriveInfo", "getBgInfo", "getBlitImage", "getBuildingNormalInfo", "getBuildingSegInfo", "getClothesSegInfo", "getDepthEstimationInfo", "getEarSegInfo", "getEarSegInfoCount", "getFaceAttributeCount", "getFaceAttributeInfo", "getFaceBaseInfo", "getFaceClustingInfo", "getFaceCount", "getFaceExtraInfo", "getFaceFaceMask", "getFaceGanInfo", "getFaceGanInfoCount", "getFaceMeshInfo", "getFaceMouthMask", "getFaceNewLandmarkInfo", "getFaceNewLandmarkInfoCount", "getFacePetInfo", "getFacePetInfoCount", "getFaceTeethMask", "getFemaleGanInfo", "getFindContourCount", "getFindContourInfo", "getFootCount", "getFootInfo", "getFootMaskInfo", "getGroundSegInfo", "getHAvatarInfo", "getHAvatarInfoCount", "getHairGerInfo", "getHairGerInfoCount", "getHairInfo", "getHandCount", "getHandInfo", "getHeadSegInfo", "getHeadSegInfoCount", "getIDreamInfo", "getKiraInfo", "getNHImageTfmCount", "getNHImageTfmInfo", "getNailKeyPointInfo", "getNailKeyPointInfoCount", "getNaviAvatarDriveInfo", "getOutputTexture", "getPetMattingInfo", "getSaliencySegResult", "getScriptInfo", "getSkeletonCount", "getSkeletonInfo", "getSkinSegInfo", "getSkyInfo", "getSlamInfo", "getWatchTryonCount", "getWatchTryonInfo" ]
            },
            ActionRecognitionInfoInterface: {
                propertyNames: [ "actionLabel", "actionScore", "isValid" ]
            },
            Avatar3DInfoInterface: {
                propertyNames: [ "focal_length", "tracking_id", "detected", "imageHeight", "imageWidth", "joints", "quaternion", "root", "valid" ],
                propertyApjsNames: [ "focalLength", "trackingID" ]
            },
            AvatarDriveInfoInterface: {
                propertyNames: [ "affine_mat", "ID", "action", "alpha", "beta", "height", "landmarks", "mv", "mvp", "rot", "succ", "width" ],
                propertyApjsNames: [ "affineMatrix" ]
            },
            BachImageInterface: {
                propertyNames: [ "height", "image", "width" ]
            },
            BachMapInterface: {
                propertyNames: [ "data" ],
                methodNames: [ "get" ]
            },
            BachTextureInterface: {
                propertyNames: [ "texId", "affine", "height", "texture", "width" ],
                propertyApjsNames: [ "textureID" ]
            },
            BuildingNormalInfoInterface: {
                propertyNames: [ "hangBoxesAngle", "hangBoxesCenterX", "hangBoxesCenterY", "hangBoxesNormal", "hangBoxesSizeHeight", "hangBoxesSizeWidth", "numBoxes", "objectCls", "polygon", "polygonCenterX", "polygonCenterY" ]
            },
            BuildingSegInfoInterface: {
                propertyNames: [ "mask_data", "height", "mask", "shiftX", "shiftY", "width" ],
                propertyApjsNames: [ "maskData" ]
            },
            ClothGanInfoInterface: {
                propertyNames: [ "image_height", "image_width", "affineMatrix", "height", "image", "width" ],
                propertyApjsNames: [ "imageHeight", "imageWidth" ]
            },
            ClothesSegInfoInterface: {
                propertyNames: [ "mask_data", "alphaMask", "bottom", "height", "left", "right", "shiftX", "shiftY", "top", "width" ],
                propertyApjsNames: [ "maskData" ]
            },
            DepthEstimationInfoInterface: {
                propertyNames: [ "depthMask", "height", "image", "width" ]
            },
            EarSegInfoInterface: {
                propertyNames: [ "alpha0", "alpha1", "centerX", "centerY", "cls", "earHeight", "earWidth", "faceID", "mask0", "mask1", "maskChannel", "maskHeight", "maskWidth", "matrix0", "matrix1", "yaw" ]
            },
            EyeFittingInfoInterface: {
                propertyNames: [ "faceId", "cameraParam", "fovy", "leftLandmarks", "leftMVP", "leftModel", "leftNormals", "leftRvec", "leftTangents", "leftTvec", "leftVertexes", "rightLandmarks", "rightMVP", "rightModel", "rightNormals", "rightRvec", "rightTangents", "rightTvec", "rightVertexes", "triangles", "uvs" ],
                propertyApjsNames: [ "faceID" ]
            },
            Face106Interface: {
                propertyNames: [ "eye_dist", "points_array", "tracking_cnt", "visibility_array", "ID", "pitch", "rect", "roll", "score", "yaw" ],
                propertyApjsNames: [ "eyeDist", "pointsArray", "trackingCnt", "visibilityArray" ],
                methodNames: [ "hasAction" ]
            },
            FaceAttributeInterface: {
                propertyNames: [ "exp_probs", "exp_type", "age", "attractive", "boyProb", "gender", "happyScore", "quality" ],
                propertyApjsNames: [ "expProbs", "expType" ]
            },
            FaceExtraInterface: {
                propertyNames: [ "eye_count", "eye_left", "eye_right", "eyebrow_count", "eyebrow_left", "eyebrow_right", "iris_count", "left_iris", "lips_count", "right_iris", "lips" ],
                propertyApjsNames: [ "eyeCount", "eyeLeft", "eyeRight", "eyebrowCount", "eyebrowLeft", "eyebrowRight", "irisCount", "leftIris", "lipsCount", "rightIris" ]
            },
            FaceFaceMaskInterface: {
                propertyNames: [ "face_mask", "face_mask_size", "warp_mat", "ID", "image" ],
                propertyApjsNames: [ "faceMask", "faceMaskSize", "warpMatrix" ]
            },
            FaceFittingInfoInterface: {
                propertyNames: [],
                methodNames: [ "getFaceFittingCount", "getFaceFittingCount1256", "getFaceMeshConfig", "getFaceMeshConfig1256", "getFaceMeshInfo", "getFaceMeshInfo1256" ]
            },
            FaceGanInfoInterface: {
                propertyNames: [ "image_height", "image_width", "affine", "data", "doubleRate", "faceID", "objectType", "outChannel", "outHeight", "outWidth", "plumpRate", "rect" ],
                propertyApjsNames: [ "imageHeight", "imageWidth" ]
            },
            FaceInfoInterface: {
                propertyNames: [],
                methodNames: [ "getBinocularFaceCount", "getFaceBaseInfo", "getFaceCount", "getFaceExtraInfo", "getFaceFaceMask", "getFaceMouthMask", "getFaceOcclusion", "getFaceTeethMask", "getFaceVRInfo" ]
            },
            FaceMeshConfigInterface: {
                propertyNames: [ "flist", "uvs" ]
            },
            FaceMeshInfoInterface: {
                propertyNames: [ "ID", "bitangents", "landmarks", "modelMatrix", "mvp", "normals", "param", "rvec", "scale", "tangents", "tvec", "vertexes" ]
            },
            FaceMouthMaskInterface: {
                propertyNames: [ "face_mask", "face_mask_size", "warp_mat", "ID", "image" ],
                propertyApjsNames: [ "faceMask", "faceMaskSize", "warpMatrix" ]
            },
            FaceNewLandmarkInfoInterface: {
                propertyNames: [ "faceID", "points" ]
            },
            FacePetInfoInterface: {
                propertyNames: [ "Id", "ear_type", "face_pet_type", "points_array", "action", "pitch", "rect", "roll", "score", "yaw" ],
                propertyApjsNames: [ "ID", "earType", "facePetType", "pointsArray" ]
            },
            FaceTeethMaskInterface: {
                propertyNames: [ "face_mask", "face_mask_size", "warp_mat", "ID", "image" ],
                propertyApjsNames: [ "faceMask", "faceMaskSize", "warpMatrix" ]
            },
            FemaleGanInfoInterface: {
                propertyNames: [ "faceId", "affine", "cropImage", "cropImgAlignment", "cropImgChannels", "cropImgData", "cropImgHeight", "cropImgStride", "cropImgWidth", "height", "outputImage", "outputImgAlignment", "outputImgChannels", "outputImgData", "outputImgHeight", "outputImgStride", "outputImgWidth", "shouldDraw", "width" ],
                propertyApjsNames: [ "faceID" ]
            },
            FindContourInfoInterface: {
                propertyNames: [ "contours", "height", "hierarchy", "width" ]
            },
            FootInfoInterface: {
                propertyNames: [ "footId", "foot_prob", "is_left", "key_points_is_detect", "key_points_xy", "left_prob", "segment_box", "u_model", "box", "segment", "transMat" ],
                propertyApjsNames: [ "footID", "footProb", "isLeft", "keyPointsIsDetect", "keyPointsXY", "leftProb", "segmentBox", "uModel" ]
            },
            FootMaskInfoInterface: {
                propertyNames: [ "foot_image", "foot_mask", "leg_image", "leg_mask", "mask_height", "mask_image", "mask_image2", "mask_width", "trousers_image", "trousers_mask", "mask", "mask2" ],
                propertyApjsNames: [ "footImage", "footMask", "legImage", "legMask", "maskHeight", "maskImage", "maskImage2", "maskWidth", "trousersImage", "trousersMask" ]
            },
            GraphicsInfoInterface: {
                propertyNames: [ "id", "data", "height", "image", "matrix", "width" ],
                propertyApjsNames: [ "ID" ]
            },
            GroundSegResultInterface: {
                propertyNames: [ "mask_data", "groundMask", "height", "srcImageHeight", "srcImageWidth", "width" ],
                propertyApjsNames: [ "maskData" ]
            },
            HAvatarInfoInterface: {
                propertyNames: [ "ID", "action", "handProb", "kpt2d", "kpt3d", "leftProb", "quaternion", "rect", "root" ]
            },
            HairGerInfoInterface: {
                propertyNames: [ "channelId", "height", "image", "reflector", "width" ],
                propertyApjsNames: [ "channelID" ]
            },
            HairResultInterface: {
                propertyNames: [ "mask_data", "new_rect", "height", "mAlphac", "mAlphal", "mAlphas", "mask", "rect", "reflection", "rotateType", "width" ],
                propertyApjsNames: [ "maskData", "newRect" ]
            },
            HandInfoInterface: {
                propertyNames: [ "forefinger_r_trans", "hand_count_for_ring", "key_points_3d", "key_points_3d_is_detect", "key_points_extension_is_detect", "key_points_extension_xy", "key_points_is_detect", "key_points_xy", "left_prob", "little_finger_r_trans", "mask_height", "mask_width", "middle_finger_r_trans", "ring_finger_r_trans", "ring_r_trans", "ring_render_mode", "ring_rt_trans", "ringv2_occluder_mode", "ringv2_render_mode", "rot_angle", "rot_angle_bothhand", "segment_data", "segment_height", "segment_width", "seq_action", "thumb_r_trans", "ID", "action", "image", "rect", "scale", "score" ],
                propertyApjsNames: [ "forefingerRTrans", "handCountForRing", "keyPoints3d", "keyPoints3dIsDetect", "keyPointsExtensionIsDetect", "keyPointsExtensionXy", "keyPointsIsDetect", "keyPointsXY", "leftProb", "littleFingerRTrans", "maskHeight", "maskWidth", "middleFingerRTrans", "ringFingerRTrans", "ringRTrans", "ringRenderMode", "ringRtTrans", "ringv2OccluderMode", "ringv2RenderMode", "rotAngle", "rotAngleBothhand", "segmentData", "segmentHeight", "segmentWidth", "seqAction", "thumbRTrans" ]
            },
            HeadSegInfoInterface: {
                propertyNames: [ "face_id", "alpha", "cameraMatrix", "channel", "height", "matrix", "srcHeight", "srcWidth", "width", "xScale", "yScale" ],
                propertyApjsNames: [ "faceID" ]
            },
            IDreamInfoInterface: {
                propertyNames: [ "image_height", "image_width", "affine", "height", "image", "width" ],
                propertyApjsNames: [ "imageHeight", "imageWidth" ]
            },
            KiraResultInterface: {
                propertyNames: [ "channels", "height", "mask", "pointNum", "points", "width" ]
            },
            MattingResultInterface: {
                propertyNames: [ "mask_data", "take_this", "bgMask", "height", "resultRect", "width" ],
                propertyApjsNames: [ "maskData", "takeThis" ]
            },
            NHImageTransformInterface: {
                propertyNames: [ "affine", "mvp" ]
            },
            NailKeyPointInfoInterface: {
                propertyNames: [ "cls", "kpts", "nailRect" ]
            },
            NaviAvatarDriveInfoInterface: {
                propertyNames: [ "blendshapeWeights", "modelView" ]
            },
            PetMattingInfoInterface: {
                propertyNames: [ "mask0", "mask1", "maskCount", "maskHeight", "maskWidth" ]
            },
            SaliencySegInfoInterface: {
                propertyNames: [ "bboxcenterX", "bboxcenterY", "bboxheight", "bboxrotateAngle", "bboxwidth", "input", "mask", "modelIndex", "realH", "realW" ]
            },
            ScriptInfoInterface: {
                propertyNames: [ "outputMap" ],
                methodNames: [ "data", "get" ]
            },
            SkeletonInfoInterface: {
                propertyNames: [ "image_orientation", "key_points_detected", "key_points_score", "key_points_xy", "ID", "orientation", "rect" ],
                propertyApjsNames: [ "imageOrientation", "keyPointsDetected", "keyPointsScore", "keyPointsXY" ]
            },
            SkinSegInfoInterface: {
                propertyNames: [ "mask_data", "data", "height", "reflector", "width" ],
                propertyApjsNames: [ "maskData" ]
            },
            SkyResultInterface: {
                propertyNames: [ "mask_data", "channel", "height", "skyMask", "width" ],
                propertyApjsNames: [ "maskData" ]
            },
            SlamResultInterface: {
                propertyNames: [ "colorCorrection", "depthImage", "depthRangeMax", "depthRangeMin", "depths", "enable", "featurePoints", "fusionState", "hangboxDepths", "mapData", "planeDetected", "planeTransform", "planeUpdate", "planesAnchor", "projection", "sizeOfFeaturePoints", "trackStatus", "trackingStateReason", "view", "withDepth" ]
            },
            WatchTryonInfoInterface: {
                propertyNames: [ "isLeft", "modelViewMatrix", "triangles", "vertices" ]
            }
        }, i = new Map, s = {
            Vec2Vector: function(e) {
                return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Vec3Vector: function(e) {
                return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Vec4Vector: function(e) {
                return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            QuatVector: function(e) {
                return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            FloatVector: function(e) {
                return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            UInt8Vector: function(e) {
                return new Uint8Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            UInt16Vector: function(e) {
                return new Uint16Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            UInt32Vector: function(e) {
                return new Uint32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Int8Vector: function(e) {
                return new Int8Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Int16Vector: function(e) {
                return new Int16Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Int32Vector: function(e) {
                return new Int32Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            DoubleVector: function(e) {
                return new Float64Array(effect.Amaz.AmazingUtil.getArrayBuffer(e));
            },
            Vector: function(e) {
                return (0, n.convertNativeVectorToJSArray)(e);
            },
            Map: function(e) {
                return (0, n.convertNativeMapToJSMap)(e);
            }
        };
        function g(e, a = !1) {
            var r;
            const n = typeof e;
            if ("number" === n || "string" === n || "boolean" === n || "undefined" === n) return e;
            const i = null !== (r = null == e ? void 0 : e.constructor.name) && void 0 !== r ? r : null == e ? void 0 : e.constructor.__nativeClassName;
            if ("undefined" === i) return;
            if (function(e) {
                if (null == e) return !1;
                return null != o[e];
            }(i)) return c(e, i, a);
            if (s[i]) return s[i](e);
            let g = (0, t.transferToAPJSObj)(e);
            return g || null;
        }
        function c(e, t, a) {
            var r;
            if (null == e) return e;
            const n = null !== (r = null != t ? t : e.constructor.name) && void 0 !== r ? r : e.constructor.__nativeClassName, s = o[n];
            if (void 0 === s) return;
            let c, f = {};
            (a || !1) && (c = {});
            let p = e;
            Object.defineProperty(f, "_rtti", {
                get: function() {
                    return globalThis.algorithmInternalFlag ? p : void 0;
                },
                enumerable: !1,
                configurable: !1
            }), c && Object.defineProperty(f, "_cache", {
                get: function() {
                    return globalThis.algorithmInternalFlag ? c : void 0;
                },
                enumerable: !1,
                configurable: !1
            });
            let m = i.get(n);
            if (null == m) {
                function l(e, t, a) {
                    const r = t || e;
                    Object.defineProperty(a, r, {
                        get: function() {
                            globalThis.algorithmInternalFlag = !0;
                            const t = this._rtti, a = this._cache;
                            if (globalThis.algorithmInternalFlag = !1, a) {
                                const t = a[e];
                                if (void 0 !== t) return t;
                            }
                            const r = g(t[e]);
                            return a && (a[e] = r), r;
                        }
                    });
                }
                m = {};
                const h = s.propertyNames, I = s.propertyApjsNames;
                for (let d = 0; d < h.length; ++d) {
                    l(h[d], I ? I[d] : void 0, m);
                }
                function u(e, t, a) {
                    const r = t || e;
                    Object.defineProperty(a, r, {
                        writable: !0,
                        value: function(...t) {
                            globalThis.algorithmInternalFlag = !0;
                            const a = this._rtti;
                            globalThis.algorithmInternalFlag = !1;
                            return g(a[e](...t));
                        }
                    });
                }
                const y = s.methodNames;
                if (y) {
                    const _ = s.methodApjsNames;
                    for (let k = 0; k < y.length; ++k) {
                        u(y[k], _ ? _[k] : void 0, m);
                    }
                }
                i.set(n, m);
            }
            return Object.setPrototypeOf(f, m), f;
        }
        e.implementInterfaceResult = c;
    }();
    var n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();