import { Vec2 } from '../../angular-cesium/models/vec2';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';
import { Observable } from 'rxjs/Observable';
import { CoordinateConverter } from '../../angular-cesium/services/coordinate-converter/coordinate-converter.service';
import { MapsManagerService } from '../../angular-cesium/services/maps-manager/maps-manager.service';
export interface IconDragEvent {
    initialScreenPosition: Vec2;
    screenPosition: Vec2;
    mapPosition: Cartesian3;
    drop: boolean;
}
export declare class DraggableToMapService {
    private document;
    private mapsManager;
    private coordinateConverter;
    private dragObservable;
    private stopper;
    private mainSubject;
    constructor(document: any, mapsManager: MapsManagerService);
    setCoordinateConverter(coordinateConverter: CoordinateConverter): void;
    drag(imageSrc: string, style?: any): void;
    dragUpdates(): Observable<IconDragEvent>;
    cancel(): void;
    private createDragObservable();
}
