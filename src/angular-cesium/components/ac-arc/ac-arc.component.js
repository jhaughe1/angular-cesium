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
import { Component, Input } from '@angular/core';
import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { ArcDrawerService } from '../../services/drawers/arc-drawer/arc-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
var AcArcComponent = (function (_super) {
    __extends(AcArcComponent, _super);
    function AcArcComponent(arcDrawer, mapLayers) {
        return _super.call(this, arcDrawer, mapLayers) || this;
    }
    AcArcComponent.prototype.updateOnMap = function () {
        if (this.selfPrimitiveIsDraw) {
            this.removeFromMap();
            this.drawOnMap();
        }
    };
    AcArcComponent.prototype.drawOnMap = function () {
        this.selfPrimitiveIsDraw = true;
        return this.selfPrimitive = this._drawer.add(this.geometryProps, this.instanceProps, this.primitiveProps);
    };
    AcArcComponent.prototype.ngOnChanges = function (changes) {
        var geometryProps = changes['geometryProps'];
        var instanceProps = changes['instanceProps'];
        var primitiveProps = changes['primitiveProps'];
        if (geometryProps.currentValue !== geometryProps.previousValue ||
            instanceProps.currentValue !== instanceProps.previousValue ||
            primitiveProps.currentValue !== primitiveProps.previousValue) {
            this.updateOnMap();
        }
    };
    AcArcComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-arc',
                    template: '',
                },] },
    ];
    AcArcComponent.ctorParameters = function () { return [
        { type: ArcDrawerService, },
        { type: MapLayersService, },
    ]; };
    AcArcComponent.propDecorators = {
        'geometryProps': [{ type: Input },],
        'instanceProps': [{ type: Input },],
        'primitiveProps': [{ type: Input },],
    };
    return AcArcComponent;
}(EntityOnMapComponent));
export { AcArcComponent };
//# sourceMappingURL=ac-arc.component.js.map