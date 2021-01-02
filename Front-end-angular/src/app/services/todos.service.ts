import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  
  constructor(private http: HttpClient) { 
  }

  apiUrl = 'http://localhost:8000/api';


  categories():Observable<any> {
    return this.http.get(this.apiUrl+'/category');
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(this.apiUrl+'/category', category);
  }

  deleteCategory(category: Category): Observable<any> {
    return this.http.delete(this.apiUrl+`/category/${category.id}`);
  }

  share(category: Category): Observable<any> {
    return this.http.post(this.apiUrl+`/category/share/${category.id}`, null);
  }

  tasks():Observable<any> {
    return this.http.get(this.apiUrl+'/todo');
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl+'/todo', task);
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete(this.apiUrl+`/todo/${task.id}`);
  }

  finish(task: Task): Observable<any> {
    return this.http.post(this.apiUrl+`/todo/done/${task.id}`, null);
  }
}
