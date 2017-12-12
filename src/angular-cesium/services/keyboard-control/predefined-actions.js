import { KeyboardAction } from '../../models/ac-keyboard-action.enum';
var CAMERA_MOVEMENT_DEFAULT_FACTOR = 100.0;
var CAMERA_LOOK_DEFAULT_FACTOR = 0.01;
var CAMERA_TWIST_DEFAULT_FACTOR = 0.01;
var CAMERA_ROTATE_DEFAULT_FACTOR = 0.01;
export var PREDEFINED_KEYBOARD_ACTIONS = (_a = {},
    _a[KeyboardAction.CAMERA_FORWARD] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveForward(moveRate);
    },
    _a[KeyboardAction.CAMERA_BACKWARD] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveBackward(moveRate);
    },
    _a[KeyboardAction.CAMERA_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveUp(moveRate);
    },
    _a[KeyboardAction.CAMERA_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveDown(moveRate);
    },
    _a[KeyboardAction.CAMERA_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveRight(moveRate);
    },
    _a[KeyboardAction.CAMERA_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var scene = cesiumService.getScene();
        var cameraHeight = scene.globe.ellipsoid.cartesianToCartographic(camera.position).height;
        var moveRate = cameraHeight / (params.moveRate || CAMERA_MOVEMENT_DEFAULT_FACTOR);
        camera.moveLeft(moveRate);
    },
    _a[KeyboardAction.CAMERA_LOOK_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookRight(currentPosition.latitude * lookFactor);
    },
    _a[KeyboardAction.CAMERA_LOOK_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookLeft(currentPosition.latitude * lookFactor);
    },
    _a[KeyboardAction.CAMERA_LOOK_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookUp(currentPosition.longitude * (lookFactor * -1));
    },
    _a[KeyboardAction.CAMERA_LOOK_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var currentPosition = camera.positionCartographic;
        var lookFactor = params.lookFactor || CAMERA_LOOK_DEFAULT_FACTOR;
        camera.lookDown(currentPosition.longitude * (lookFactor * -1));
    },
    _a[KeyboardAction.CAMERA_TWIST_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.amount || CAMERA_TWIST_DEFAULT_FACTOR;
        camera.twistRight(lookFactor);
    },
    _a[KeyboardAction.CAMERA_TWIST_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.amount || CAMERA_TWIST_DEFAULT_FACTOR;
        camera.twistLeft(lookFactor);
    },
    _a[KeyboardAction.CAMERA_ROTATE_RIGHT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateRight(lookFactor);
    },
    _a[KeyboardAction.CAMERA_ROTATE_LEFT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateLeft(lookFactor);
    },
    _a[KeyboardAction.CAMERA_ROTATE_UP] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateUp(lookFactor);
    },
    _a[KeyboardAction.CAMERA_ROTATE_DOWN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var lookFactor = params.angle || CAMERA_ROTATE_DEFAULT_FACTOR;
        camera.rotateDown(lookFactor);
    },
    _a[KeyboardAction.CAMERA_ZOOM_IN] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var amount = params.amount;
        camera.zoomIn(amount);
    },
    _a[KeyboardAction.CAMERA_ZOOM_OUT] = function (cesiumService, params) {
        var camera = cesiumService.getViewer().camera;
        var amount = params.amount;
        camera.zoomOut(amount);
    },
    _a);
var _a;
//# sourceMappingURL=predefined-actions.js.map