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
import { PolygonDrawerService } from '../../services/drawers/polygon-drawer/polygon-drawer.service';
import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
var AcPolygonComponent = (function (_super) {
    __extends(AcPolygonComponent, _super);
    function AcPolygonComponent(polygonDrawer, mapLayers) {
        return _super.call(this, polygonDrawer, mapLayers) || this;
    }
    AcPolygonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-polygon',
                    template: '',
                },] },
    ];
    AcPolygonComponent.ctorParameters = function () { return [
        { type: PolygonDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcPolygonComponent;
}(EntityOnMapComponent));
export { AcPolygonComponent };
//# sourceMappingURL=ac-polygon.component.js.map