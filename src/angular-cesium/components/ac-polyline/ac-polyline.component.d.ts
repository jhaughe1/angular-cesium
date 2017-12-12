import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
import { PolylineDrawerService } from '../../services/drawers/polyline-drawer/polyline-drawer.service';
export declare class AcPolylineComponent extends EntityOnMapComponent {
    constructor(polylineDrawer: PolylineDrawerService, mapLayers: MapLayersService);
}
