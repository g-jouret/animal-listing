import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalListComponent } from './views/animal-list/animal-list.component';
import { AnimalDetailsComponent } from './views/animal-details/animal-details.component';
import { AddAnimalComponent } from './views/add-animal/add-animal.component';


@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalDetailsComponent,
    AddAnimalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AnimalRoutingModule
  ]
})
export class AnimalModule { }
