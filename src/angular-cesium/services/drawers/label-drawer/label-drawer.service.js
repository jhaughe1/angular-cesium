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
import { EntitiesDrawerService } from '../entities-drawer/entities-drawer.service';
import { GraphicsType } from '../entities-drawer/enums/graphics-type.enum';
var LabelDrawerService = (function (_super) {
    __extends(LabelDrawerService, _super);
    function LabelDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.label) || this;
    }
    LabelDrawerService.decorators = [
        { type: Injectable },
    ];
    LabelDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return LabelDrawerService;
}(EntitiesDrawerService));
export { LabelDrawerService };
//# sourceMappingURL=label-drawer.service.js.map