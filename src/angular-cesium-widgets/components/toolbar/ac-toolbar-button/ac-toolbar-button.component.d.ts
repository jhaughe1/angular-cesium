import { EventEmitter, OnInit } from '@angular/core';
export declare class AcToolbarButtonComponent implements OnInit {
    iconUrl: string;
    buttonClass: string;
    iconClass: string;
    onClick: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
}
