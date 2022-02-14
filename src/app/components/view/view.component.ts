import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/service/pet.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: string = '';
  pet!: Pet;

  constructor(
    public petService: PetService,
    private storageService: TokenStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['profileId'];
    this.pet = this.storageService.getPetById(this.id.toString());
    if (!this.pet) {
      this.petService.getPet(this.id).subscribe((data: Pet) => {
        this.pet = data;
      });
    }
  }
}
