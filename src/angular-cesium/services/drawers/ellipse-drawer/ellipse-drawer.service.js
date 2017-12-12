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
import { EntitiesDrawerService } from '../entities-drawer/entities-drawer.service';
import { CesiumService } from '../../cesium/cesium.service';
import { GraphicsType } from '../entities-drawer/enums/graphics-type.enum';
var EllipseDrawerService = (function (_super) {
    __extends(EllipseDrawerService, _super);
    function EllipseDrawerService(cesiumService) {
        return _super.call(this, cesiumService, GraphicsType.ellipse, {
            collectionsNumber: 100,
            collectionMaxSize: 100,
            collectionSuspensionTime: 100
        }) || this;
    }
    EllipseDrawerService.decorators = [
        { type: Injectable },
    ];
    EllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return EllipseDrawerService;
}(EntitiesDrawerService));
export { EllipseDrawerService };
//# sourceMappingURL=ellipse-drawer.service.js.map