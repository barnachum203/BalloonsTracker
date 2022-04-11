import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Cesium from 'cesium';
import { Subscription } from 'rxjs';
import { Ballon, BallonPosition, Color } from 'src/app/Model/Ballon';
import * as MapSelectors from '../store/map.selectors';
import * as MapActions from '../store/map.actions';

@Directive({
  selector: '[appCesium2D]',
})
export class Cesium2dDirective implements OnInit, OnDestroy {
  /**
   * Lat = Y Long = X Att/Height = Z
   */
  viewer: Cesium.Viewer;
  camHeight = 180000; // camera view height when tracking entity
  subsctiptions: Subscription[] = [];
  selectedEntityId: string | undefined = '1';

  hirarchy: Cesium.Cartesian3[] = [];

  //for circle compute
  start = Cesium.JulianDate.fromDate(new Date(2020, 2, 25, 16));
  stop = Cesium.JulianDate.addSeconds(this.start, 360, new Cesium.JulianDate());

  constructor(private el: ElementRef, private store: Store) {
    this.viewer = new Cesium.Viewer(this.el.nativeElement, {
      shouldAnimate: true,
      // terrainProvider: Cesium.createWorldTerrain(),
    });
    this.viewer.scene.mode = Cesium.SceneMode.SCENE2D;

    //Make sure viewer is at the desired time.
    //Movement settings
    this.viewer.clock.startTime = this.start.clone();
    this.viewer.clock.stopTime = this.stop.clone();
    this.viewer.clock.currentTime = this.start.clone();
    this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    this.viewer.clock.multiplier = 10;

    //Enable lighting based on the sun position
    this.viewer.scene.globe.enableLighting = true;

    //Enable depth testing so things behind the terrain disappear.
    this.viewer.scene.globe.depthTestAgainstTerrain = true;

    //Set the random number seed for consistent results.
    // Cesium.Math.setRandomNumberSeed(3);

    //Make ballons from ngrx ballons data
    this.buildEntities();

    //Init camera to israel
    this.setViewToIsrael();

    this.buildShapes();
    //Focus on selected ballon from the menu
    //Always check if active shape, else back to israel
    this.subsctiptions
      .push
      //get sahpes
      ();
  }
  //Set view on israel
  private setViewToIsrael() {
    console.log('Set View to israel');
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(33, 31.0, 700000.0),
      easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
      duration: 0.5,
    });
  }

  ngOnDestroy(): void {
    this.subsctiptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.entityPicker();
  }

  buildShapes() {
    // this.drawShape(this.pos);
  }
  //Get data from NgRx ballons array and create entities
  // TODO: should render the list and not rebuild it.
  buildEntities() {
    this.subsctiptions
      .push
      //build shapes
      ();
  }
  createPoint(worldPosition: Cesium.Cartesian3) {
    const point = this.viewer.entities.add({
      position: worldPosition,
      point: {
        color: Cesium.Color.WHITE,
        pixelSize: 5,
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      },
    });
    return point;
  }

  drawShape(positionData: any) {
    let shape;

    console.log(positionData);

    shape = this.viewer.entities.add({
      polygon: {
        hierarchy: positionData,
        material: new Cesium.ColorMaterialProperty(
          Cesium.Color.WHITE.withAlpha(0.7)
        ),
      },
    });

    return shape;
  }

  activeShapePoints: Cesium.Cartesian3[] = [];
  activeShapePoints2D: Cesium.Cartesian2[] = [];
  activeShape: any;
  floatingPoint: any;
  //Set Event handler to hanlde map clicks.
  entityPicker() {
    let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    handler.setInputAction((event) => {
      const earthPosition = this.viewer.scene.pickPosition(event.position);
      // `earthPosition` will be undefined if our mouse is not over the globe.

      let ellipsoid = this.viewer.scene.globe.ellipsoid;

      const cartesian = this.viewer.camera.pickEllipsoid(
        event.position,
        ellipsoid
      );
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude
        ).toFixed(2);
        const latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude
        ).toFixed(2);

        console.log(
          `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
            `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`
        );
      }

      if (Cesium.defined(cartesian)) {
        if (this.activeShapePoints.length === 0) {
          console.log('activeShapePoints == 0 - point');
          this.floatingPoint = this.createPoint(cartesian!);
          console.log(this.floatingPoint);

          this.activeShapePoints.push(cartesian!);
          const dynamicPositions = new Cesium.CallbackProperty(() => {
            return new Cesium.PolygonHierarchy(this.activeShapePoints);
          }, false);
          this.activeShape = this.drawShape(dynamicPositions);
        }
        this.activeShapePoints.push(cartesian!);
        this.createPoint(cartesian!);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    handler.setInputAction((event) => {
      this.terminateShape();
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    handler.setInputAction((event) => {
      if (Cesium.defined(this.floatingPoint)) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        const newPosition = this.viewer.camera.pickEllipsoid(
          event.endPosition,
          ellipsoid
        );

        if (newPosition) {
          this.floatingPoint.position.setValue(newPosition);
          this.activeShapePoints.pop();
          this.activeShapePoints.push(newPosition);
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  terminateShape() {
    this.hirarchy = [];
    this.activeShapePoints.pop();
    for (let i = 0; i < this.activeShapePoints.length; i++) {
      this.hirarchy.push(this.activeShapePoints[i]);
    }
    this.drawShape(this.hirarchy);
    this.viewer.entities.remove(this.floatingPoint);
    this.viewer.entities.remove(this.activeShape);
    this.floatingPoint = undefined;
    this.activeShape = undefined;
    this.activeShapePoints = [];
  }

  getDegreasFromCartesian3(position3d: Cesium.Cartesian3): BallonPosition {
    let entityPosition = Cesium.Cartographic.fromCartesian(position3d);
    let position: BallonPosition = {
      longitude: 0,
      latitude: 0,
      attitude: 0,
    };
    position.attitude = Number(entityPosition.height.toFixed(4));
    position.latitude = Number(
      ((entityPosition.latitude * 180) / Cesium.Math.PI).toFixed(4)
    );
    position.longitude = Number(
      ((entityPosition.longitude * 180) / Cesium.Math.PI).toFixed(4)
    );

    return position;
  }

  //Set tracker to entity with camera zoom
  trackEntity(entity: Cesium.Entity) {
    if (entity.position) {
      const position3d = entity.position.getValue(
        this.viewer.clock.currentTime
      );
      let ballonPosition: BallonPosition =
        this.getDegreasFromCartesian3(position3d);
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          ballonPosition.longitude,
          ballonPosition.latitude,
          ballonPosition.attitude + this.camHeight
        ),
        duration: 0.5,
        easingFunction: Cesium.EasingFunction.QUADRATIC_IN_OUT,
        complete: this.startTrackEntity(entity),
      });
    } else {
      console.error('No such entity');
    }
  }
  private startTrackEntity(entity: Cesium.Entity): any {
    this.viewer.selectedEntity = entity;
    this.viewer.trackedEntity = entity;
    console.log('Tracker ON');
  }

  stopTrackEntity() {
    this.store.dispatch(MapActions.unactiveBallon());
    this.viewer.selectedEntity = undefined;
    this.viewer.trackedEntity = undefined;
    console.log('Tracker OFF');
  }
  //Show ballon info on the menu
  showBalloonInfoInMenu(entity: any) {
    console.log('showBallonInMenu');
    let ballon: Ballon | undefined;

    if (ballon) this.store.dispatch(MapActions.activeBallon({ ballon }));
  }

  //Get Ballon and return Entity
  getEntityFromBallon(ballon: Ballon): Cesium.Entity | undefined {
    let entity: Cesium.Entity | undefined;
    entity = this.viewer.entities.values.find(
      (entity: Cesium.Entity) => entity.name == ballon.name
    );
    return entity;
  }

  menuBallonClicked(ballon: Ballon) {
    let entity: Cesium.Entity | undefined = this.getEntityFromBallon(ballon);
    if (entity) {
      this.showBalloonInfoInMenu(entity);
      this.trackEntity(entity!);
    }
  }

  menuBackClicked() {
    this.stopTrackEntity();
    this.setViewToIsrael();
  }

  //Use this function to navigate to specefic ballon
  flyTo(ballon: Ballon) {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        ballon.position.longitude,
        ballon.position.latitude,
        ballon.position.attitude + this.camHeight
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
      duration: 1,
    });
  }

  /**
   * For more information see https://cesiumjs.org/Cesium/Build/Documentation/Scene.html?classFilter=scene
   * @returns cesium scene
   */
  getScene() {
    return this.viewer.scene;
  }

  /**
   * For more information see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
   * @returns cesium canvas
   */
  getCanvas(): HTMLCanvasElement {
    return this.viewer.canvas as HTMLCanvasElement;
  }
}
