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
import { PrimitivesDrawerService } from '../../primitives-drawer/primitives-drawer.service';
var StaticPrimitiveDrawer = (function (_super) {
    __extends(StaticPrimitiveDrawer, _super);
    function StaticPrimitiveDrawer(geometryType, cesiumService) {
        var _this = _super.call(this, Cesium.PrimitiveCollection, cesiumService) || this;
        _this.geometryType = geometryType;
        return _this;
    }
    StaticPrimitiveDrawer.prototype.add = function (geometryProps, instanceProps, primitiveProps) {
        instanceProps.geometry = new this.geometryType(geometryProps);
        primitiveProps.geometryInstances = new Cesium.GeometryInstance(instanceProps);
        primitiveProps.asynchronous = false;
        var primitive = new Cesium.Primitive(primitiveProps);
        return _super.prototype.add.call(this, primitive);
    };
    StaticPrimitiveDrawer.prototype.update = function (primitive, geometryProps, instanceProps, primitiveProps) {
        instanceProps.geometry = new this.geometryType(geometryProps);
        primitiveProps.geometryInstances = new Cesium.GeometryInstance(instanceProps);
        this._cesiumCollection.remove(primitive);
        return _super.prototype.add.call(this, new Cesium.Primitive(primitiveProps));
    };
    return StaticPrimitiveDrawer;
}(PrimitivesDrawerService));
export { StaticPrimitiveDrawer };
//# sourceMappingURL=static-primitive-drawer.service.js.map