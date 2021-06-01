### Setup

After you cloned the project, run these commands to get set up locally:

``` bash

# copy .env.example to .env
cp .env.example .env

# generate app key
php artisan key:generate

# install composer dependencies
composer install

# install and run npm dependencies
npm install && npm run dev

# run migrations and seed database
php artisan migrate:fresh --seed

# Serve the application on the PHP development server
php artisan serve

# finally from the root directoy run all the tests to be sure the project setup was succesfull
php artisan test

➜  buildstream git:(master) php artisan test

   PASS  Tests\Unit\ExampleTest
  ✓ example

   PASS  Tests\Feature\ExampleTest
  ✓ example

   PASS  Tests\Feature\JobApiTest
  ✓ it can create a new job with all the required properties
  ✓ it can see a list of all jobs containing these fields

   PASS  Tests\Feature\ResponseApiTest
  ✓ it validates job response
  ✓ it validate to submit for higher bid
  ✓ it can submit my bid
  ✓ it can accept proposed daily rate
  ✓ it can reject job

  Tests:  9 passed
  Time:   1.51s

```

### Routes ###

Run ``` php artisan route:list``` to list the available API routes.

```
+--------+----------+-------------------------+-----------------+--------------------------------------------+------------+
| Domain | Method   | URI                     | Name            | Action                                     | Middleware |
+--------+----------+-------------------------+-----------------+--------------------------------------------+------------+
|        | GET|HEAD | /                       |                 | Closure                                    | web        |
|        | POST     | api/jobs                | jobs.store      | App\Http\Controllers\JobController@store   | api        |
|        | GET|HEAD | api/jobs                | jobs.index      | App\Http\Controllers\JobController@index   | api        |
|        | POST     | api/jobs/{job}/response | responses.store | App\Http\Controllers\JobResponseController | api        |
|        | GET|HEAD | api/user                |                 | Closure                                    | api        |
|        |          |                         |                 |                                            | auth:api   |
+--------+----------+-------------------------+-----------------+--------------------------------------------+------------+
```

#### How the app works: ####

![BuildStreamCodeChallenge](https://user-images.githubusercontent.com/11221147/120288202-8b4ebf00-c2f2-11eb-877e-472ce229ccc5.gif)
