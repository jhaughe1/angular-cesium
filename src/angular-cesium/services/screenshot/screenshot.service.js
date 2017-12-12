import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
var ScreenshotService = (function () {
    function ScreenshotService(cesiumSerive) {
        this.cesiumSerive = cesiumSerive;
    }
    ScreenshotService.prototype.getMapScreenshotDataUrlBase64 = function () {
        var canvas = this.cesiumSerive.getCanvas();
        return canvas.toDataURL();
    };
    ScreenshotService.prototype.downloadMapScreenshot = function (filename) {
        if (filename === void 0) { filename = 'map.png'; }
        var dataUrl = this.getMapScreenshotDataUrlBase64();
        this.downloadURI(dataUrl, filename);
    };
    ScreenshotService.prototype.downloadURI = function (uri, name) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    ScreenshotService.decorators = [
        { type: Injectable },
    ];
    ScreenshotService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return ScreenshotService;
}());
export { ScreenshotService };
//# sourceMappingURL=screenshot.service.js.map