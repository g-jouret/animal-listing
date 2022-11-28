import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Animal} from "@app/features/animal/models/animal";
import {AnimalType} from "@app/features/animal/models/animal-type";
import {AnimalService} from "@app/features/animal/services/animal.service";
import {User} from "@app/features/user/models/user";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss']
})
@UntilDestroy()
export class AnimalDetailsComponent implements OnInit, OnDestroy {

  animal: Animal = {
    name: '',
    type: AnimalType.DOG
  }

  owner: User = {
    name: '',
    firstName: ''
  }

  typeOptions = Object.values(AnimalType);

  constructor(private animalService: AnimalService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getAnimal(this.route.snapshot.params['id']);
  }

  getAnimal(id: number): void {
    this.animalService.get(id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.animal = data});

    this.animalService.getOwner(id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.owner = data});
  }

  updateAnimal(): void {
    this.animalService.update(this.animal)
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.animal = data});
  }

  deleteAnimal(): void {
    if (!this.animal.id) return;
    this.animalService.delete(this.animal.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigate(['/animal']));
  }

  ngOnDestroy() {
  }
}
