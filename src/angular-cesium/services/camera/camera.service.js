import { Injectable } from '@angular/core';
import { SceneMode } from '../../models/scene-mode.enum';
var CameraService = (function () {
    function CameraService() {
        this.isSceneModePerformance2D = false;
    }
    CameraService.prototype.init = function (cesiumService) {
        this.viewer = cesiumService.getViewer();
        this.scene = cesiumService.getScene();
        this.screenSpaceCameraController = this.scene.screenSpaceCameraController;
        this.camera = this.scene.camera;
        this.lastRotate = this.screenSpaceCameraController.enableRotate;
        this.lastTilt = this.screenSpaceCameraController.enableTilt;
        this.lastLook = this.screenSpaceCameraController.enableLook;
    };
    CameraService.prototype._listenToSceneModeMorph = function (callback) {
        this.morphListenerCancelFn = this.scene.morphStart.addEventListener(callback);
    };
    CameraService.prototype._revertCameraProperties = function () {
        this.isSceneModePerformance2D = false;
        this.enableTilt(this.lastTilt);
        this.enableRotate(this.lastRotate);
        this.enableLook(this.lastLook);
    };
    CameraService.prototype.getCamera = function () {
        return this.camera;
    };
    CameraService.prototype.getScreenSpaceCameraController = function () {
        return this.screenSpaceCameraController;
    };
    CameraService.prototype.getMinimumZoom = function () {
        return this.screenSpaceCameraController.minimumZoomDistance;
    };
    CameraService.prototype.setMinimumZoom = function (amount) {
        this.screenSpaceCameraController.minimumZoomDistance = amount;
    };
    CameraService.prototype.getMaximumZoom = function () {
        return this.screenSpaceCameraController.maximumZoomDistance;
    };
    CameraService.prototype.setMaximumZoom = function (amount) {
        this.screenSpaceCameraController.maximumZoomDistance = amount;
    };
    CameraService.prototype.enableTilt = function (tilt) {
        this.screenSpaceCameraController.enableTilt = tilt;
    };
    CameraService.prototype.enableRotate = function (rotate) {
        this.screenSpaceCameraController.enableRotate = rotate;
    };
    CameraService.prototype.enableLook = function (lock) {
        this.screenSpaceCameraController.enableLook = lock;
    };
    CameraService.prototype.enableTranslate = function (translate) {
        this.screenSpaceCameraController.enableTranslate = translate;
    };
    CameraService.prototype.enableZoom = function (zoom) {
        this.screenSpaceCameraController.enableZoom = zoom;
    };
    CameraService.prototype.enableInputs = function (inputs) {
        this.screenSpaceCameraController.enableInputs = inputs;
    };
    CameraService.prototype.setSceneMode = function (sceneMode, duration) {
        var _this = this;
        switch (sceneMode) {
            case SceneMode.SCENE3D: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphTo3D(duration);
                break;
            }
            case SceneMode.COLUMBUS_VIEW: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphToColumbusView(duration);
                break;
            }
            case SceneMode.SCENE2D: {
                if (this.isSceneModePerformance2D) {
                    this._revertCameraProperties();
                }
                this.scene.morphTo2D(duration);
                break;
            }
            case SceneMode.PERFORMANCE_SCENE2D: {
                this.isSceneModePerformance2D = true;
                this.lastLook = this.screenSpaceCameraController.enableLook;
                this.lastTilt = this.screenSpaceCameraController.enableTilt;
                this.lastRotate = this.screenSpaceCameraController.enableRotate;
                this.screenSpaceCameraController.enableTilt = false;
                this.screenSpaceCameraController.enableRotate = false;
                this.screenSpaceCameraController.enableLook = false;
                if (this.morphListenerCancelFn) {
                    this.morphListenerCancelFn();
                }
                this.scene.morphToColumbusView(duration);
                var morphCompleteEventListener_1 = this.scene.morphComplete.addEventListener(function () {
                    _this.camera.setView({
                        destination: Cesium.Cartesian3.fromDegrees(0.0, 0.0, Math.min(CameraService.PERFORMANCE_2D_ALTITUDE, _this.getMaximumZoom())),
                        orientation: {
                            pitch: Cesium.Math.toRadians(-90),
                        }
                    });
                    morphCompleteEventListener_1();
                    _this._listenToSceneModeMorph(_this._revertCameraProperties.bind(_this));
                });
                break;
            }
        }
    };
    CameraService.prototype.cameraFlyTo = function (options) {
        this.camera.flyTo(options);
    };
    CameraService.prototype.flyTo = function (target, options) {
        return this.viewer.flyTo(target, options);
    };
    CameraService.prototype.zoomTo = function (target, offset) {
        return this.viewer.zoomTo(target, offset);
    };
    CameraService.prototype.setView = function (options) {
        this.camera.setView(options);
    };
    CameraService.prototype.trackEntity = function (entity) {
        this.viewer.trackedEntity = entity;
    };
    CameraService.prototype.untrackEntity = function () {
        this.trackEntity();
    };
    CameraService.PERFORMANCE_2D_ALTITUDE = 25000000;
    CameraService.decorators = [
        { type: Injectable },
    ];
    CameraService.ctorParameters = function () { return []; };
    return CameraService;
}());
export { CameraService };
//# sourceMappingURL=camera.service.js.map