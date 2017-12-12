import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
import { BillboardDrawerService } from '../../services/drawers/billboard-drawer/billboard-drawer.service';
import { MapEventsManagerService } from '../../services/map-events-mananger/map-events-manager';
import { LabelDrawerService } from '../../services/drawers/label-drawer/label-drawer.service';
import { PolylineDrawerService } from '../../services/drawers/polyline-drawer/polyline-drawer.service';
import { PointDrawerService } from '../../services/drawers/point-drawer/point-drawer.service';
import { ArcDrawerService } from '../../services/drawers/arc-drawer/arc-drawer.service';
import { MapsManagerService } from '../../services/maps-manager/maps-manager.service';
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';
import { PolygonDrawerService } from '../../services/drawers/polygon-drawer/polygon-drawer.service';
import { KeyboardControlService } from '../../services/keyboard-control/keyboard-control.service';
import { CameraService } from '../../services/camera/camera.service';
import { SceneMode } from '../../models/scene-mode.enum';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
import { ConfigurationService } from '../../cesium-enhancements/ConfigurationService';
import { ScreenshotService } from '../../services/screenshot/screenshot.service';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { CoordinateConverter } from '../../services/coordinate-converter/coordinate-converter.service';
export declare class AcMapComponent implements OnChanges, OnInit, AfterViewInit {
    private _cesiumService;
    private _cameraService;
    private _elemRef;
    private document;
    private mapsManagerService;
    private billboardDrawerService;
    private labelDrawerService;
    private ellipseDrawerService;
    private polylineDrawerService;
    private polygonDrawerService;
    private arcDrawerService;
    private pointDrawerService;
    private mapEventsManager;
    private keyboardControlService;
    private mapLayersService;
    private configurationService;
    private screenshotService;
    contextMenuService: ContextMenuService;
    private coordinateConverter;
    disableDefaultPlonter: boolean;
    id: string;
    flyTo: any;
    sceneMode: SceneMode;
    private mapContainer;
    constructor(_cesiumService: CesiumService, _cameraService: CameraService, _elemRef: ElementRef, document: any, mapsManagerService: MapsManagerService, billboardDrawerService: BillboardDrawerService, labelDrawerService: LabelDrawerService, ellipseDrawerService: EllipseDrawerService, polylineDrawerService: PolylineDrawerService, polygonDrawerService: PolygonDrawerService, arcDrawerService: ArcDrawerService, pointDrawerService: PointDrawerService, mapEventsManager: MapEventsManagerService, keyboardControlService: KeyboardControlService, mapLayersService: MapLayersService, configurationService: ConfigurationService, screenshotService: ScreenshotService, contextMenuService: ContextMenuService, coordinateConverter: CoordinateConverter);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    getCesiumSerivce(): CesiumService;
    getCesiumViewer(): any;
    getCameraService(): CameraService;
    getId(): string;
    getMapEventsManager(): MapEventsManagerService;
    getContextMenuService(): ContextMenuService;
    getScreenshotService(): ScreenshotService;
    getKeyboardControlService(): KeyboardControlService;
    getCoordinateConverter(): CoordinateConverter;
}
