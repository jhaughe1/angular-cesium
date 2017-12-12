import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AcEntity } from '../../models/ac-entity';
import { CesiumEvent } from '../map-events-mananger/consts/cesium-event.enum';
import { CesiumEventModifier } from '../map-events-mananger/consts/cesium-event-modifier.enum';
import { MapsManagerService } from '../maps-manager/maps-manager.service';
import { Subject } from 'rxjs/Subject';
export interface SelectionOptions {
    event?: CesiumEvent;
    modifier?: CesiumEventModifier;
    entityType?: any;
}
export declare class SelectionManagerService {
    private mapsManager;
    selectedEntitiesItems$: BehaviorSubject<AcEntity[]>;
    selectedEntitySubject$: Subject<AcEntity>;
    private mapEventsManagerService;
    constructor(mapsManager: MapsManagerService);
    selectedEntities$(): Observable<AcEntity[]>;
    selectedEntities(): AcEntity[];
    selectedEntity$(): Subject<AcEntity>;
    toggleSelection(entity: AcEntity, addSelectedIndicator: boolean): void;
    private addToSelected(entity, addSelectedIndicator);
    private removeSelected(entity, addSelectedIndicator);
    initSelection(selectionOptions?: SelectionOptions, addSelectedIndicator?: boolean, eventPriority?: number, mapId?: string): void;
}
