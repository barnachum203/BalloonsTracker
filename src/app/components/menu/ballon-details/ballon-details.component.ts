
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ballon, BallonPosition } from 'src/app/Model/Ballon';
import { BallonService } from 'src/app/services/ballon.service';

@Component({
  selector: 'app-ballon-details',
  templateUrl: './ballon-details.component.html',
  styleUrls: ['./ballon-details.component.css']
})
export class BallonDetailsComponent implements OnInit {

  ballons!: Ballon[];
  ballon: Ballon | undefined;
  position: BallonPosition | undefined;
  id!: number;
  constructor(private route: Router, private activatedRoute: ActivatedRoute,
   private ballonService: BallonService) {
     this.ballonService.getAllBallons().subscribe((data) => {
      this.ballons = data;
      console.log(this.ballons);
      
     });
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      //TODO: get ballon by id live form server / NgRx
      this.ballon = this.ballons.find(element => element.id?.toString() == this.id.toString()) 
      this.position = this.ballon?.position;
      console.log(this.ballon);
      
    })
  }

  getBallonById(){

  }
  backToMenu(){
    this.route.navigate(['home']);
  }

  onSave(){

  }

}
