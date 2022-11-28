import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddUserComponent} from "@app/features/user/views/add-user/add-user.component";
import {UserDetailsComponent} from "@app/features/user/views/user-details/user-details.component";
import {UserListComponent} from "@app/features/user/views/user-list/user-list.component";

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: AddUserComponent },
  { path: ':id', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
