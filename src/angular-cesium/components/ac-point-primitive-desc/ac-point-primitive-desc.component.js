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
import { Component } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { PointPrimitiveDrawerService } from '../../services/drawers/point-primitive-drawer/point-primitive-drawer.service';
var AcPointPrimitiveDescComponent = (function (_super) {
    __extends(AcPointPrimitiveDescComponent, _super);
    function AcPointPrimitiveDescComponent(pointPrimitiveDrawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, pointPrimitiveDrawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcPointPrimitiveDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-point-primitive-desc',
                    template: '',
                },] },
    ];
    AcPointPrimitiveDescComponent.ctorParameters = function () { return [
        { type: PointPrimitiveDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcPointPrimitiveDescComponent;
}(BasicDesc));
export { AcPointPrimitiveDescComponent };
//# sourceMappingURL=ac-point-primitive-desc.component.js.map