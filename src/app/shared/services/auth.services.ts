import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { User } from '../model/interface';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient
  ) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5000/api/auth/login', {email, password});
  }
  registration(user: User): Observable<User>  {
    return this.http.post<User>('http://localhost:5000/api/auth/register', user)
  }
}
