import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Cesium from 'cesium';
import { Subscription } from 'rxjs';
import { Ballon, BallonPosition, Color } from 'src/app/Model/Ballon';
import * as MapSelectors from '../store/map.selectors';
import * as MapActions from '../store/map.actions';

@Directive({
  selector: '[appCesium]',
})
export class CesiumDirective implements OnInit, OnDestroy {
  /**
   * Lat = Y Long = X Att/Height = Z
   */
  viewer: Cesium.Viewer;
  camHeight = 180000; // camera view height when tracking entity
  subsctiptions: Subscription[] = [];
  ballons$ = this.store.select(MapSelectors.selectMapBallons);
  ballons: Ballon[] | undefined;
  activeBallon$ = this.store.select(MapSelectors.selectActiveBallon);
  selectedEntityId: string | undefined = '1';

  //for circle compute
  start = Cesium.JulianDate.fromDate(new Date(2020, 2, 25, 16));
  stop = Cesium.JulianDate.addSeconds(this.start, 360, new Cesium.JulianDate());

  constructor(private el: ElementRef, private store: Store) {
    this.viewer = new Cesium.Viewer(this.el.nativeElement, {
      shouldAnimate: true,
      // terrainProvider: Cesium.createWorldTerrain(),
    });
    this.viewer.entities.collectionChanged.addEventListener(this.onChanged); // test
    this.viewer.selectedEntityChanged.addEventListener((ballon: Ballon) => {
      //Listener triggered when choosing entity
      // console.log(ballon);
      this.selectedEntityId = this.viewer.selectedEntity?.id;
      // console.log(this.selectedEntityId);
    });

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

    //Focus on selected ballon from the menu
    //Always check if active ballom, else back to israel
    this.subsctiptions.push(
      this.activeBallon$.subscribe((ballon) => {
        if (ballon) {
          console.log('select ballon from menu');
          this.menuBallonClicked(ballon);
        } else {
          console.log('back menu');

          this.menuBackClicked();
        }
      })
    );
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

  //Get data from NgRx ballons array and create entities
  // TODO: should render the list and not rebuild it.
  buildEntities() {
    this.subsctiptions.push(
      this.ballons$.subscribe((data) => {
        // console.log(data);
        //TODO: rebuild the array in a way that not affect the track entity when it gets updates
        console.log('getiing data ');

        //check if balloon added/removed
        if (data?.length != this.ballons?.length) {
          console.log('Build array of entities');

          this.ballons = data;
          this.viewer.entities.removeAll();
          //build new array of Entities
          data?.forEach((e: Ballon) => {
            this.viewer.entities.add(this.createEntity(e));
          });
        } else {
          //check if the data exists
          if (this.ballons && data) {
            for (let i = 0; i < data?.length; i++) {
              // console.log(Object.is(data[i].point,this.ballons[i].point));

              const newBallon = data[i];
              const oldBallon = this.ballons[i];
              // check if there is a change is the positions
              if (!Object.is(oldBallon.point, newBallon.point)) {
                var entity: Cesium.Entity | undefined =
                  this.viewer.entities.getById(this.selectedEntityId!);
                const newPosition = this.computeCirclularFlight(
                  newBallon.point.longitude,
                  newBallon.point.latitude,
                  newBallon.point.attitude,
                  0.5
                );
                entity!['position'] = newPosition;
                this.ballons = data;
              }
              // check if there is a change in the color of balloon
              if (!Object.is(oldBallon.color, newBallon.color)) {
                var entity: Cesium.Entity | undefined =
                  this.viewer.entities.getById(this.selectedEntityId!);
                entity!.ellipsoid!.material = new Cesium.ColorMaterialProperty(
                  Cesium.Color.fromCssColorString(newBallon.color).withAlpha(
                    0.5
                  )
                );
              }
            }
          }
        }
      })
    );
  }

  // An Test Event listener example of Data Chagned
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
    // console.log(msg);
  }

