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
import { CesiumService } from '../../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../../primitives-drawer/primitives-drawer.service';
var DynamicPolylineDrawerService = (function (_super) {
    __extends(DynamicPolylineDrawerService, _super);
    function DynamicPolylineDrawerService(cesiumService) {
        return _super.call(this, Cesium.PolylineCollection, cesiumService) || this;
    }
    DynamicPolylineDrawerService.decorators = [
        { type: Injectable },
    ];
    DynamicPolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return DynamicPolylineDrawerService;
}(PrimitivesDrawerService));
export { DynamicPolylineDrawerService };
//# sourceMappingURL=dynamic-polyline-drawer.service.js.map