import {Component, OnDestroy} from '@angular/core';
import {Animal} from "@app/features/animal/models/animal";
import {AnimalType} from "@app/features/animal/models/animal-type";
import {AnimalService} from "@app/features/animal/services/animal.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
@UntilDestroy()
export class AddAnimalComponent implements OnDestroy {

  animal: Animal = {
    name: '',
    type: AnimalType.DOG
  };
  submitted = false;

  typeOptions = Object.values(AnimalType);

  constructor(private animalService: AnimalService) {
  }

  saveAnimal(): void {
    const data = {
      name: this.animal.name,
      type: this.animal.type
    };

    this.animalService.create(data)
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.submitted = true))
  }

  newAnimal(): void {
    this.submitted = false;
    this.animal = {
      name: '',
      type: AnimalType.DOG
    };
  }

  ngOnDestroy() {
  }
}
