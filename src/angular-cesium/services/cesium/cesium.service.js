import { Injectable, NgZone, Optional } from '@angular/core';
import { ViewerFactory } from '../viewer-factory/viewer-factory.service';
import { ViewerConfiguration } from '../viewer-configuration/viewer-configuration.service';
var CesiumService = (function () {
    function CesiumService(ngZone, viewerFactory, viewerConfiguration) {
        this.ngZone = ngZone;
        this.viewerFactory = viewerFactory;
        this.viewerConfiguration = viewerConfiguration;
    }
    CesiumService.prototype.init = function (mapContainer) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            var options = _this.viewerConfiguration ? _this.viewerConfiguration.viewerOptions : undefined;
            _this.cesiumViewer = _this.viewerFactory.createViewer(mapContainer, options);
            if (_this.viewerConfiguration && _this.viewerConfiguration.viewerModifier &&
                typeof _this.viewerConfiguration.viewerModifier === 'function') {
                _this.viewerConfiguration.viewerModifier(_this.cesiumViewer);
            }
        });
    };
    CesiumService.prototype.getViewer = function () {
        return this.cesiumViewer;
    };
    CesiumService.prototype.getScene = function () {
        return this.cesiumViewer.scene;
    };
    CesiumService.prototype.getCanvas = function () {
        return this.cesiumViewer.canvas;
    };
    CesiumService.decorators = [
        { type: Injectable },
    ];
    CesiumService.ctorParameters = function () { return [
        { type: NgZone, },
        { type: ViewerFactory, },
        { type: ViewerConfiguration, decorators: [{ type: Optional },] },
    ]; };
    return CesiumService;
}());
export { CesiumService };
//# sourceMappingURL=cesium.service.js.map