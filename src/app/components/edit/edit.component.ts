import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/service/pet.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: number = 0;
  pet!: Pet;
  form: FormGroup;

  constructor(
    public petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: TokenStorageService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['profileId'];
    this.pet = this.storageService.getPetById(this.id.toString());
    // console.log(this.pet);

    if (!this.pet) {
      this.petService.getPet(this.id.toString()).subscribe((data: Pet) => {
        this.pet = data;
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.pet.name = this.f.name.value;
    this.pet.age = this.f.age.value;
    this.petService.updatePet(this.id.toString(), this.pet).subscribe((res) => {
      console.log('Pet updated successfully!');
      this.storageService.updatePetById(this.id.toString(), this.pet);
      this.router.navigateByUrl('home');
    });
  }
}
