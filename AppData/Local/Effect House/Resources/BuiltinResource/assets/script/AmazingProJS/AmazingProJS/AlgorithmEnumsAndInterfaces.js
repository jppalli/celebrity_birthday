const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {};
    !function() {
        var t, a, n, c, A, f, o, i = e;
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.SnapShotRet = i.HandAction = i.FacePetType = i.FaceGanObjectType = i.FaceAttrGender = i.FaceAttrExpression = i.FaceAction = void 0, 
        function(e) {
            e[e.BrowJump = effect.Amaz.FaceAction.BROW_JUMP] = "BrowJump", e[e.EyeBlink = effect.Amaz.FaceAction.EYE_BLINK] = "EyeBlink", 
            e[e.EyeBlinkLeft = effect.Amaz.FaceAction.EYE_BLINK_LEFT] = "EyeBlinkLeft", e[e.EyeBlinkRight = effect.Amaz.FaceAction.EYE_BLINK_RIGHT] = "EyeBlinkRight", 
            e[e.HeadPitch = effect.Amaz.FaceAction.HEAD_PITCH] = "HeadPitch", e[e.HeadYaw = effect.Amaz.FaceAction.HEAD_YAW] = "HeadYaw", 
            e[e.MouthAh = effect.Amaz.FaceAction.MOUTH_AH] = "MouthAh", e[e.MouthPout = effect.Amaz.FaceAction.MOUTH_POUT] = "MouthPout", 
            e[e.SideNod = effect.Amaz.FaceAction.SIDE_NOD] = "SideNod";
        }(t || (i.FaceAction = t = {})), function(e) {
            e[e.Unknown = effect.Amaz.FaceAttrExpression.UNKNOWN] = "Unknown", e[e.Angry = effect.Amaz.FaceAttrExpression.ANGRY] = "Angry", 
            e[e.Disgust = effect.Amaz.FaceAttrExpression.DISGUST] = "Disgust", e[e.Fear = effect.Amaz.FaceAttrExpression.FEAR] = "Fear", 
            e[e.Happy = effect.Amaz.FaceAttrExpression.HAPPY] = "Happy", e[e.Sad = effect.Amaz.FaceAttrExpression.SAD] = "Sad", 
            e[e.Surprise = effect.Amaz.FaceAttrExpression.SURPRISE] = "Surprise", e[e.Neutral = effect.Amaz.FaceAttrExpression.NEUTRAL] = "Neutral";
        }(a || (i.FaceAttrExpression = a = {})), function(e) {
            e[e.Unknown = effect.Amaz.FaceAttrGender.UNKNOWN] = "Unknown", e[e.Male = effect.Amaz.FaceAttrGender.MALE] = "Male", 
            e[e.Female = effect.Amaz.FaceAttrGender.FEMALE] = "Female";
        }(n || (i.FaceAttrGender = n = {})), function(e) {
            e[e.Undefined = effect.Amaz.FaceGanObjectType.UNDEFINED] = "Undefined", e[e.LeftDouble = effect.Amaz.FaceGanObjectType.LEFT_DOUBLE] = "LeftDouble", 
            e[e.LeftPlump = effect.Amaz.FaceGanObjectType.LEFT_PLUMP] = "LeftPlump", e[e.LeftDoublePlump = effect.Amaz.FaceGanObjectType.LEFT_DOUBLE_PLUMP] = "LeftDoublePlump", 
            e[e.RightDouble = effect.Amaz.FaceGanObjectType.RIGHT_DOUBLE] = "RightDouble", e[e.RightPlump = effect.Amaz.FaceGanObjectType.RIGHT_PLUMP] = "RightPlump", 
            e[e.RightDoublePlump = effect.Amaz.FaceGanObjectType.RIGHT_DOUBLE_PLUMP] = "RightDoublePlump", 
            e[e.LeftClassOnly = effect.Amaz.FaceGanObjectType.LEFT_CLASS_ONLY] = "LeftClassOnly", 
            e[e.RightClassOnly = effect.Amaz.FaceGanObjectType.RIGHT_CLASS_ONLY] = "RightClassOnly";
        }(c || (i.FaceGanObjectType = c = {})), function(e) {
            e[e.Cat = effect.Amaz.FacePetType.CAT] = "Cat", e[e.Dog = effect.Amaz.FacePetType.DOG] = "Dog", 
            e[e.Human = effect.Amaz.FacePetType.HUMAN] = "Human", e[e.Others = effect.Amaz.FacePetType.OTHERS] = "Others";
        }(A || (i.FacePetType = A = {})), function(e) {
            e[e.HeartA = effect.Amaz.HandAction.HEART_A] = "HeartA", e[e.HeartB = effect.Amaz.HandAction.HEART_B] = "HeartB", 
            e[e.HeartC = effect.Amaz.HandAction.HEART_C] = "HeartC", e[e.HeartD = effect.Amaz.HandAction.HEART_D] = "HeartD", 
            e[e.OK = effect.Amaz.HandAction.OK] = "OK", e[e.HandOpen = effect.Amaz.HandAction.HAND_OPEN] = "HandOpen", 
            e[e.ThumbUp = effect.Amaz.HandAction.THUMB_UP] = "ThumbUp", e[e.ThumbDown = effect.Amaz.HandAction.THUMB_DOWN] = "ThumbDown", 
            e[e.Rock = effect.Amaz.HandAction.ROCK] = "Rock", e[e.Namaste = effect.Amaz.HandAction.NAMASTE] = "Namaste", 
            e[e.PlamUp = effect.Amaz.HandAction.PLAM_UP] = "PlamUp", e[e.Fist = effect.Amaz.HandAction.FIST] = "Fist", 
            e[e.IndexFingerUp = effect.Amaz.HandAction.INDEX_FINGER_UP] = "IndexFingerUp", e[e.DoubleFingerUp = effect.Amaz.HandAction.DOUBLE_FINGER_UP] = "DoubleFingerUp", 
            e[e.Victory = effect.Amaz.HandAction.VICTORY] = "Victory", e[e.BigV = effect.Amaz.HandAction.BIG_V] = "BigV", 
            e[e.Phonecall = effect.Amaz.HandAction.PHONECALL] = "Phonecall", e[e.Beg = effect.Amaz.HandAction.BEG] = "Beg", 
            e[e.Thanks = effect.Amaz.HandAction.THANKS] = "Thanks", e[e.Unknown = effect.Amaz.HandAction.UNKNOWN] = "Unknown", 
            e[e.Cabbage = effect.Amaz.HandAction.CABBAGE] = "Cabbage", e[e.Three = effect.Amaz.HandAction.THREE] = "Three", 
            e[e.Four = effect.Amaz.HandAction.FOUR] = "Four", e[e.Pistol = effect.Amaz.HandAction.PISTOL] = "Pistol", 
            e[e.Rock2 = effect.Amaz.HandAction.ROCK2] = "Rock2", e[e.Swear = effect.Amaz.HandAction.SWEAR] = "Swear", 
            e[e.Holdface = effect.Amaz.HandAction.HOLDFACE] = "Holdface", e[e.Salute = effect.Amaz.HandAction.SALUTE] = "Salute", 
            e[e.Spread = effect.Amaz.HandAction.SPREAD] = "Spread", e[e.Pray = effect.Amaz.HandAction.PRAY] = "Pray", 
            e[e.Qigong = effect.Amaz.HandAction.QIGONG] = "Qigong", e[e.Slide = effect.Amaz.HandAction.SLIDE] = "Slide", 
            e[e.PalmDown = effect.Amaz.HandAction.PALM_DOWN] = "PalmDown", e[e.Pistol2 = effect.Amaz.HandAction.PISTOL2] = "Pistol2", 
            e[e.Naruto1 = effect.Amaz.HandAction.NARUTO1] = "Naruto1", e[e.Naruto2 = effect.Amaz.HandAction.NARUTO2] = "Naruto2", 
            e[e.Naruto3 = effect.Amaz.HandAction.NARUTO3] = "Naruto3", e[e.Naruto4 = effect.Amaz.HandAction.NARUTO4] = "Naruto4", 
            e[e.Naruto5 = effect.Amaz.HandAction.NARUTO5] = "Naruto5", e[e.Naruto7 = effect.Amaz.HandAction.NARUTO7] = "Naruto7", 
            e[e.Naruto8 = effect.Amaz.HandAction.NARUTO8] = "Naruto8", e[e.Naruto9 = effect.Amaz.HandAction.NARUTO9] = "Naruto9", 
            e[e.Naruto10 = effect.Amaz.HandAction.NARUTO10] = "Naruto10", e[e.Naruto11 = effect.Amaz.HandAction.NARUTO11] = "Naruto11", 
            e[e.Naruto12 = effect.Amaz.HandAction.NARUTO12] = "Naruto12", e[e.Spiderman = effect.Amaz.HandAction.SPIDERMAN] = "Spiderman", 
            e[e.Avengers = effect.Amaz.HandAction.AVENGERS] = "Avengers", e[e.MaxCount = effect.Amaz.HandAction.MAX_COUNT] = "MaxCount", 
            e[e.Undetect = effect.Amaz.HandAction.UNDETECT] = "Undetect";
        }(f || (i.HandAction = f = {})), function(e) {
            e[e.Disable = 0] = "Disable", e[e.False = 1] = "False", e[e.True = 2] = "True";
        }(o || (i.SnapShotRet = o = {}));
    }();
    var t = exports;
    for (var a in e) t[a] = e[a];
    e.__esModule && Object.defineProperty(t, "__esModule", {
        value: !0
    });
}();