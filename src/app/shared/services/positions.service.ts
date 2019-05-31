import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../model/interface';


@Injectable({
  providedIn: 'root'
})

export class PositionService {
  constructor(
    private http: HttpClient
  ) {}
  getAllPosition(): Observable<Position[]> {
    return this.http.get<Position[]>('http://localhost:5000/api/position')
  }
}
