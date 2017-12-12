import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { PointDrawerService } from '../../services/drawers/point-drawer/point-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcPointComponent extends EntityOnMapComponent {
    constructor(pointDrawer: PointDrawerService, mapLayers: MapLayersService);
}
