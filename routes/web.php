<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HappeningController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PageSectionController;
use App\Http\Controllers\TestimonialController;

Route::get('/', function () {
    return redirect()->route('dashboard');
});
Route::get('/login', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard/Dashboard');
// })->middleware(['auth', 'verified', 'is_admin'])->name('dashboard');

Route::middleware('auth', 'is_admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //Profile  
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    //Pages
    Route::resource('pages', PagesController::class)->except(['destroy']);
    Route::prefix('pages')->group(function () {
        Route::get('/{page}/destroy', [PagesController::class, 'destroy'])->name('pages.destroy');
        Route::post('/{page}/duplicate', [PagesController::class, 'duplicate'])->name('pages.duplicate');
        Route::post('/{id}/toggle-status', [PagesController::class, 'toggleStatus'])->name('pages.toggleStatus');
    });

    //pages sections
    Route::prefix('pages/sections')->group(function () {
        Route::get('/{page}', [PageSectionController::class, 'index'])->name('sections.index');
        Route::post('/store', [PageSectionController::class, 'store'])->name('sections.store');
        Route::get('/{group_key}/delete', [PageSectionController::class, 'deleteSection'])->name('sections.delete');
        Route::post('item/update', [PageSectionController::class, 'updateItem'])->name('sections.item.update');
        Route::get('item/{id}/delete', [PageSectionController::class, 'deleteItem'])->name('sections.item.delete');
    });

    //Banner
    Route::resource('banners', BannerController::class)->except(['destroy']);
    Route::prefix('banner')->group(function () {
        Route::get('/{banner}/destroy', [BannerController::class, 'destroy'])->name('banner.destroy');
        Route::post('/{id}/toggle-status', [BannerController::class, 'toggleStatus'])->name('banner.toggleStatus');
        Route::get('/{banner}/mapping', [BannerController::class, 'mapping'])->name('banner.mapping');
        Route::post('{id}/mapping', [BannerController::class, 'attachMapping'])->name('banners.mapping.attach');
    });

    //School
    Route::resource('schools', SchoolController::class)->except(['destroy']);
    Route::prefix('schools')->group(function () {
        Route::get('{id}/sections/create', [SchoolController::class, 'createSections'])->name('school.section.create');
        Route::post('{id}/sections/update', [SchoolController::class, 'storeOrUpdate'])->name('school.section.update');
        Route::get('/{school}/destroy', [SchoolController::class, 'destroy'])->name('schools.destroy');
        Route::post('/{id}/toggle-status', [SchoolController::class, 'toggleStatus'])->name('schools.toggleStatus');
    });

    //Testimonial
    Route::resource('testimonial', TestimonialController::class)->except(['destroy']);
    Route::prefix('testimonial')->group(function () {
        Route::get('/{testimonial}/destroy', [TestimonialController::class, 'destroy'])->name('testimonial.destroy');
        Route::post('/{id}/toggle-status', [TestimonialController::class, 'toggleStatus'])->name('testimonial.toggleStatus');
        Route::get('/{testimonial}/mapping', [TestimonialController::class, 'mapping'])->name('testimonial.mapping');
        Route::post('{id}/mapping', [TestimonialController::class, 'attachMapping'])->name('testimonial.mapping.attach');
    });

    //Happening
    Route::resource('happening', HappeningController::class)->except(['destroy']);
    Route::prefix('happening')->group(function () {
        Route::get('/{happening}/destroy', [HappeningController::class, 'destroy'])->name('happening.destroy');
        Route::post('/{id}/toggle-status', [HappeningController::class, 'toggleStatus'])->name('happening.toggleStatus');
        Route::get('/{happening}/mapping', [HappeningController::class, 'mapping'])->name('happening.mapping');
        Route::post('{id}/mapping', [HappeningController::class, 'attachMapping'])->name('happening.mapping.attach');
    });

    //Gallery
    Route::resource('galleries',GalleryController::class)->except(['destroy', 'update']);
    Route::prefix('galleries')->group(function () {
        Route::get('/{gallery}/destroy', [GalleryController::class, 'destroy'])->name('galleries.destroy');
        Route::post('/update/{gallery}', [GalleryController::class, 'update'])->name('galleries.update');
        Route::get('/{gallery}/mapping', [GalleryController::class, 'mapping'])->name('galleries.mapping');
        Route::post('{id}/mapping', [GalleryController::class, 'attachMapping'])->name('galleries.mapping.attach');
    });

    //Department
    Route::resource('department', DepartmentController::class)->except(['destroy']);
    Route::prefix('department')->group(function () {
        Route::get('/{department}/destroy', [DepartmentController::class, 'destroy'])->name('department.destroy');
        Route::post('/{id}/toggle-status', [DepartmentController::class, 'toggleStatus'])->name('department.toggleStatus');
        Route::get('/{department}/mapping', [DepartmentController::class, 'mapping'])->name('department.mapping');
        Route::post('{id}/mapping', [DepartmentController::class, 'attachMapping'])->name('department.mapping.attach');
        Route::get('{id}/sections/create', [DepartmentController::class, 'createSections'])->name('department.section.create');
        Route::post('{id}/sections/update', [DepartmentController::class, 'storeOrUpdate'])->name('department.section.update');
    });
});

require __DIR__.'/auth.php';
