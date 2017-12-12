import { PolygonDrawerService } from '../../services/drawers/polygon-drawer/polygon-drawer.service';
import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcPolygonComponent extends EntityOnMapComponent {
    constructor(polygonDrawer: PolygonDrawerService, mapLayers: MapLayersService);
}
