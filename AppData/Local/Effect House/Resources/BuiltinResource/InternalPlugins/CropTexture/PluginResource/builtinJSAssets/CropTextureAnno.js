/**
 * @field {Texture2D} texture - {
 *    "label": "asset_crop_texture_input_texture",
 *    "default": "default.jpg"
 * }
 *
 * @field {Rect} cropZone - {
 *    "label": "asset_crop_texture_crop_zone",
 *    "minValue": [-10,-10,-10,-10],
 *    "maxValue": [10,10,10,10]
 * }
 * @field {Number} rotation - {
 *    "label": "asset_crop_texture_rotation",
 *    "range": {"min": -360, "max": 360},
 *    "step": 0.1,
 *    "showMiniArrow": true,
 *    "precision": 2
 * }
 * 
 * @field {Boolean} faceCrop - {
 *    "label": "asset_crop_texture_crop",
 *    "default": true
 * }
 * 
 * @field {Vector2f} scale - {
 *    "label": "asset_crop_texture_face_scale",
 *    "stepSize": 1,
 *    "showMiniArrow": true,
 *    "accuracy": 3,
 *    "range": {"min": {"x": 0, "y": 0}, "max": {"x": 10, "y": 10} }
 * }
 * @field {Number} faceIds - {
 *    "display": "combobox",
 *    "default": 0,
 *    "label": "asset_crop_texture_face_id",
 *    "options": [
 *     {"label": "asset_crop_texture_face_1", "value": 0},
 *     {"label": "asset_crop_texture_face_2", "value": 1},
 *     {"label": "asset_crop_texture_face_3", "value": 2},
 *     {"label": "asset_crop_texture_face_4", "value": 3},
 *     {"label": "asset_crop_texture_face_5", "value": 4},
 *     {"label": "asset_crop_texture_face_6", "value": 5},
 *     {"label": "asset_crop_texture_face_7", "value": 6},
 *     {"label": "asset_crop_texture_face_8", "value": 7},
 *     {"label": "asset_crop_texture_face_9", "value": 8},
 *     {"label": "asset_crop_texture_face_10", "value": 9}
 *   ]
 * }
 * @field {Number} faceCenter - {
 *    "label": "asset_crop_texture_face_center",
 *    "range": {"min": -10, "max": 10 },
 *    "step": 0.1,
 *    "showMiniArrow": true,
 *    "precision": 2
 * }
 */
