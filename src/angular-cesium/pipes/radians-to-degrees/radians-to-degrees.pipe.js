import { Pipe } from '@angular/core';
var RadiansToDegreesPipe = (function () {
    function RadiansToDegreesPipe() {
    }
    RadiansToDegreesPipe.prototype.transform = function (value, args) {
        return (360 - Math.round(180 * value / Math.PI)) % 360;
    };
    RadiansToDegreesPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'radiansToDegrees'
                },] },
    ];
    RadiansToDegreesPipe.ctorParameters = function () { return []; };
    return RadiansToDegreesPipe;
}());
export { RadiansToDegreesPipe };
//# sourceMappingURL=radians-to-degrees.pipe.js.map