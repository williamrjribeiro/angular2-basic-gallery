import { Injectable } from '@angular/core';

@Injectable()
export class FluidComponent {
    fluidClass = 'container';

    constructor(){
        console.log("[FluidComponent.constructor]");
        this.onResize();
    }

    private onResize(){
        console.log("[FluidComponent._onResize] document.body.clientWidth:", document.body.clientWidth);
        if( document.body.clientWidth > 768 )
            this.fluidClass = 'container';
        else
            this.fluidClass = 'container-fluid';
    }
}
