import {Component, OnDestroy} from '@angular/core';
import {AnimalType} from "@app/features/animal/models/animal-type";
import {User} from "@app/features/user/models/user";
import {UserService} from "@app/features/user/services/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
@UntilDestroy()
export class AddUserComponent implements OnDestroy {

  user: User = {
    name: '',
    firstName: ''
  };
  submitted = false;

  constructor(private userService: UserService) {
  }

  saveUser(): void {
    const data = {
      name: this.user.name,
      firstName: this.user.firstName
    };

    this.userService.create(data)
      .pipe(untilDestroyed(this))
      .subscribe(() => (this.submitted = true))
  }

  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      firstName: ''
    };
  }

  ngOnDestroy() {
  }
}
