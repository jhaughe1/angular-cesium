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
var AcCircleComponent = (function (_super) {
    __extends(AcCircleComponent, _super);
    function AcCircleComponent(ellipseDrawerService, mapLayers) {
        return _super.call(this, ellipseDrawerService, mapLayers) || this;
    }
    AcCircleComponent.prototype.updateEllipseProps = function () {
        this.props.semiMajorAxis = this.props.radius;
        this.props.semiMinorAxis = this.props.radius;
        this.props.rotation = 0.0;
    };
    AcCircleComponent.prototype.drawOnMap = function () {
        this.updateEllipseProps();
        _super.prototype.drawOnMap.call(this);
    };
    AcCircleComponent.prototype.updateOnMap = function () {
        this.updateEllipseProps();
        _super.prototype.updateOnMap.call(this);
    };
    AcCircleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-circle',
                    template: '',
                },] },
    ];
    AcCircleComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: MapLayersService, },
    ]; };
    return AcCircleComponent;
}(EntityOnMapComponent));
export { AcCircleComponent };
//# sourceMappingURL=ac-circle.component.js.map