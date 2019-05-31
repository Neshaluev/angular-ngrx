import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/interface';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(
    private http: HttpClient
  ) {}
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:5000/api/category')
  }
  updateCategoryId(categoryId ,data): Observable<Category>{
    console.log('Data', data)
    return this.http.patch<Category>(`http://localhost:5000/api/category/${categoryId}`, data);
  }
}
