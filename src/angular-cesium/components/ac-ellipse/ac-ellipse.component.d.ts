import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcEllipseComponent extends EntityOnMapComponent {
    constructor(ellipseDrawer: EllipseDrawerService, mapLayers: MapLayersService);
}
