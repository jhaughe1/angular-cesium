import { OnDestroy } from '@angular/core';
import { AcNotification } from '../../../angular-cesium/models/ac-notification';
import { CoordinateConverter } from '../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { MapEventsManagerService } from '../../../angular-cesium/services/map-events-mananger/map-events-manager';
import { Subject } from 'rxjs/Subject';
import { CameraService } from '../../../angular-cesium/services/camera/camera.service';
import { EditPoint } from '../../models/edit-point';
import { CirclesManagerService } from '../../services/entity-editors/circles-editor/circles-manager.service';
import { CirclesEditorService } from '../../services/entity-editors/circles-editor/circles-editor.service';
import { CircleEditUpdate } from '../../models/circle-edit-update';
import { LabelProps } from '../../models/label-props';
import { EditableCircle } from '../../models/editable-circle';
export declare class CirclesEditorComponent implements OnDestroy {
    private circlesEditor;
    private coordinateConverter;
    private mapEventsManager;
    private cameraService;
    private circlesManager;
    private editLabelsRenderFn;
    Cesium: any;
    editPoints$: Subject<AcNotification>;
    editCircles$: Subject<AcNotification>;
    editArcs$: Subject<AcNotification>;
    private editCirclesLayer;
    private editArcsLayer;
    private editPointsLayer;
    constructor(circlesEditor: CirclesEditorService, coordinateConverter: CoordinateConverter, mapEventsManager: MapEventsManagerService, cameraService: CameraService, circlesManager: CirclesManagerService);
    private startListeningToEditorUpdates();
    getLabelId(element: any, index: number): string;
    renderEditLabels(circle: EditableCircle, update: CircleEditUpdate, labels?: LabelProps[]): void;
    removeEditLabels(circle: EditableCircle): void;
    handleCreateUpdates(update: CircleEditUpdate): void;
    handleEditUpdates(update: CircleEditUpdate): void;
    ngOnDestroy(): void;
    getPointSize(point: EditPoint): number;
    getPointShow(point: EditPoint): boolean;
}