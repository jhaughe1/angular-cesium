import { AcMapComponent } from '../../components/ac-map/ac-map.component';
export declare class MapsManagerService {
    private defaultIdCounter;
    private _Maps;
    private firstMap;
    constructor();
    getMap(id?: string): AcMapComponent;
    registerMap(id: string, acMap: AcMapComponent): void;
    private generateDefaultId();
}
