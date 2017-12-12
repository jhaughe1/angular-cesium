import { EventEmitter, Input, Output } from '@angular/core';
var BasicDesc = (function () {
    function BasicDesc(_drawer, _layerService, _computationCache, _cesiumProperties) {
        this._drawer = _drawer;
        this._layerService = _layerService;
        this._computationCache = _computationCache;
        this._cesiumProperties = _cesiumProperties;
        this.onDraw = new EventEmitter();
        this.onRemove = new EventEmitter();
        this._cesiumObjectsMap = new Map();
    }
    BasicDesc.prototype._propsEvaluator = function (context) {
        return this._propsEvaluateFn(this._computationCache, context);
    };
    BasicDesc.prototype._getPropsAssigner = function () {
        var _this = this;
        return function (cesiumObject, desc) { return _this._propsAssignerFn(cesiumObject, desc); };
    };
    BasicDesc.prototype.getLayerService = function () {
        return this._layerService;
    };
    BasicDesc.prototype.setLayerService = function (layerService) {
        this._layerService.unregisterDescription(this);
        this._layerService = layerService;
        this._layerService.registerDescription(this);
        this._propsEvaluateFn = this._cesiumProperties.createEvaluator(this.props, this._layerService.cache, true);
        this._propsAssignerFn = this._cesiumProperties.createAssigner(this.props);
    };
    BasicDesc.prototype.ngOnInit = function () {
        if (!this.props) {
            console.error('ac-desc components error: [props] input is mandatory');
        }
        this._layerService.registerDescription(this);
        this._propsEvaluateFn = this._cesiumProperties.createEvaluator(this.props, this._layerService.cache);
        this._propsAssignerFn = this._cesiumProperties.createAssigner(this.props);
    };
    BasicDesc.prototype.getCesiumObjectsMap = function () {
        return this._cesiumObjectsMap;
    };
    BasicDesc.prototype.draw = function (context, id, entity) {
        var cesiumProps = this._propsEvaluator(context);
        if (!this._cesiumObjectsMap.has(id)) {
            var cesiumObject = this._drawer.add(cesiumProps);
            this.onDraw.emit({
                acEntity: entity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            cesiumObject.acEntity = entity;
            this._cesiumObjectsMap.set(id, cesiumObject);
        }
        else {
            var cesiumObject = this._cesiumObjectsMap.get(id);
            this.onDraw.emit({
                acEntity: entity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            cesiumObject.acEntity = entity;
            this._drawer.setPropsAssigner(this._getPropsAssigner());
            this._drawer.update(cesiumObject, cesiumProps);
        }
    };
    BasicDesc.prototype.remove = function (id) {
        var cesiumObject = this._cesiumObjectsMap.get(id);
        if (cesiumObject) {
            this.onRemove.emit({
                acEntity: cesiumObject.acEntity,
                cesiumEntity: cesiumObject,
                entityId: id,
            });
            this._drawer.remove(cesiumObject);
            this._cesiumObjectsMap.delete(id);
        }
    };
    BasicDesc.prototype.removeAll = function () {
        this._cesiumObjectsMap.clear();
        this._drawer.removeAll();
    };
    BasicDesc.prototype.ngOnDestroy = function () {
        this._layerService.unregisterDescription(this);
        this.removeAll();
    };
    BasicDesc.propDecorators = {
        'props': [{ type: Input },],
        'onDraw': [{ type: Output },],
        'onRemove': [{ type: Output },],
    };
    return BasicDesc;
}());
export { BasicDesc };
//# sourceMappingURL=basic-desc.service.js.map