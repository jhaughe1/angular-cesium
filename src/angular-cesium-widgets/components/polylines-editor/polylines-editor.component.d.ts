import { OnDestroy } from '@angular/core';
import { AcNotification } from '../../../angular-cesium/models/ac-notification';
import { CoordinateConverter } from '../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { MapEventsManagerService } from '../../../angular-cesium/services/map-events-mananger/map-events-manager';
import { Subject } from 'rxjs/Subject';
import { CameraService } from '../../../angular-cesium/services/camera/camera.service';
import { EditPoint } from '../../models/edit-point';
import { PolylinesEditorService } from '../../services/entity-editors/polyline-editor/polylines-editor.service';
import { PolylinesManagerService } from '../../services/entity-editors/polyline-editor/polylines-manager.service';
import { PolylineEditUpdate } from '../../models/polyline-edit-update';
import { EditablePolyline } from '../../models/editable-polyline';
import { LabelProps } from '../../models/label-props';
export declare class PolylinesEditorComponent implements OnDestroy {
    private polylinesEditor;
    private coordinateConverter;
    private mapEventsManager;
    private cameraService;
    private polylinesManager;
    private editLabelsRenderFn;
    Cesium: any;
    editPoints$: Subject<AcNotification>;
    editPolylines$: Subject<AcNotification>;
    polylineLabels$: Subject<AcNotification>;
    private editPointsLayer;
    private editPolylinesLayer;
    private polylineLabelsLayer;
    constructor(polylinesEditor: PolylinesEditorService, coordinateConverter: CoordinateConverter, mapEventsManager: MapEventsManagerService, cameraService: CameraService, polylinesManager: PolylinesManagerService);
    private startListeningToEditorUpdates();
    getLabelId(element: any, index: number): string;
    renderEditLabels(polyline: EditablePolyline, update: PolylineEditUpdate, labels?: LabelProps[]): void;
    removeEditLabels(polyline: EditablePolyline): void;
    handleCreateUpdates(update: PolylineEditUpdate): void;
    handleEditUpdates(update: PolylineEditUpdate): void;
    ngOnDestroy(): void;
    getPointSize(point: EditPoint): number;
    getPointShow(point: EditPoint): boolean;
}