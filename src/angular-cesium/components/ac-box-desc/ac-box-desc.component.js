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
import { Component, forwardRef } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BoxDrawerService } from '../../services/drawers/box-dawer/box-drawer.service';
var AcBoxDescComponent = (function (_super) {
    __extends(AcBoxDescComponent, _super);
    function AcBoxDescComponent(drawerService, layerService, computationCache, cesiumProperties) {
        return _super.call(this, drawerService, layerService, computationCache, cesiumProperties) || this;
    }
    AcBoxDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-box-desc',
                    template: '',
                    providers: [{ provide: BasicDesc, useExisting: forwardRef(function () { return AcBoxDescComponent; }) }],
                },] },
    ];
    AcBoxDescComponent.ctorParameters = function () { return [
        { type: BoxDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcBoxDescComponent;
}(BasicDesc));
export { AcBoxDescComponent };
//# sourceMappingURL=ac-box-desc.component.js.map