import { MapEventsManagerService } from '../../../../angular-cesium/services/map-events-mananger/map-events-manager';
import { Observable } from 'rxjs/Observable';
import { CoordinateConverter } from '../../../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { CameraService } from '../../../../angular-cesium/services/camera/camera.service';
import { Cartesian3 } from '../../../../angular-cesium/models/cartesian3';
import { PolylinesManagerService } from './polylines-manager.service';
import { PolylineEditOptions } from '../../../models/polyline-edit-options';
import { PolylineEditUpdate } from '../../../models/polyline-edit-update';
import { PolylineEditorObservable } from '../../../models/polyline-editor-observable';
export declare const DEFAULT_POLYLINE_OPTIONS: PolylineEditOptions;
export declare class PolylinesEditorService {
    private mapEventsManager;
    private updateSubject;
    private updatePublisher;
    private counter;
    private coordinateConverter;
    private cameraService;
    private polylinesManager;
    private observablesMap;
    init(mapEventsManager: MapEventsManagerService, coordinateConverter: CoordinateConverter, cameraService: CameraService, polylinesManager: PolylinesManagerService): void;
    onUpdate(): Observable<PolylineEditUpdate>;
    create(options?: PolylineEditOptions, eventPriority?: number): PolylineEditorObservable;
    edit(positions: Cartesian3[], options?: PolylineEditOptions, priority?: number): PolylineEditorObservable;
    private editPolyline(id, positions, priority, editSubject, options, editObservable?);
    private setOptions(options);
    private createEditorObservable(observableToExtend, id);
    private generteId();
    private getPositions(id);
    private getPoints(id);
}