import { ChangeDetectorRef, Component, ContentChildren, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _get from 'lodash.get';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
var AcArrayDescComponent = (function () {
    function AcArrayDescComponent(layerService, cd) {
        this.layerService = layerService;
        this.cd = cd;
        this.show = true;
        this.entitiesMap = new Map();
        this.id = 0;
        this.acForRgx = /^let\s+.+\s+of\s+.+$/;
        this.arrayObservable$ = new Subject();
    }
    AcArrayDescComponent.prototype.ngOnChanges = function (changes) {
        if (changes['acFor'].firstChange) {
            var acForString = changes['acFor'].currentValue;
            if (!this.acForRgx.test(acForString)) {
                throw new Error("ac-layer: Invalid [acFor] syntax. Expected: [acFor]=\"let item of observable\" .Instead received: " + acForString);
            }
            var acForArr = changes['acFor'].currentValue.split(' ');
            this.arrayPath = acForArr[3];
            this.entityName = acForArr[1];
        }
    };
    AcArrayDescComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layer.getLayerService().cache = false;
        this.layerServiceSubscription = this.layerService.layerUpdates().subscribe(function () {
            _this.cd.detectChanges();
        });
    };
    AcArrayDescComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.layerService.context['arrayObservable$'] = this.arrayObservable$;
        this.layerService.registerDescription(this);
        this.basicDescs._results.forEach(function (component) {
            component.setLayerService(_this.layer.getLayerService());
        });
        this.arrayDescs._results.splice(0, 1);
        this.arrayDescs._results.forEach(function (component) {
            _this.layerService.unregisterDescription(component);
            _this.layer.getLayerService().registerDescription(component);
            component.layerService = _this.layer.getLayerService();
            component.setLayerService(_this.layer.getLayerService());
        });
    };
    AcArrayDescComponent.prototype.ngOnDestroy = function () {
        if (this.layerServiceSubscription) {
            this.layerServiceSubscription.unsubscribe();
        }
    };
    AcArrayDescComponent.prototype.setLayerService = function (layerService) {
        this.layerService = layerService;
    };
    AcArrayDescComponent.prototype.draw = function (context, id, contextEntity) {
        var _this = this;
        var get = _get;
        var entitiesArray = get(context, this.arrayPath);
        if (!entitiesArray) {
            return;
        }
        var previousEntitiesIdArray = this.entitiesMap.get(id);
        var entitiesIdArray = [];
        this.entitiesMap.set(id, entitiesIdArray);
        entitiesArray.forEach(function (item, index) {
            _this.layerService.context[_this.entityName] = item;
            var arrayItemId = _this.generateCombinedId(id, item, index);
            entitiesIdArray.push(arrayItemId);
            _this.layer.update(contextEntity, arrayItemId);
        });
        if (previousEntitiesIdArray) {
            var entitiesToRemove = this.idGetter ?
                previousEntitiesIdArray.filter(function (entityId) { return entitiesIdArray.indexOf(entityId) < 0; }) :
                previousEntitiesIdArray;
            if (entitiesToRemove) {
                entitiesToRemove.forEach(function (entityId) { return _this.layer.remove(entityId); });
            }
        }
    };
    AcArrayDescComponent.prototype.remove = function (id) {
        var _this = this;
        var entitiesIdArray = this.entitiesMap.get(id);
        if (entitiesIdArray) {
            entitiesIdArray.forEach(function (entityId) { return _this.layer.remove(entityId); });
        }
        this.entitiesMap.delete(id);
    };
    AcArrayDescComponent.prototype.removeAll = function () {
        this.layer.removeAll();
        this.entitiesMap.clear();
    };
    AcArrayDescComponent.prototype.getAcForString = function () {
        return "let " + (this.entityName + '___temp') + " of arrayObservable$";
    };
    AcArrayDescComponent.prototype.generateCombinedId = function (entityId, arrayItem, index) {
        var arrayItemId;
        if (this.idGetter) {
            arrayItemId = this.idGetter(arrayItem, index);
        }
        else {
            arrayItemId = (this.id++) % Number.MAX_SAFE_INTEGER;
        }
        return entityId + arrayItemId;
    };
    AcArrayDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-array-desc',
                    template: "\n      <ac-layer #layer [acFor]=\"getAcForString()\"\n                [context]=\"layerService.context\"\n                [options]=\"layerService.options\"\n                [show]=\"layerService.show && show\"\n                [zIndex]=\"layerService.zIndex\">\n          <ng-content #content></ng-content>\n      </ac-layer>\n  ",
                },] },
    ];
    AcArrayDescComponent.ctorParameters = function () { return [
        { type: LayerService, },
        { type: ChangeDetectorRef, },
    ]; };
    AcArrayDescComponent.propDecorators = {
        'acFor': [{ type: Input },],
        'idGetter': [{ type: Input },],
        'show': [{ type: Input },],
        'layer': [{ type: ViewChild, args: ['layer',] },],
        'basicDescs': [{ type: ContentChildren, args: [BasicDesc, { descendants: false },] },],
        'arrayDescs': [{ type: ContentChildren, args: [AcArrayDescComponent, { descendants: false },] },],
    };
    return AcArrayDescComponent;
}());
export { AcArrayDescComponent };
//# sourceMappingURL=ac-array-desc.component.js.map