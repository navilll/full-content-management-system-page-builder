import { useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Section = ({ department }) => {
    const { data, setData, post, progress, errors, processing } = useForm({
        // Tab 1 fields
        title: department.title || "",
        subtitle: department.subtitle || "",
        description: department.description || "",
        vision_title: department.vision_title || "Vision",
        vision_description: department.vision_description || "",
        mission_title: department.mission_title || "Mission",
        mission_points: department.mission_points || [""],
        image: department.image || "",
        status: 1,

        // Tab 2 fields (Dean/HOD Message)
        hod_name: department.hod_name || "",
        hod_designation: department.hod_designation || "Head of the Department",
        hod_messages: department.hod_messages || [""],
        hod_image: department.hod_image || "",

        // Tab 3 fields (Courses)
        courses_title: department.courses_title || "Courses Offered",
        courses_image: department.courses_image || "",

        // Tab 4 fields (Faculty)
        faculty_title: department.faculty_title || "Our Faculty",
        faculty_subtitle: department.faculty_subtitle || "Meet Our Expert Faculty",

        // Tab 5 fields (Laboratories)
        lab_title: department.lab_title || "Our Laboratories",
        lab_subtitle: department.lab_subtitle || "Explore Our Advanced Labs",

        // Tab 6 fields (Happening)
        happening_title: department.happening_title || "What's Happening",
        happening_subtitle: department.happening_subtitle || "Latest Events & News",
    });
    
    const fileInputRef = useRef(null);
    const hodFileInputRef = useRef(null);
    const coursesFileInputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        post(route("department.section.update", department.id));
    };

    const { flash } = usePage().props;
    // ✅ Toast messages
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    // Handle mission point change
    const handleMissionPointChange = (index, value) => {
        const newPoints = [...data.mission_points];
        newPoints[index] = value;
        setData("mission_points", newPoints);
    };

    const addMissionPoint = () => setData("mission_points", [...data.mission_points, ""]);
    const removeMissionPoint = (index) =>
        setData("mission_points", data.mission_points.filter((_, i) => i !== index));

    // Handle HOD message change
    const handleHodMessageChange = (index, value) => {
        const newMessages = [...data.hod_messages];
        newMessages[index] = value;
        setData("hod_messages", newMessages);
    };

    const addHodMessage = () => setData("hod_messages", [...data.hod_messages, ""]);
    
    const removeHodMessage = (index) => {
        if (data.hod_messages.length > 1) {
            setData("hod_messages", data.hod_messages.filter((_, i) => i !== index));
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="mb-0">
                    Add / Edit Department Sections —{" "}
                    <span className="text-primary">{department.name}</span>
                </h4>
            </div>
            <form onSubmit={submit} encType="multipart/form-data">
                <div className="nav-align-top mb-4">
                    {/* ================== TABS ================== */}
                    <ul className="nav nav-pills mb-3 nav-fill" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link active" data-bs-toggle="tab"
                                data-bs-target="#tab-about" role="tab" aria-selected="true">
                                <i className="tf-icons bx bx-home me-1"></i> About Department
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-dean" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-building me-1"></i> Dean Message
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-courses" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-briefcase me-1"></i> Courses
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-faculty" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-chat me-1"></i> Faculty
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-lab" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-calendar-event me-1"></i> Laboratories
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-happening" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-calendar-event me-1"></i> Happening
                            </button>
                        </li>
                    </ul>

                    {/* ================== TAB CONTENT ================== */}
                    <div className="tab-content">

                        {/* ========== ABOUT DEPARTMENT TAB ========== */}
                        <div className="tab-pane fade show active" id="tab-about" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="title" className="form-label">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="title"
                                        placeholder="COMPUTER SCIENCE & ENGINEERING"
                                        value={data.title}
                                        onChange={(e) => setData("title", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.title}</div>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="subtitle" className="form-label">Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="subtitle"
                                        placeholder="ABOUT DEPARTMENT OF"
                                        value={data.subtitle}
                                        onChange={(e) => setData("subtitle", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.subtitle}</div>
                                </div>

                                <div className="mb-3 col-md-12">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                    ></textarea>
                                    <div className="form-text text-danger">{errors.description}</div>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label className="form-label" htmlFor="image">Department Image</label>
                                    <input
                                        type="file"
                                        id="image"
                                        className="form-control"
                                        ref={fileInputRef}
                                        onChange={(e) => setData("image", e.target.files[0])}
                                        accept="image/png, image/jpeg"
                                    />
                                    <div className="form-text text-danger">{errors.image}</div>
                                </div>

                                {/* Vision Section */}
                                <div className="col-12 mt-4">
                                    <h5>Vision</h5>
                                </div>
                                <div className="mb-3 col-md-12">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={data.vision_title}
                                        onChange={(e) => setData("vision_title", e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={data.vision_description}
                                        onChange={(e) => setData("vision_description", e.target.value)}
                                    ></textarea>
                                </div>

                                {/* Mission Section */}
                                <div className="col-12 mt-4">
                                    <h5>Mission</h5>
                                </div>
                                <div className="mb-3 col-md-12">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={data.mission_title}
                                        onChange={(e) => setData("mission_title", e.target.value)}
                                    />
                                </div>

                                <div className="col-12">
                                    {data.mission_points.map((point, index) => (
                                        <div key={index} className="d-flex gap-2 mb-2">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={`Mission Point ${index + 1}`}
                                                value={point}
                                                onChange={(e) => handleMissionPointChange(index, e.target.value)}
                                            />
                                            {data.mission_points.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => removeMissionPoint(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm mt-2"
                                        onClick={addMissionPoint}
                                    >
                                        + Add Mission Point
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ========== Dean TAB ========== */}
                        <div className="tab-pane fade" id="tab-dean" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="hod_name" className="form-label">HOD Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="hod_name"
                                        placeholder="Dr. Dhiraj Pandey"
                                        value={data.hod_name}
                                        onChange={(e) => setData("hod_name", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.hod_name}</div>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="hod_designation" className="form-label">Designation</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="hod_designation"
                                        value={data.hod_designation}
                                        onChange={(e) => setData("hod_designation", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.hod_designation}</div>
                                </div>

                                {/* Dynamic HOD Messages */}
                                <div className="col-12">
                                    <label className="form-label">HOD Messages</label>
                                    {data.hod_messages.map((message, index) => (
                                        <div key={index} className="d-flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={`Enter HOD message ${index + 1}...`}
                                                value={message}
                                                onChange={(e) => handleHodMessageChange(index, e.target.value)}
                                            />
                                            {data.hod_messages.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger align-self-start"
                                                    onClick={() => removeHodMessage(index)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={addHodMessage}
                                    >
                                        + Add Another Message
                                    </button>
                                    <div className="form-text text-danger">{errors.hod_messages}</div>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="hod_image" className="form-label">HOD Image</label>
                                    <input
                                        type="file"
                                        id="hod_image"
                                        className="form-control"
                                        ref={hodFileInputRef}
                                        onChange={(e) => setData("hod_image", e.target.files[0])}
                                        accept="image/png, image/jpeg"
                                    />
                                    <div className="form-text text-danger">{errors.hod_image}</div>
                                </div>
                            </div>
                        </div>

                        {/* ========== COURSES TAB ========== */}
                        <div className="tab-pane fade" id="tab-courses" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="courses_title" className="form-label">Courses Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="courses_title"
                                        placeholder="Courses Offered"
                                        value={data.courses_title}
                                        onChange={(e) => setData("courses_title", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.courses_title}</div>
                                </div>

                                <div className="mb-3 col-md-6">
                                    <label htmlFor="courses_image" className="form-label">Courses Image</label>
                                    <input
                                        type="file"
                                        id="courses_image"
                                        className="form-control"
                                        ref={coursesFileInputRef}
                                        onChange={(e) => setData("courses_image", e.target.files[0])}
                                        accept="image/png, image/jpeg"
                                    />
                                    <div className="form-text text-danger">{errors.courses_image}</div>
                                </div>
                            </div>
                        </div>

                        {/* ========== FACULTY TAB ========== */}
                        <div className="tab-pane fade" id="tab-faculty" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="faculty_title" className="form-label">Faculty Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="faculty_title"
                                        placeholder="Our Faculty"
                                        value={data.faculty_title}
                                        onChange={(e) => setData("faculty_title", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.faculty_title}</div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="faculty_subtitle" className="form-label">Faculty Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="faculty_subtitle"
                                        placeholder="Meet Our Expert Faculty"
                                        value={data.faculty_subtitle}
                                        onChange={(e) => setData("faculty_subtitle", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.faculty_subtitle}</div>
                                </div>
                            </div>
                        </div>

                        {/* ========== LAB TAB ========== */}
                        <div className="tab-pane fade" id="tab-lab" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="lab_title" className="form-label">Laboratory Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="lab_title"
                                        placeholder="Our Laboratories"
                                        value={data.lab_title}
                                        onChange={(e) => setData("lab_title", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.lab_title}</div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="lab_subtitle" className="form-label">Laboratory Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="lab_subtitle"
                                        placeholder="Explore Our Advanced Labs"
                                        value={data.lab_subtitle}
                                        onChange={(e) => setData("lab_subtitle", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.lab_subtitle}</div>
                                </div>
                            </div>
                        </div>

                        {/* ========== HAPPENING TAB ========== */}
                        <div className="tab-pane fade" id="tab-happening" role="tabpanel">
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="happening_title" className="form-label">Happening Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="happening_title"
                                        placeholder="What's Happening"
                                        value={data.happening_title}
                                        onChange={(e) => setData("happening_title", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.happening_title}</div>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="happening_subtitle" className="form-label">Happening Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="happening_subtitle"
                                        placeholder="Latest Events & News"
                                        value={data.happening_subtitle}
                                        onChange={(e) => setData("happening_subtitle", e.target.value)}
                                    />
                                    <div className="form-text text-danger">{errors.happening_subtitle}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Department'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Section;