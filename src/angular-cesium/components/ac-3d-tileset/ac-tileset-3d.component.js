import { Component, Input } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
import { Checker } from '../../utils/checker';
var AcTileset3dComponent = (function () {
    function AcTileset3dComponent(cesiumService) {
        this.cesiumService = cesiumService;
        this.options = {};
        this.show = true;
        this.tilesetInstance = null;
    }
    AcTileset3dComponent.prototype.ngOnInit = function () {
        if (!Checker.present(this.options.url)) {
            throw new Error('Options must have a url');
        }
        this._3dtilesCollection = new Cesium.PrimitiveCollection();
        this.cesiumService.getScene().primitives.add(this._3dtilesCollection);
        if (this.show) {
            this.tilesetInstance = this._3dtilesCollection.add(new Cesium.Cesium3DTileset(this.options), this.index);
            if (this.style) {
                this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
            }
        }
    };
    AcTileset3dComponent.prototype.ngOnChanges = function (changes) {
        if (changes['show'] && !changes['show'].isFirstChange()) {
            var showValue = changes['show'].currentValue;
            if (showValue) {
                if (this.tilesetInstance) {
                    this._3dtilesCollection.add(this.tilesetInstance, this.index);
                }
                else {
                    this.tilesetInstance = this._3dtilesCollection.add(new Cesium.Cesium3DTileset(this.options), this.index);
                    if (this.style) {
                        this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
                    }
                }
            }
            else if (this.tilesetInstance) {
                this._3dtilesCollection.remove(this.tilesetInstance, false);
            }
        }
        if (changes['style'] && !changes['style'].isFirstChange()) {
            var styleValue = changes['style'].currentValue;
            if (this.tilesetInstance) {
                this.tilesetInstance.style = new Cesium.Cesium3DTileStyle(this.style);
            }
        }
    };
    AcTileset3dComponent.prototype.ngOnDestroy = function () {
        if (this.tilesetInstance) {
            this._3dtilesCollection.remove(this.tilesetInstance, false);
        }
    };
    AcTileset3dComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-3d-tile-layer',
                    template: '',
                },] },
    ];
    AcTileset3dComponent.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    AcTileset3dComponent.propDecorators = {
        'options': [{ type: Input },],
        'index': [{ type: Input },],
        'show': [{ type: Input },],
        'style': [{ type: Input },],
    };
    return AcTileset3dComponent;
}());
export { AcTileset3dComponent };
//# sourceMappingURL=ac-tileset-3d.component.js.map