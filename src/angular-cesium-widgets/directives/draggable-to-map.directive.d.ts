import { ElementRef, OnInit } from '@angular/core';
import { DraggableToMapService } from '../services/draggable-to-map.service';
export declare class DraggableToMapDirective implements OnInit {
    private iconDragService;
    draggableToMap: {
        src: string;
        style?: any;
    } | string;
    private src;
    private style;
    constructor(el: ElementRef, iconDragService: DraggableToMapService);
    ngOnInit(): void;
    onMouseDown(): void;
}
