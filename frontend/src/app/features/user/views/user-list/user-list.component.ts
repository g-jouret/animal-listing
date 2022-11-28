import {Component, OnDestroy} from '@angular/core';
import {User} from "@app/features/user/models/user";
import {UserService} from "@app/features/user/services/user.service";
import {UntilDestroy} from "@ngneat/until-destroy";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
@UntilDestroy()
export class UserListComponent implements OnDestroy {

  list$: Observable<User[]> = this.userService.getAll();

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {}
}
