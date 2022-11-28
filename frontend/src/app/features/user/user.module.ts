import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { AddUserComponent } from './views/add-user/add-user.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