  //Create entity from given Ballon object with circular directions
  createEntity(ballon: Ballon) {
    //Compute a circular steps for entity
    const position = this.computeCirclularFlight(
      ballon.point.longitude,
      ballon.point.latitude,
      ballon.point.attitude,
      0.5
    );

    var polygon = new Cesium.PolygonGraphics(); // test
    let entity: Cesium.Entity = new Cesium.Entity({
      position: position,
      // Cesium.Cartesian3.fromDegrees(
      //   ballon.position.longitude,
      //   ballon.position.latitude,
      //   ballon.position.attitude
      // ),
      // properties: position,
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this.start,
          stop: this.stop,
        }),
      ]),
      orientation: new Cesium.VelocityOrientationProperty(position),
      name: ballon.name,
      ellipsoid: {
        radii: new Cesium.Cartesian3(20000.0, 20000.0, 20000.0),
        material: Cesium.Color.fromCssColorString(ballon.color).withAlpha(0.5),
        outline: true,
        outlineColor: Cesium.Color.BLACK,
      },
      description: ballon.description,
      path: {
        resolution: 1,
        material: new Cesium.PolylineGlowMaterialProperty({
          glowPower: 0.1,
          color: Cesium.Color.YELLOW,
        }),
        width: 10,
      },
    });
    entity.polygon = polygon; // test
    return entity;
  }

  //Set Event handler to hanlde map clicks.
  entityPicker() {
    let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    handler.setInputAction((movement: any) => {
      const pickedObject = this.viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedObject)) {
        let entity: Cesium.Entity = pickedObject.id;
        this.showBalloonInfoInMenu(entity);
      } else {
        this.stopTrackEntity();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  scratch3dPosition = new Cesium.Cartesian3();
  scratch2dPosition = new Cesium.Cartesian2();

  //Handle events - handle onTick event
  helper = new Cesium.EventHelper();

  async updateLive(entity: Cesium.Entity | undefined) {
    console.log('inside updateLive');
    let counter = 0;

    if (entity) {
      let ballon: Ballon | undefined = this.getBallonFromEntity(entity);

      this.helper.add(this.viewer.clock.onTick, (clock) => {
        counter++;

        var position3d;
        var position2d;

        if (counter == 50) {
          const pickedBallon2 = Object.assign({}, ballon);

          if (entity.position) {
            position3d = entity.position.getValue(
              clock.currentTime,
              this.scratch3dPosition
            );
            let position: BallonPosition =
              this.getDegreasFromCartesian3(position3d);

            let id = pickedBallon2._id;
            // console.log(position);
            if (position && id)
              this.store.dispatch(MapActions.updatePosition({ position, id }));
          }
          counter = 0;
        }

        // Moving entities don't have a position for every possible time, need to check.
        if (position3d) {
          position2d = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            this.viewer.scene,
            position3d,
            this.scratch2dPosition
          );
        }
      });
    } else {
      this.helper.removeAll();
    }
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
        this.viewer.clock.currentTime,
        this.scratch3dPosition
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
    ballon = this.getBallonFromEntity(entity);
    if (ballon) this.store.dispatch(MapActions.activeBallon({ ballon }));
  }

  //Get Entity and return Ballon
  getBallonFromEntity(entity: Cesium.Entity): Ballon | undefined {
    let ballon: Ballon | undefined;
    ballon = this.ballons?.find((e) => e.name == entity.name);
    return ballon;
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
      this.updateLive(entity);
    }
  }

  menuBackClicked() {
    this.stopTrackEntity();
    this.setViewToIsrael();
    this.helper.removeAll(); //remove clock event when returning to menu - destroy clock enevt listener
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

  //generate color from string
  // getColor(colorName: string, alpha: string) {
  //   Cesium.Color[]
  //   const color = new Cesium.Color[colorName.toUpperCase()];
  //   return Cesium.Color.fromAlpha(color, parseFloat(alpha));
  // }
  getColor(colorName: string) {
    var hash = 0;
    for (var i = 0; i < colorName.length; i++) {
      hash = colorName.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  computeCirclularFlight(
    lon: number,
    lat: number,
    height: number,
    radius: number
  ) {
    const property = new Cesium.SampledPositionProperty();
    for (let i = 0; i <= 360; i += 45) {
      const radians = Cesium.Math.toRadians(i);
      const time = Cesium.JulianDate.addSeconds(
        this.start,
        i,
        new Cesium.JulianDate()
      );
      const position = Cesium.Cartesian3.fromDegrees(
        lon + radius * 1.5 * Math.cos(radians),
        lat + radius * Math.sin(radians),
        height
        // Cesium.Math.nextRandomNumber() * 5000 + 1750
      );

      property.addSample(time, position);

      //Also create a point for each sample we generate.
      // this.viewer.entities.add({
      //   position: position,
      //   point: {
      //     pixelSize: 8,
      //     color: Cesium.Color.TRANSPARENT,
      //     outlineColor: Cesium.Color.YELLOW,
      //     outlineWidth: 3,
      //   },
      // });
    }
    const elipse = new Cesium.CheckerboardMaterialProperty({
      evenColor: Cesium.Color.WHITE,
      oddColor: Cesium.Color.BLACK,
      repeat: new Cesium.Cartesian2(4, 4),
    });
    //Add Target dot
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    this.viewer.entities.add({
      position: position,
      point: {
        pixelSize: 3,
        color: Cesium.Color.TRANSPARENT,
        outlineColor: Cesium.Color.RED,
        outlineWidth: 3,
      },
    });
    return property;
  }
}
