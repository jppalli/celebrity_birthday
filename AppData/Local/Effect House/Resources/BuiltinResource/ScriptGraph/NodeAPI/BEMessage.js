"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEState = exports.BEMessage = void 0;
exports.BEMessage = {
    ScreenEvent: {
        event: 'screen_event',
        msgId: 0x000e0100,
        action: {
            ScreenTap: {
                key: 'screen_tap',
                id: 0x000e0101,
            },
            ScreenHold: {
                key: 'screen_hold',
                id: 0x000e0102,
            },
            ScreenPan: {
                key: 'screen_pan',
                id: 0x000e0103,
            },
        },
    },
    FaceMovement: {
        event: 'face_movement',
        msgId: 0x000e0200,
        action: {
            EyeBlinkLeft: {
                key: 'eye_blink_left',
                id: 0x000e0201,
            },
            EyeBlinkRight: {
                key: 'eye_blink_right',
                id: 0x000e0202,
            },
            EyeBlinkBoth: {
                key: 'eye_blink_both',
                id: 0x000e0203,
            },
            EyeBlinkEither: {
                key: 'eye_blink_either',
                id: 0x000e0204,
            },
            MouthOpen: {
                key: 'mouth_open',
                id: 0x000e0205,
            },
            MoutPout: {
                key: 'mouth_pout',
                id: 0x000e0206,
            },
            EyebrowWiggle: {
                key: 'eyebrow_wiggle',
                id: 0x000e0207,
            },
        },
    },
    HeadMovement: {
        event: 'face_movement',
        msgId: 0x000e0300,
        action: {
            HeadShake: {
                key: 'head_shake',
                id: 0x000e0301,
            },
            HeadNod: {
                key: 'head_nod',
                id: 0x000e0302,
            },
            HeadTiltRight: {
                key: 'head_tilt_right',
                id: 0x000e0303,
            },
            HeadTiltLeft: {
                key: 'head_tilt_left',
                id: 0x000e0304,
            },
        },
    },
    FaceExpression: {
        event: 'face_expression',
        msgId: 0x000e0400,
        action: {
            Happy: {
                key: 'happy',
                id: 0x000e0401,
            },
            Angry: {
                key: 'angry',
                id: 0x000e0402,
            },
            Surprise: {
                key: 'surprise',
                id: 0x000e0403,
            },
            Disgust: {
                key: 'disgust',
                id: 0x000e0404,
            },
            Fear: {
                key: 'fear',
                id: 0x000e0405,
            },
            Sad: {
                key: 'sad',
                id: 0x000e0406,
            },
            Neutral: {
                key: 'neutral',
                id: 0x000e0407,
            },
        },
    },
    FaceDetection: {
        event: 'face_detection',
        msgId: 0x000e0500,
        action: {
            Detect_Status: {
                key: 'detect_status',
                id: 0x000e0501,
            },
        },
    },
    PetDetection: {
        event: 'pet_detection',
        msgId: 0x000e0600,
        action: {
            Detect_Status: {
                key: 'detect_status',
                id: 0x000e0601,
            },
        },
    },
    BodyDetection: {
        event: 'body_detection',
        msgId: 0x000e0700,
        action: {
            Detect_Status: {
                key: 'detect_status',
                id: 0x000e0701,
            },
        },
    },
    Gesture: {
        event: 'gesture',
        msgId: 0x000e0800,
        action: {
            Three: {
                key: 'three',
                id: 0x000e0801,
            },
            Four: {
                key: 'four',
                id: 0x000e0802,
            },
            Fist: {
                key: 'fist',
                id: 0x000e0803,
            },
            HandOpen: {
                key: 'hand_open',
                id: 0x000e0804,
            },
            Rock: {
                key: 'rock',
                id: 0x000e0805,
            },
            Rock2: {
                key: 'rock2',
                id: 0x000e0806,
            },
            IndexFingerUp: {
                key: 'index_finger_up',
                id: 0x000e0807,
            },
            Victory: {
                key: 'victory',
                id: 0x000e0808,
            },
            ThumbUp: {
                key: 'thumb_up',
                id: 0x000e0809,
            },
            HeartA: {
                key: 'heart_a',
                id: 0x000e080a,
            },
            HeartB: {
                key: 'heart_b',
                id: 0x000e080b,
            },
            HeartC: {
                key: 'heart_c',
                id: 0x000e080c,
            },
            HeartD: {
                key: 'heart_d',
                id: 0x000e080d,
            },
            Pistol: {
                key: 'pistol',
                id: 0x000e080e,
            },
            Pistol2: {
                key: 'pistol2',
                id: 0x000e080f,
            },
            Swear: {
                key: 'swear',
                id: 0x000e0810,
            },
            OK: {
                key: 'OK',
                id: 0x000e0811,
            },
            PhoneCall: {
                key: 'phone_call',
                id: 0x000e0812,
            },
            BigV: {
                key: 'big_v',
                id: 0x000e0813,
            },
            Namaste: {
                key: 'namaste',
                id: 0x000e0814,
            },
            Beg: {
                key: 'beg',
                id: 0x000e0815,
            },
            Pray: {
                key: 'pray',
                id: 0x000e0816,
            },
            PalmUp: {
                key: 'palm_up',
                id: 0x000e0817,
            },
            Thanks: {
                key: 'thanks',
                id: 0x000e0818,
            },
            HoldFace: {
                key: 'hold_face',
                id: 0x000e0819,
            },
            Salute: {
                key: 'salute',
                id: 0x000e081a,
            },
            Spread: {
                key: 'spread',
                id: 0x000e081b,
            },
            Cabbage: {
                key: 'cabbage',
                id: 0x000e081c,
            },
            ThumbDown: {
                key: 'thumb_down',
                id: 0x000e081d,
            },
            DoubleFingerUp: {
                key: 'double_finger_up',
                id: 0x000e081e,
            },
        },
    },
};
exports.BEState = {
    Begin: {
        key: 'begin',
        id: 0x000e1000,
    },
    Stay: {
        key: 'stay',
        id: 0x000e1001,
    },
    End: {
        key: 'end',
        id: 0x000e1002,
    },
    None: {
        key: 'none',
        id: 0x000e1003,
    },
};
//# sourceMappingURL=BEMessage.js.map