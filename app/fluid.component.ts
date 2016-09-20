import { Injectable } from '@angular/core';

@Injectable()
/**
 * A base class for @Components. Determines which Bootstrap 4 Container class
 * to use based on browser width.
 */
export class FluidComponent {
    /**
     * If document.body.clientWidth greater than 767px, value is 'container'
     * else less than 767px value is 'container-fluid' so it can take all horizontal space.
     * @type {String}
     */
    fluidClass = 'container';

    constructor(){
        console.log("[FluidComponent.constructor]");
        this._onResize();
    }

    _onResize(){
        console.log("[FluidComponent._onResize] document.body.clientWidth:", document.body.clientWidth);
        this.fluidClass = (document.body.clientWidth > 767 ? 'container' : 'container-fluid' );
    }
}
