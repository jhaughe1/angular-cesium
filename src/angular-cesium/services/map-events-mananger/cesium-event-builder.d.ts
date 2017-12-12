import { CesiumService } from '../cesium/cesium.service';
import { CesiumEvent } from './consts/cesium-event.enum';
import { CesiumEventModifier } from './consts/cesium-event-modifier.enum';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
export declare class CesiumEventBuilder {
    private cesiumService;
    static longPressEvents: Set<CesiumEvent>;
    static getEventFullName(event: CesiumEvent, modifier?: CesiumEventModifier): string;
    private eventsHandler;
    private cesiumEventsObservables;
    constructor(cesiumService: CesiumService);
    init(): void;
    get(event: CesiumEvent, modifier?: CesiumEventModifier): ConnectableObservable<any>;
    private createCesiumEventObservable(event, modifier?);
    private createSpecialCesiumEventObservable(event, modifier);
}
