import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Task } from '../models/task';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '../services/jwt-helper.service';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Variables
  accessToken: any;
  accessTokenDetails: any;
  loading: boolean;
  user: User = new User();
  categor: Category = new Category();
  categories: Category[] = [];
  categories_: Category[] = [];
  observable: Observable<any>;
  task: Task = new Task();
  tasks: Task[] = [];
  id_category_selected: number;
  cat: Category = new Category();

  constructor(
    jwtHelper: JwtHelperService,
    private authService: AuthService,
    private todosService: TodosService,
    private router: Router
  ) {
    this.accessToken = localStorage.getItem('access_token');
    this.accessTokenDetails = {
      id: jwtHelper.id(),
      name: jwtHelper.name(),
      email: jwtHelper.email(),
      tasks: jwtHelper.tasks()
    };
  }

  ngOnInit(): void {
    this.reloadCategories();
  }

  reloadCategories(){
    this.categories = [];
    this.categories_ = [];
    this.getUser();
    this.reloadCategories_();
  }

  getUser(){
    this.authService.user(this.accessTokenDetails.id)
      .subscribe(event => {
        this.user = event.data;
        this.categories = event.data.categories;
      });
      
  }
  reloadCategories_(){
    this.todosService.categories()
      .subscribe(event => {
        this.categories_ = event.data;
        this.categories.forEach(category_ => {
          this.cat = this.categories_.find(x => x.id === category_.id);
          const index = this.categories_.indexOf(this.cat);
          if (index > -1) {
            this.categories_.splice(index, 1);
          }
        });
        this.categories_.forEach(category_ => {
          // const index = this.categories.indexOf(category_);
          if (category_.share) {
              this.categories.push(category_);
          }
        });
      });
      
      
  }
  /**
   * Logout the user and revoke his token
   */
  logout(): void {
    this.loading = true;
    this.authService.logout()
      .subscribe(() => {
        this.loading = false;
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }

  AddCategory(){
    this.categor.user_id = this.accessTokenDetails.id;
    this.todosService.addCategory(this.categor)
      .subscribe(data => {
        alert(data.message)
        this.reloadCategories();
      });
  }

  deleteCategory(category){
    this.todosService.deleteCategory(category)
    .subscribe(data => {
      this.reloadCategories();
      alert(data.message)
    });
  }

  shareCategory(category){
    this.todosService.share(category)
    .subscribe(data => {
      this.reloadCategories();
      alert(data.message)
    });
  }

  selectCategory(category){
    this.id_category_selected = category.id;
    this.tasks = [];
    category.tasks.forEach(task => {
      if (task.user.id == this.user.id) {
        this.tasks.push(task);
      }
    });
  }

  changeShare(event){
    this.categor.share = event.target.checked;
  }


  AddTask(){
    this.task.user_id = this.accessTokenDetails.id;
    this.todosService.addTask(this.task)
      .subscribe(data => {
        alert(data.message)
        this.reloadCategories();
        setInterval(() => {
          this.selectCategory(this.categories.find(x => x.id === this.id_category_selected));
        }, 0);
      });
  }

  deleteTask(task){
    this.todosService.deleteTask(task)
    .subscribe(data => {
      this.reloadCategories();
      setInterval(() => {
        this.selectCategory(this.categories.find(x => x.id === this.id_category_selected));
      }, 0);
      
      alert(data.message)
    });
  }

  finishedTask(task){
    this.todosService.finish(task)
    .subscribe(data => {
      this.reloadCategories();
      setInterval(() => {
        this.selectCategory(this.categories.find(x => x.id === this.id_category_selected));
      }, 0);
      alert(data.message)
    });
  }

  finished(event){
    this.task.finished = event.target.checked;
  }

}
