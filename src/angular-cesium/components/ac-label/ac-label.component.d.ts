import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { LabelDrawerService } from '../../services/drawers/label-drawer/label-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcLabelComponent extends EntityOnMapComponent {
    constructor(labelDrawer: LabelDrawerService, mapLayers: MapLayersService);
}
