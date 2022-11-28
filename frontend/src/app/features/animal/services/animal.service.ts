import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Animal} from "@app/features/animal/models/animal";
import {AnimalType} from "@app/features/animal/models/animal-type";
import {User} from "@app/features/user/models/user";
import {Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AnimalService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`api/animal/list`).pipe(tap(res => console.log(res)));
  }

  get(id: number): Observable<Animal> {
    return this.http.get<Animal>(`api/animal/${id}`).pipe(tap(res => console.log(res)));
  }

  getAvailables(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`api/animal/available`).pipe(tap(res => console.log(res)));
  }

  getOwner(id: number): Observable<User> {
    return this.http.get<User>(`api/animal/${id}/owner`).pipe(tap(res => console.log(res)));
  }

  create(data: Animal): Observable<Animal> {
    return this.http.post<Animal>(`api/animal`, null, {params: {name: data.name, type: data.type}}).pipe(tap(res => console.log(res)));
  }

  update(data: Animal): Observable<Animal> {
    return this.http.post<Animal>(`api/animal/${data.id}`, null, {params:{name: data.name, type: data.type}}).pipe(tap(res => console.log(res)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/animal/${id}`).pipe(tap(res => console.log(res)));
  }
}
