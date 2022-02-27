import { Component, ElementRef, OnInit } from '@angular/core';
import { Viewer } from 'cesium';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {

  constructor(private el:ElementRef) {


  }

  ngOnInit(): void {
    console.log();
  }
}
