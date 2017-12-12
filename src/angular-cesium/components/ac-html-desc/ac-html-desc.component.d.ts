import { OnInit, TemplateRef } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { HtmlDrawerService } from '../../services/drawers/html-drawer/html-drawer.service';
import { AcHtmlDirective } from '../../directives/ac-html/ac-html.directive';
export declare class AcHtmlDescComponent extends BasicDesc implements OnInit {
    acHtmlCreator: AcHtmlDirective;
    acHtmlTemplate: TemplateRef<any>;
    constructor(htmlDrawer: HtmlDrawerService, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
    ngOnInit(): void;
    draw(context: any, id: any): any;
    remove(id: string): void;
    removeAll(): void;
}
