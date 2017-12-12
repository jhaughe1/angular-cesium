import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCesiumModule } from '../angular-cesium/angular-cesium.module';
import { PolygonsEditorComponent } from './components/polygons-editor/polygons-editor.component';
import { CirclesEditorComponent } from './components/circles-editor/circles-editor.component';
import { PolylinesEditorComponent } from './components/polylines-editor/polylines-editor.component';
import { HippodromeEditorComponent } from './components/hippodrome-editor/hippodrome-editor.component';
import { DraggableToMapDirective } from './directives/draggable-to-map.directive';
import { DraggableToMapService } from './services/draggable-to-map.service';
import { AcToolbarComponent } from './components/toolbar/ac-toolbar/ac-toolbar.component';
import { DragIconComponent } from './components/toolbar/ac-toolbar/drag-icon.component';
import { AcToolbarButtonComponent } from './components/toolbar/ac-toolbar-button/ac-toolbar-button.component';
var AngularCesiumWidgetsModule = (function () {
    function AngularCesiumWidgetsModule() {
    }
    AngularCesiumWidgetsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        AngularCesiumModule,
                    ],
                    declarations: [
                        HippodromeEditorComponent,
                        PolygonsEditorComponent,
                        CirclesEditorComponent,
                        PolylinesEditorComponent,
                        DraggableToMapDirective,
                        DragIconComponent,
                        AcToolbarComponent,
                        AcToolbarButtonComponent,
                    ],
                    exports: [
                        HippodromeEditorComponent,
                        PolygonsEditorComponent,
                        CirclesEditorComponent,
                        PolylinesEditorComponent,
                        DraggableToMapDirective,
                        AcToolbarComponent,
                        AcToolbarButtonComponent,
                    ],
                    providers: [
                        DraggableToMapService,
                    ]
                },] },
    ];
    AngularCesiumWidgetsModule.ctorParameters = function () { return []; };
    return AngularCesiumWidgetsModule;
}());
export { AngularCesiumWidgetsModule };
//# sourceMappingURL=angular-cesium-widgets.module.js.map