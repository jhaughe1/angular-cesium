import { BillboardDrawerService } from '../../services/drawers/billboard-drawer/billboard-drawer.service';
import { AfterContentInit, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { AcNotification } from '../../models/ac-notification';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { LabelDrawerService } from '../../services/drawers/label-drawer/label-drawer.service';
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';
import { PolylineDrawerService } from '../../services/drawers/polyline-drawer/polyline-drawer.service';
import { ArcDrawerService } from '../../services/drawers/arc-drawer/arc-drawer.service';
import { PointDrawerService } from '../../services/drawers/point-drawer/point-drawer.service';
import { AcEntity } from '../../models/ac-entity';
import { PolygonDrawerService } from '../../services/drawers/polygon-drawer/polygon-drawer.service';
import { LayerOptions } from '../../models/layer-options';
import { DynamicEllipseDrawerService } from '../../services/drawers/static-dynamic/ellipse-drawer/dynamic-ellipse-drawer.service';
import { DynamicPolylineDrawerService } from '../../services/drawers/static-dynamic/dynamic-polyline-drawer/dynamic-polyline-drawer.service';
import { StaticCircleDrawerService } from '../../services/drawers/static-dynamic/static-circle-drawer/static-circle-drawer.service';
import { StaticPolylineDrawerService } from '../../services/drawers/static-dynamic/static-polyline-drawer/static-polyline-drawer.service';
import { StaticPolygonDrawerService } from '../../services/drawers/static-dynamic/static-polygon-drawer/polygon-drawer.service';
import { StaticEllipseDrawerService } from '../../services/drawers/static-dynamic/ellipse-drawer/ellipse-drawer.service';
import { ModelDrawerService } from '../../services/drawers/model-drawer/model-drawer.service';
import { BoxDrawerService } from '../../services/drawers/box-dawer/box-drawer.service';
import { CorridorDrawerService } from '../../services/drawers/corridor-dawer/corridor-drawer.service';
import { CylinderDrawerService } from '../../services/drawers/cylinder-dawer/cylinder-drawer.service';
import { EllipsoidDrawerService } from '../../services/drawers/ellipoid-drawer/ellipsoid-drawer.service';
import { PolylineVolumeDrawerService } from '../../services/drawers/polyline-volume-dawer/polyline-volume-drawer.service';
import { WallDrawerService } from '../../services/drawers/wall-dawer/wall-drawer.service';
import { RectangleDrawerService } from '../../services/drawers/rectangle-dawer/rectangle-drawer.service';
import { PolylinePrimitiveDrawerService } from '../../services/drawers/polyline-primitive-drawer/polyline-primitive-drawer.service';
import { LabelPrimitiveDrawerService } from '../../services/drawers/label-primitive-drawer/label-primitive-drawer.service';
import { BillboardPrimitiveDrawerService } from '../../services/drawers/billboard-primitive-drawer/billboard-primitive-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
import { PointPrimitiveDrawerService } from '../../services/drawers/point-primitive-drawer/point-primitive-drawer.service';
import { HtmlDrawerService } from '../../services/drawers/html-drawer/html-drawer.service';
export declare class AcLayerComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
    private layerService;
    private _computationCache;
    private mapLayersService;
    show: boolean;
    acFor: string;
    context: any;
    store: boolean;
    options: LayerOptions;
    zIndex: number;
    private readonly acForRgx;
    private entityName;
    private stopObservable;
    private observable;
    private _drawerList;
    private _updateStream;
    private entitiesStore;
    private layerDrawerDataSources;
    constructor(layerService: LayerService, _computationCache: ComputationCache, mapLayersService: MapLayersService, billboardDrawerService: BillboardDrawerService, labelDrawerService: LabelDrawerService, ellipseDrawerService: EllipseDrawerService, polylineDrawerService: PolylineDrawerService, polygonDrawerService: PolygonDrawerService, arcDrawerService: ArcDrawerService, pointDrawerService: PointDrawerService, modelDrawerService: ModelDrawerService, boxDrawerService: BoxDrawerService, corridorDrawerService: CorridorDrawerService, cylinderDrawerService: CylinderDrawerService, ellipsoidDrawerSerice: EllipsoidDrawerService, polylineVolumeDrawerService: PolylineVolumeDrawerService, wallDrawerService: WallDrawerService, rectangleDrawerService: RectangleDrawerService, dynamicEllipseDrawerService: DynamicEllipseDrawerService, dynamicPolylineDrawerService: DynamicPolylineDrawerService, staticCircleDrawerService: StaticCircleDrawerService, staticPolylineDrawerService: StaticPolylineDrawerService, staticPolygonDrawerService: StaticPolygonDrawerService, staticEllipseDrawerService: StaticEllipseDrawerService, polylinePrimitiveDrawerService: PolylinePrimitiveDrawerService, labelPrimitiveDrawerService: LabelPrimitiveDrawerService, billboardPrimitiveDrawerService: BillboardPrimitiveDrawerService, pointPrimitiveDrawerService: PointPrimitiveDrawerService, htmlDrawerService: HtmlDrawerService);
    init(): void;
    private updateStore(notification);
    private initValidParams();
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    getLayerService(): LayerService;
    getStore(): Map<string, any>;
    removeAll(): void;
    remove(entityId: string): void;
    updateNotification(notification: AcNotification): void;
    update(entity: AcEntity, id: string): void;
    refreshAll(collection: AcNotification[]): void;
}
