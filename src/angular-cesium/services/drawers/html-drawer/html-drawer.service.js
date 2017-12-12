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
import { CesiumService } from '../../cesium/cesium.service';
import { PrimitivesDrawerService } from '../primitives-drawer/primitives-drawer.service';
var HtmlDrawerService = (function (_super) {
    __extends(HtmlDrawerService, _super);
    function HtmlDrawerService(_cesiumService) {
        var _this = _super.call(this, Cesium.HtmlCollection, _cesiumService) || this;
        _this._cesiumService = _cesiumService;
        return _this;
    }
    HtmlDrawerService.prototype.add = function (cesiumProps) {
        cesiumProps.scene = this._cesiumService.getScene();
        return _super.prototype.add.call(this, cesiumProps);
    };
    HtmlDrawerService.decorators = [
        { type: Injectable },
    ];
    HtmlDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return HtmlDrawerService;
}(PrimitivesDrawerService));
export { HtmlDrawerService };
//# sourceMappingURL=html-drawer.service.js.map