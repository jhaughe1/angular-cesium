import { ActionType } from './action-type.enum';
import { AcEntity } from './ac-entity';
export interface AcNotification {
    id: string;
    entity?: AcEntity;
    actionType: ActionType;
}
export declare class AcNotification {
    id: string;
    entity?: AcEntity;
    actionType: ActionType;
}
