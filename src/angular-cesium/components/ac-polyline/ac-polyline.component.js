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
import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
import { PolylineDrawerService } from '../../services/drawers/polyline-drawer/polyline-drawer.service';
var AcPolylineComponent = (function (_super) {
    __extends(AcPolylineComponent, _super);
    function AcPolylineComponent(polylineDrawer, mapLayers) {
        return _super.call(this, polylineDrawer, mapLayers) || this;
    }
    AcPolylineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-polyline',
                    template: '',
                },] },
    ];
    AcPolylineComponent.ctorParameters = function () { return [
        { type: PolylineDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPolylineComponent;
}(EntityOnMapComponent));
export { AcPolylineComponent };
//# sourceMappingURL=ac-polyline.component.js.map