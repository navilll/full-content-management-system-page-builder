<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Department;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $departments = Department::filter(['search' => $search])->orderBy('display_order', 'asc')->paginate(10)->withQueryString()->through(function ($department) {
            return [
                'id' => $department->id,
                'name' => $department->name,
                'slug' => $department->slug,
                'menu_name' => $department->menu_name,
                'short_name' => $department->short_name,
                'status' => $department->status,
                'display_order' => $department->display_order,
            ];
        });

        return Inertia::render('Departments/Index', [
            'departments' => $departments,
            'searchTerm' => $search ?? '',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:happenings,slug',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/i',
            ],
        ]);

        $data = $request->all();

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
            $count = Department::where('slug', 'LIKE', "{$data['slug']}%")->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        }

        Department::create($data);

        return redirect()->route('department.index')->with('success', 'Department created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        $data = $department->only([
            'id',
            'name',
            'menu_name',
            'name_short',
            'slug',
            'display_order',
        ]);

        return Inertia::render('Departments/Edit', [
            'department' => $data,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        // Validate only name and slug
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'unique:happenings,slug,' . $department->id,
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/i',
            ],
            'menu_name' => 'nullable|string|max:255',
            'name_short' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
        ]);

        $data = $request->all();

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
            $count = Department::where('slug', 'LIKE', "{$data['slug']}%")
                ->where('id', '!=', $department->id)
                ->count();
            if ($count > 0) {
                $data['slug'] .= '-' . ($count + 1);
            }
        }

        // Update department
        $department->update($data);

        return redirect()->route('department.index')
            ->with('success', 'Department updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $imageFields = ['image', 'hod_image', 'courses_image'];

        foreach ($imageFields as $field) {
            if ($department->$field && File::exists(public_path($department->$field))) {
                File::delete(public_path($department->$field));
            }
        }

        // Delete the department record
        $department->delete();

        return redirect()->back()->with('success', 'Department and its images have been deleted successfully.');
    }

    public function toggleStatus($id)
    {
        $department = Department::findOrFail($id);
        $department->status = !$department->status;
        $department->save();

        return redirect()->route('department.index')->with('success', 'Department Status Updated!');
    }

    public function createSections(Request $request, $id)
    {
        return Inertia::render('Departments/CreateOrUpdateSections', [
            'department' => Department::find($id),
        ]);
    }

    public function storeOrUpdate(Request $request, $id = null)
    {
        $department = Department::findOrFail($id);

        // Base rules
        $rules = [
            // Tab 1: About Department
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'vision_title' => 'nullable|string|max:255',
            'vision_description' => 'nullable|string',
            'mission_title' => 'nullable|string|max:255',
            'mission_points' => 'nullable|array',
            'mission_points.*' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'status' => 'nullable|boolean',

            // Tab 2: Dean/HOD Message
            'hod_name' => 'nullable|string|max:255',
            'hod_designation' => 'nullable|string|max:255',
            'hod_messages' => 'nullable|array',
            'hod_messages.*' => 'nullable|string',

            // Tab 3: Courses
            'courses_title' => 'nullable|string|max:255',

            // Tab 4: Faculty
            'faculty_title' => 'nullable|string|max:255',
            'faculty_subtitle' => 'nullable|string|max:255',

            // Tab 5: Laboratories
            'lab_title' => 'nullable|string|max:255',
            'lab_subtitle' => 'nullable|string|max:255',

            // Tab 6: Happening
            'happening_title' => 'nullable|string|max:255',
            'happening_subtitle' => 'nullable|string|max:255',
        ];

        // Conditionally add image validation only if uploaded
        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpg,jpeg,png,webp|max:2000';
        }

        if ($request->hasFile('hod_image')) {
            $rules['hod_image'] = 'image|mimes:jpg,jpeg,png,webp|max:2000';
        }

        if ($request->hasFile('courses_image')) {
            $rules['courses_image'] = 'image|mimes:jpg,jpeg,png,webp|max:2000';
        }

        $validated = $request->validate($rules);

        // Handle file uploads
        $fileFields = [
            'image' => 'departments/',
            'hod_image' => 'departments/',
            'courses_image' => 'departments/',
        ];

        foreach ($fileFields as $field => $folder) {
            if ($request->hasFile($field)) {
                // Delete old file if it exists
                if ($department->$field && file_exists(public_path($department->$field))) {
                    unlink(public_path($department->$field));
                }

                // Store new file
                $file = $request->file($field);
                $fileName = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('assets/img/' . $folder), $fileName);
                $validated[$field] = 'assets/img/' . $folder . $fileName;
            }
        }
        // Ensure arrays are stored correctly (as JSON)
        if (!empty($validated['mission_points'])) {
            $validated['mission_points'] = array_values($validated['mission_points']);
        }
        if (!empty($validated['hod_messages'])) {
            $validated['hod_messages'] = array_values($validated['hod_messages']);
        }

        // Update record
        $department->update($validated);

        return redirect()->back()->with('success', 'Department updated successfully.');
    }
}
