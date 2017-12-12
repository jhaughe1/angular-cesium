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
import { BasicDrawerService } from '../basic-drawer/basic-drawer.service';
var PrimitivesDrawerService = (function (_super) {
    __extends(PrimitivesDrawerService, _super);
    function PrimitivesDrawerService(drawerType, cesiumService) {
        var _this = _super.call(this) || this;
        _this.drawerType = drawerType;
        _this.cesiumService = cesiumService;
        _this._show = true;
        return _this;
    }
    PrimitivesDrawerService.prototype.init = function () {
        this._cesiumCollection = new this.drawerType();
        this._primitiveCollectionWrap = new Cesium.PrimitiveCollection();
        this._primitiveCollectionWrap.add(this._cesiumCollection);
        this.cesiumService.getScene().primitives.add(this._primitiveCollectionWrap);
    };
    PrimitivesDrawerService.prototype.add = function (cesiumProps) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._cesiumCollection.add(cesiumProps);
    };
    PrimitivesDrawerService.prototype.update = function (entity, cesiumProps) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (this._propsAssigner) {
            this._propsAssigner(entity, cesiumProps);
        }
        else {
            Object.assign(entity, cesiumProps);
        }
    };
    PrimitivesDrawerService.prototype.remove = function (entity) {
        this._cesiumCollection.remove(entity);
    };
    PrimitivesDrawerService.prototype.removeAll = function () {
        this._cesiumCollection.removeAll();
    };
    PrimitivesDrawerService.prototype.setShow = function (showValue) {
        this._show = showValue;
        this._primitiveCollectionWrap.show = showValue;
    };
    PrimitivesDrawerService.prototype.getShow = function () {
        return this._show;
    };
    return PrimitivesDrawerService;
}(BasicDrawerService));
export { PrimitivesDrawerService };
//# sourceMappingURL=primitives-drawer.service.js.map