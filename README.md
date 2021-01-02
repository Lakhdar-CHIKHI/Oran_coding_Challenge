# Conding challenge Laravel
# Presentation of the challenge
### Create a web application that allows users to create and save to-dos.
* ## Requirements
    * #### The User can register / connect (private profile)
    * #### Todo can be viewed, edited and deleted by their editor
    * #### The user can create spaces to organize the todos under different categories
* ## Structure
    * ## Back-End : Create a Rest API with Laravel 
    * ## Front-End : Create interfaces web with Angular
* ## Data Base : MySql
    * ## Models :
        * ### User
            * #### Each User has an id, a name, a unique email, email_verified_at,password, created_at and updated_at;
            * #### Each User can have a set of Categories;
            * #### Each User can have a set of Tasks;
        * ### Category
            * #### Each Category has an id, a category "name", share, user_id, created_at and updated_at;
            * #### Each Category can have a set of Tasks;
        * ### Task
            * #### Each Task has an id, a text "name", finished, user_id, category_id, created_at and updated_at;
        
        * ### And More details please see the file database/migrations
* ## Way of executing Rest Api Laravel: Please launch the following commands successive
    * ### composer install
    * ### php artisan migrate
    * ### php artisan passport:install
        * #### in this case take the second client ID && Client secret and go to the file Front-end-angular/src/app/services/auth.service.ts and paste it.
    * ### php artisan key:generate
    * ### php artisan serve

* ## Way of executing web app Angular: Please launch the following commands successive
    * ### ng serve 
     Or for PWD
    * ### ng add @angular/pwa
    * ### npm i -g http-server
    * ### ng build --prod
    * ### http-server -p4200 -c-1 dist/Front-end-angular