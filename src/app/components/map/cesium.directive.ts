import { Directive, ElementRef } from '@angular/core';
import { Viewer } from 'cesium';

@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective {

  viewer: Viewer
  constructor(private el: ElementRef) { 
    this.viewer = new Cesium.Viewer(this.el.nativeElement);

  }


}
