import { Pipe } from '@angular/core';
var PixelOffsetPipe = (function () {
    function PixelOffsetPipe() {
    }
    PixelOffsetPipe.prototype.transform = function (value, args) {
        return new Cesium.Cartesian2(value[0], value[1]);
    };
    PixelOffsetPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'pixelOffset'
                },] },
    ];
    PixelOffsetPipe.ctorParameters = function () { return []; };
    return PixelOffsetPipe;
}());
export { PixelOffsetPipe };
//# sourceMappingURL=pixel-offset.pipe.js.map