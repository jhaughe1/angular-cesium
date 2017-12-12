import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { BillboardDrawerService } from '../../services/drawers/billboard-drawer/billboard-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcBillboardComponent extends EntityOnMapComponent {
    constructor(billboardDrawer: BillboardDrawerService, mapLayers: MapLayersService);
}
