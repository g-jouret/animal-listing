import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Animal} from "@app/features/animal/models/animal";
import {AnimalService} from "@app/features/animal/services/animal.service";
import {User} from "@app/features/user/models/user";
import {UserService} from "@app/features/user/services/user.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
@UntilDestroy()
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User = {
    name: '',
    firstName: '',
    pets: []
  }

  selectedPetId?: any;

  availableAnimals: Animal[] = [];

  constructor(private userService: UserService, private animalService: AnimalService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.getAvailablePets();
  }

  getUser(id: number): void {
    this.userService.get(id)
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.user = data});
  }

  getAvailablePets(): void {
    this.animalService.getAvailables()
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.availableAnimals = data});
  }

  updateUser(): void {
    this.userService.update(this.user)
      .pipe(untilDestroyed(this))
      .subscribe(data => {this.user = data});
  }

  deleteUser(): void {
    if (!this.user.id) return;
    this.userService.delete(this.user.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigate(['/user']));
  }

  addPets(): void {
    console.log(this.selectedPetId)
    if (!this.user.id || !this.selectedPetId) return;
    this.userService.addPet(this.user.id, this.selectedPetId)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.user = data;
        this.getAvailablePets();
      });
  }

  removePet(petId?: number): void {
    if (!this.user.id || !petId) return;
    this.userService.removePet(this.user.id, petId)
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.user = data;
        this.getAvailablePets();
      });
  }

  ngOnDestroy() {
  }
}
