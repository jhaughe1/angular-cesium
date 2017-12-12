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
import { Injectable } from '@angular/core';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
import { CesiumService } from '../../../cesium/cesium.service';
var StaticPolygonDrawerService = (function (_super) {
    __extends(StaticPolygonDrawerService, _super);
    function StaticPolygonDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolygonGeometry, cesiumService) || this;
    }
    StaticPolygonDrawerService.decorators = [
        { type: Injectable },
    ];
    StaticPolygonDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticPolygonDrawerService;
}(StaticPrimitiveDrawer));
export { StaticPolygonDrawerService };
//# sourceMappingURL=polygon-drawer.service.js.map