import { CesiumService } from '../cesium/cesium.service';
import { CesiumEventBuilder } from './cesium-event-builder';
import { EventRegistrationInput } from './event-registration-input';
import { DisposableObservable } from './disposable-observable';
import { PlonterService } from '../plonter/plonter.service';
export interface Movement {
    startPosition: {
        x: number;
        y: number;
    };
    endPosition: {
        x: number;
        y: number;
    };
    drop?: boolean;
}
export interface EventResult {
    movement: Movement;
    cesiumEntities: any[];
    entities: any[];
}
export declare class MapEventsManagerService {
    private cesiumService;
    private eventBuilder;
    private plonterService;
    private scene;
    private eventRegistrations;
    constructor(cesiumService: CesiumService, eventBuilder: CesiumEventBuilder, plonterService: PlonterService);
    init(): void;
    register(input: EventRegistrationInput): DisposableObservable<EventResult>;
    private disposeObservable(eventRegistration, eventName);
    private sortRegistrationsByPriority(eventName);
    private createEventRegistration(event, modifier, entityType, pickOption, priority);
    private createDragEvent(event, modifier, entityType, pickOption, priority);
    private triggerPick(movement, pickOptions);
    private addEntities(picksAndMovement, entityType, pickOption);
    private plonter(entitiesAndMovement, pickOption);
}
