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
import { Injectable } from '@angular/core';
import { BasicDrawerService } from '../basic-drawer/basic-drawer.service';
import { CesiumService } from '../../cesium/cesium.service';
import { GraphicsType } from './enums/graphics-type.enum';
import { OptimizedEntityCollection } from './optimized-entity-collection';
var EntitiesDrawerService = (function (_super) {
    __extends(EntitiesDrawerService, _super);
    function EntitiesDrawerService(cesiumService, graphicsType, defaultOptions) {
        if (defaultOptions === void 0) { defaultOptions = {
            collectionMaxSize: -1,
            collectionSuspensionTime: -1,
            collectionsNumber: 1
        }; }
        var _this = _super.call(this) || this;
        _this.cesiumService = cesiumService;
        _this.graphicsType = graphicsType;
        _this.defaultOptions = defaultOptions;
        _this.entityCollections = new Map();
        _this.graphicsTypeName = GraphicsType[_this.graphicsType];
        return _this;
    }
    EntitiesDrawerService.prototype.getFreeEntitiesCollection = function () {
        var freeEntityCollection = null;
        this.entityCollections.forEach(function (entityCollection) {
            if (entityCollection.isFree()) {
                freeEntityCollection = entityCollection;
            }
        });
        return freeEntityCollection;
    };
    EntitiesDrawerService.prototype.init = function (options) {
        var finalOptions = options || this.defaultOptions;
        var dataSources = [];
        for (var i = 0; i < finalOptions.collectionsNumber; i++) {
            var dataSource = new Cesium.CustomDataSource();
            dataSources.push(dataSource);
            this.entityCollections.set(dataSource.entities, new OptimizedEntityCollection(dataSource.entities, finalOptions.collectionMaxSize, finalOptions.collectionSuspensionTime));
        }
        return dataSources;
    };
    EntitiesDrawerService.prototype.add = function (cesiumProps) {
        var optimizedEntityCollection = this.getFreeEntitiesCollection();
        if (optimizedEntityCollection === null) {
            throw new Error('No more free entity collections');
        }
        var graphicsClass = this.graphicsType;
        var entityObject = (_a = {
                position: cesiumProps.position !== undefined ? cesiumProps.position : undefined,
                description: cesiumProps.description !== undefined ? cesiumProps.description : undefined,
                orientation: cesiumProps.orientation !== undefined ? cesiumProps.orientation : undefined,
                viewFrom: cesiumProps.viewFrom !== undefined ? cesiumProps.viewFrom : undefined,
                availability: cesiumProps.availability !== undefined ? cesiumProps.availability : undefined
            },
            _a[this.graphicsTypeName] = cesiumProps,
            _a);
        if (cesiumProps.name !== undefined) {
            entityObject.name = cesiumProps.name;
        }
        return optimizedEntityCollection.add(entityObject);
        var _a;
    };
    EntitiesDrawerService.prototype.update = function (entity, cesiumProps) {
        this.suspendEntityCollection(entity);
        entity.position = cesiumProps.position !== undefined ? cesiumProps.position : undefined;
        entity.name = cesiumProps.name !== undefined ? cesiumProps.name : entity.name;
        entity.description = cesiumProps.description !== undefined ? cesiumProps.description : entity.description;
        entity.orientation = cesiumProps.orientation !== undefined ? cesiumProps.orientation : entity.orientation;
        entity.viewFrom = cesiumProps.viewFrom !== undefined ? cesiumProps.viewFrom : entity.viewFrom;
        entity.availability = cesiumProps.availability !== undefined ? cesiumProps.availability : undefined;
        if (this._propsAssigner) {
            this._propsAssigner(entity[this.graphicsTypeName], cesiumProps);
        }
        else {
            Object.assign(entity[this.graphicsTypeName], cesiumProps);
        }
    };
    EntitiesDrawerService.prototype.remove = function (entity) {
        var optimizedEntityCollection = this.entityCollections.get(entity.entityCollection);
        optimizedEntityCollection.remove(entity);
    };
    EntitiesDrawerService.prototype.removeAll = function () {
        this.entityCollections.forEach(function (entityCollection) {
            entityCollection.removeAll();
        });
    };
    EntitiesDrawerService.prototype.setShow = function (showValue) {
        this.entityCollections.forEach(function (entityCollection) {
            entityCollection.setShow(showValue);
        });
    };
    EntitiesDrawerService.prototype.suspendEntityCollection = function (entity) {
        var id = entity.entityCollection;
        if (!this.entityCollections.has(id)) {
            throw new Error('No EntityCollection for entity.entityCollection');
        }
        var entityCollection = this.entityCollections.get(id);
        entityCollection.suspend();
    };
    EntitiesDrawerService.decorators = [
        { type: Injectable },
    ];
    EntitiesDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: GraphicsType, },
        null,
    ]; };
    return EntitiesDrawerService;
}(BasicDrawerService));
export { EntitiesDrawerService };
//# sourceMappingURL=entities-drawer.service.js.map