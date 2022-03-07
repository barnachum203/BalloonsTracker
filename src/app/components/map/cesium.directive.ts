import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { CallbackProperty, Cartesian3, Color, JulianDate, PolygonGraphics, PolygonHierarchy, Viewer } from 'cesium';
import * as Cesium from 'cesium';
import { Subscription } from 'rxjs';

import { Ballon } from 'src/app/Model/Ballon';
import * as MapSelectors from '../menu/store/map.selectors';

@Directive({
  selector: '[appCesium]',
})
export class CesiumDirective implements OnInit, OnDestroy {
  /**
   * Lat = Y Long = X
   */
  viewer: Cesium.Viewer;

  subsctiptions: Subscription[] = [];
  ballons$ = this.store.select(MapSelectors.selectMapBallons);
  ballons: Ballon[] | undefined;
  activeBallon$ = this.store.select(MapSelectors.selectActiveBallon);

  constructor(private el: ElementRef, private store: Store) {
    this.viewer = new Cesium.Viewer(this.el.nativeElement, {
      shouldAnimate: true,
    });
    this.viewer.entities.collectionChanged.addEventListener(this.onChanged);

    //Make ballons from ngrx ballons data
    this.ballonCircleMake();

    //Init camera to israel
    this.setViewToIsrael();

    //Focus on selected ballon
    this.subsctiptions.push(
      this.activeBallon$.subscribe((ballon) => {
        ballon ? this.flyTo(ballon) : this.setViewToIsrael();
      })
    );
  }
  //Set view on israel 
  private setViewToIsrael() {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(33, 31.0, 700000.0),
      easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
      duration: 2,
    });
  }

  ngOnDestroy(): void {
    this.subsctiptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit(): void {}

  //Get data from NgRx ballons array and create entities
  // TODO: should render the list and not rebuild it.
  async ballonCircleMake() {
    await this.subsctiptions.push(
      this.ballons$.subscribe((data) => {
        console.log(data);
        this.ballons = data;
        this.viewer.entities.removeAll();
        data?.forEach((e: Ballon) => {
          this.viewer.entities.add(this.createEntity(e));
        });
      })
    );
    console.log(this.viewer.entities);
  }

  // An Event listener example of Data Chagned
  onChanged(
    collection: Cesium.EntityCollection,
    added: string | any[],
    removed: any,
    changed: any
  ) {
    var msg = 'Added ids';
    for (var i = 0; i < added.length; i++) {
      msg += '\n' + added[i].id;
    }
    console.log(msg);
  }

  onClick() {}

  //Create entity from given Ballon object
  createEntity(ballon: Ballon) {
    var polygon = new Cesium.PolygonGraphics(); // test
    var color = new Cesium.Color(56263); // TODO: get color from ballon (get the Hex number)
    let entity: Cesium.Entity = new Cesium.Entity({
      position: Cesium.Cartesian3.fromDegrees(
        ballon.position.longitude,
        ballon.position.latitude,
        ballon.position.attitude
      ),
      name: ballon.name,
      ellipsoid: {
        radii: new Cesium.Cartesian3(25000.0, 25000.0, 25000.0),
        material: Cesium.Color.RED.withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
    });
    entity.polygon = polygon;// test
    console.log(entity);

    return entity;
  }

  //TODO: need to set listener for triggering the function(?)
  pickEntity(viewer: Cesium.Viewer, windowPosition: any) {
    console.log('inside pickEntity');

    var picked = viewer.scene.pick(windowPosition);
    if (picked) {
      var id = Cesium.defaultValue(picked.id, picked.primitive.id);
      if (id instanceof Cesium.Entity) {
        return id;
      }
    }
    return undefined;
  }

  //Use this function to navigate to specefic ballon
  flyTo(ballon: Ballon) {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        ballon.position.longitude,
        ballon.position.latitude,
        ballon.position.latitude + 80000
      ),
      // orientation: {
      //   heading: 0.5,
      //   pitch: -80,
      // },
      // orientation : {
      //     direction : new Cesium.Cartesian3(0.3760550186878076, 0.9007147395506565, 0.21747547189489164),
      //     up : new Cesium.Cartesian3(-0.20364591529594356, -0.14862471084230877, 0.9676978022659334),
      // },
      easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
      duration: 2,
    });
  }
}
