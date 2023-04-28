<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookController;


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
    return Inertia::render('First' );
});

Route::get('/dashboard', function () {
    return Inertia::render('Second');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::post("/book/filter", [BookController::class, "filter"])->name("book.filter");
Route::get('/book/{book_id}/{user_id}/attend', [BookController::class, 'attend'])->name('book.attend');
//Route::post('/hotel/forget', [\App\Http\Controllers\HotelController::class, 'forget'])->name('hotel.forget');


Route::middleware('auth')->group(function () {
    Route::resource('category', CategoryController::class);
    Route::resource('book', BookController::class)->only([
        'index'
    ]);
});

Route::middleware(['auth', 'editBook'])->group(function (){
    Route::resource('book', BookController::class)->except([
        'index'
    ]);


});
