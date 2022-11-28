import {Component, OnDestroy} from '@angular/core';
import {Animal} from "@app/features/animal/models/animal";
import {AnimalService} from "@app/features/animal/services/animal.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Observable} from "rxjs";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
@UntilDestroy()
export class AnimalListComponent implements OnDestroy {

  list$: Observable<Animal[]> = this.animalService.getAll();

  constructor(private animalService: AnimalService) {
  }

  ngOnDestroy() {}
}
