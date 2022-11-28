import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddAnimalComponent} from "@app/features/animal/views/add-animal/add-animal.component";
import {AnimalDetailsComponent} from "@app/features/animal/views/animal-details/animal-details.component";
import {AnimalListComponent} from "@app/features/animal/views/animal-list/animal-list.component";

const routes: Routes = [
  { path: '', component: AnimalListComponent },
  { path: 'add', component: AddAnimalComponent },
  { path: ':id', component: AnimalDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
