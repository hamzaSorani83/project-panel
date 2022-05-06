<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return [
        'setup' => [
            'cd backend',
            'composer install',
            'change name of .env.example to .env',
            'edit the .env file database name and username , password and save it',
            'php artisan migrate',
            'php artisan serve',
        ],
        'routes' => [
            'all projects' => [
                'url' => '/api/project/all',
                'method' => 'GET',
                'optionally parameter' => 'per_page',
                'description' => 'return all projects pagination with 10 project every time [you can also specify the number of project each page by passing it like that http://example.com/api/project/all?per_page=<number of projects>]'
            ],
            'add project' => [
                'url' => '/api/project/add',
                'method' => 'POST',
                'fillable' => 'project_details',
                'expected data' => 'JSON|infromation about the project'
            ],
            'delete project' => [
                'url' => '/api/project/delete',
                'method' => 'POST',
            ],
            'get specific project' => [
                'url' => '/api/project/get/{id}',
                'method' => 'GET',
                'required parameter' => 'ID|which present the id of the project in database',
            ]
        ],
        'another details' => 'all routes will return is_done variable which tells you about the state of the request [true,false]'
    ];
});

//require __DIR__.'/auth.php';
