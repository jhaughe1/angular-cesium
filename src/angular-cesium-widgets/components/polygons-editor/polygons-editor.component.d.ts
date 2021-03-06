import { OnDestroy } from '@angular/core';
import { PolygonEditUpdate } from '../../models/polygon-edit-update';
import { AcNotification } from '../../../angular-cesium/models/ac-notification';
import { CoordinateConverter } from '../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { MapEventsManagerService } from '../../../angular-cesium/services/map-events-mananger/map-events-manager';
import { Subject } from 'rxjs/Subject';
import { CameraService } from '../../../angular-cesium/services/camera/camera.service';
import { EditPoint } from '../../models/edit-point';
import { PolygonsManagerService } from '../../services/entity-editors/polygons-editor/polygons-manager.service';
import { PolygonsEditorService } from '../../services/entity-editors/polygons-editor/polygons-editor.service';
import { LabelProps } from '../../models/label-props';
import { EditablePolygon } from '../../models/editable-polygon';
export declare class PolygonsEditorComponent implements OnDestroy {
    private polygonsEditor;
    private coordinateConverter;
    private mapEventsManager;
    private cameraService;
    private polygonsManager;
    private editLabelsRenderFn;
    Cesium: any;
    editPoints$: Subject<AcNotification>;
    editPolylines$: Subject<AcNotification>;
    editPolygons$: Subject<AcNotification>;
    appearance: any;
    attributes: {
        color: any;
    };
    polygonColor: any;
    lineColor: any;
    private editPolygonsLayer;
    private editPointsLayer;
    private editPolylinesLayer;
    constructor(polygonsEditor: PolygonsEditorService, coordinateConverter: CoordinateConverter, mapEventsManager: MapEventsManagerService, cameraService: CameraService, polygonsManager: PolygonsManagerService);
    private startListeningToEditorUpdates();
    getLabelId(element: any, index: number): string;
    renderEditLabels(polygon: EditablePolygon, update: PolygonEditUpdate, labels?: LabelProps[]): void;
    removeEditLabels(polygon: EditablePolygon): void;
    handleCreateUpdates(update: PolygonEditUpdate): void;
    handleEditUpdates(update: PolygonEditUpdate): void;
    ngOnDestroy(): void;
    getPointSize(point: EditPoint): number;
    getPointShow(point: EditPoint): boolean;
}
