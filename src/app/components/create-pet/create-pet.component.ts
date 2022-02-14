import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/model/Pet';
import { PetService } from 'src/app/service/pet.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-create-pet',
  templateUrl: './create-pet.component.html',
  styleUrls: ['./create-pet.component.css'],
})
export class CreatePetComponent implements OnInit {
  id: number = 0;
  pet!: Pet;
  form: FormGroup;
  loading = false;

  constructor(
    public petService: PetService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: TokenStorageService
  ) {
    this.form = new FormGroup({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      age: new FormControl('', [Validators.required]),
      id: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  submit() {
    this.loading = true;

    let pet: Pet = this.form.value;
    this.petService.addPet(this.form.value).subscribe(
      (res) => {
        console.log('Pet created successfully!');
        let pets: Pet[] = this.storageService.getPetsList();
        pets.push(pet);
        this.storageService.savePetsList(pets);
        this.loading = false;
        this.router.navigateByUrl('home');
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
