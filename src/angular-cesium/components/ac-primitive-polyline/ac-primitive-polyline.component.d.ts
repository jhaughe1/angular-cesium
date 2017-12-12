import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
import { PolylinePrimitiveDrawerService } from '../../services/drawers/polyline-primitive-drawer/polyline-primitive-drawer.service';
export declare class AcPrimitivePolylineComponent extends EntityOnMapComponent {
    constructor(polylineDrawer: PolylinePrimitiveDrawerService, mapLayers: MapLayersService);
}
