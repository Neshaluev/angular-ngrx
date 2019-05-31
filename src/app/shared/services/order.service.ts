import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position, Order } from '../model/interface';


@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(
    private http: HttpClient
  ) {}
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5000/api/order')
  }
}
