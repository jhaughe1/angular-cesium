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
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
var AcEllipseComponent = (function (_super) {
    __extends(AcEllipseComponent, _super);
    function AcEllipseComponent(ellipseDrawer, mapLayers) {
        return _super.call(this, ellipseDrawer, mapLayers) || this;
    }
    AcEllipseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-ellipse',
                    template: '',
                },] },
    ];
    AcEllipseComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcEllipseComponent;
}(EntityOnMapComponent));
export { AcEllipseComponent };
//# sourceMappingURL=ac-ellipse.component.js.map