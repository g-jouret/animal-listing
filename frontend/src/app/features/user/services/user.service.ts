import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "@app/features/user/models/user";
import {Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`api/user/list`).pipe(tap(res => console.log(res)));
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`api/user/${id}`).pipe(tap(res => console.log(res)));
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(`api/user`, null, {params: {name: data.name, firstName: data.firstName}}).pipe(tap(res => console.log(res)));
  }

  update(data: User): Observable<User> {
    return this.http.post<User>(`api/user/${data.id}`, null, {params:{name: data.name, firstName: data.firstName}}).pipe(tap(res => console.log(res)));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/user/${id}`).pipe(tap(res => console.log(res)));
  }

  addPet(id: number, petId: number): Observable<User> {
    return this.http.post<User>(`api/user/${id}/pet`, null, {params:{id: petId}}).pipe(tap(res => console.log(res)));
  }

  removePet(id: number, petId: number): Observable<User> {
    return this.http.delete<User>(`api/user/${id}/pet/${petId}`).pipe(tap(res => console.log(res)));
  }
}
