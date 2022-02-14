import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/service/pet.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ageTotal: number = 0;
  constructor(
    public petService: PetService,
    private storageService: TokenStorageService
  ) {}

  pets: Pet[] = [];
  pets3: Pet[] = [];

  ngOnInit(): void {
    this.pets = this.storageService.getPetsList();
    // console.log(this.pets);

    if (this.pets.length < 1) {
      this.petService.getAll().subscribe((data: Pet[]) => {
        this.pets = data;
        this.storageService.savePetsList(data);
        this.calcTotalAge();
      });
    }
    this.petService.getAllUnder3().subscribe((data: Pet[]) => {
      this.pets3 = data;
      // this.storageService.savePetsList(data);
      // this.calcTotalAge();
    });
    this.calcTotalAge();
  }

  calcTotalAge() {
    let pets = this.storageService.getPetsList();
    this.ageTotal = 0;
    for (let i = 0; i < pets.length; i++) {
      this.ageTotal += parseInt(pets[i].age.toString());
    }
  }
  deletePet(id: string) {
    this.storageService.deletePet(id);
    this.petService.deletePet(id).subscribe((res) => {
      this.pets = this.pets.filter((item) => item._id !== id);
      console.log('Pet deleted successfully!');
      this.calcTotalAge();

    });
  }
}
