import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-requets.model';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }
  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.url}/categories`, model);
  }
  getAllCategories(): Observable<Category[]> {
    
    return this.http.get<Category[]>(`${environment.url}/categories`);
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.url}/categories/${id}`);
  }
  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : Observable<Category> {
    return this.http.put<Category>(`${environment.url}/categories/${id}`, updateCategoryRequest);
  }
  deleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.url}/categories/${id}`)
  }
}
