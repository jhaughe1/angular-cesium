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
import { LabelDrawerService } from '../../services/drawers/label-drawer/label-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
var AcLabelComponent = (function (_super) {
    __extends(AcLabelComponent, _super);
    function AcLabelComponent(labelDrawer, mapLayers) {
        return _super.call(this, labelDrawer, mapLayers) || this;
    }
    AcLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-label',
                    template: '',
                },] },
    ];
    AcLabelComponent.ctorParameters = function () { return [
        { type: LabelDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcLabelComponent;
}(EntityOnMapComponent));
export { AcLabelComponent };
//# sourceMappingURL=ac-label.component.js.map