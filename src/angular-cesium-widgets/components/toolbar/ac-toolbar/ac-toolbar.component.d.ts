import { ElementRef, OnDestroy, OnInit } from '@angular/core';
export declare class AcToolbarComponent implements OnInit, OnDestroy {
    private element;
    toolbarClass: string;
    allowDrag: boolean;
    dragStyle: {
        'height.px': number;
        'width.px': number;
    };
    private subscription;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
