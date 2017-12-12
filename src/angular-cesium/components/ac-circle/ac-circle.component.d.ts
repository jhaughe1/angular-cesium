import { EntityOnMapComponent } from '../../services/entity-on-map/entity-on-map.component';
import { EllipseDrawerService } from '../../services/drawers/ellipse-drawer/ellipse-drawer.service';
import { MapLayersService } from '../../services/map-layers/map-layers.service';
export declare class AcCircleComponent extends EntityOnMapComponent {
    constructor(ellipseDrawerService: EllipseDrawerService, mapLayers: MapLayersService);
    private updateEllipseProps();
    drawOnMap(): void;
    updateOnMap(): void;
}
