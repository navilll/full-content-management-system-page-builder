<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            // Basic Info
            $table->string('name');
            $table->string('menu_name')->nullable();
            $table->string('name_short')->nullable();
            $table->string('slug')->nullable()->unique();
            $table->integer('display_order')->default(0);
            $table->boolean('status')->default(1);

            // Tab 1: About Department
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('vision_title')->default('Vision');
            $table->text('vision_description')->nullable();
            $table->string('mission_title')->default('Mission');
            $table->json('mission_points')->nullable(); // Array stored as JSON
            $table->string('image')->nullable();
            $table->integer('tab_display_order')->default(100);

            // Tab 2: Dean/HOD Message
            $table->string('hod_name')->nullable();
            $table->string('hod_designation')->default('Head of the Department');
            $table->json('hod_messages')->nullable(); // Array stored as JSON
            $table->string('hod_image')->nullable();

            // Tab 3: Courses
            $table->string('courses_title')->default('Courses Offered');
            $table->string('courses_image')->nullable();

            // Tab 4: Faculty
            $table->string('faculty_title')->default('Our Faculty');
            $table->string('faculty_subtitle')->default('Meet Our Expert Faculty');

            // Tab 5: Laboratories
            $table->string('lab_title')->default('Our Laboratories');
            $table->string('lab_subtitle')->default('Explore Our Advanced Labs');

            // Tab 6: Happening
            $table->string('happening_title')->default("Whats Happening");
            $table->string('happening_subtitle')->default('Latest Events And News');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
