var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { CesiumService } from '../../../cesium/cesium.service';
;
import { Injectable } from '@angular/core';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
var StaticEllipseDrawerService = (function (_super) {
    __extends(StaticEllipseDrawerService, _super);
    function StaticEllipseDrawerService(cesiumService) {
        return _super.call(this, Cesium.EllipseGeometry, cesiumService) || this;
    }
    StaticEllipseDrawerService.decorators = [
        { type: Injectable },
    ];
    StaticEllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticEllipseDrawerService;
}(StaticPrimitiveDrawer));
export { StaticEllipseDrawerService };
//# sourceMappingURL=ellipse-drawer.service.js.map