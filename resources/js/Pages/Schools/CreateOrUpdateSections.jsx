import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Create = ({ school }) => {

    const { data, setData, post, progress, processing,errors } = useForm({
        // About School Section
        about_school_title: school.about_school_title || "",
        about_school_subtitle: school.about_school_subtitle || "",
        about_school_description: school.about_school_description || "",
        about_school_url: school.about_school_url || "",
        about_school_chancellor_img: "",
        about_school_chancellor_logo: "",
        about_school_logo_content: school.about_school_logo_content || "",
        about_school_stats_number: school.about_school_stats_number || "",
        about_school_stats_content: school.about_school_stats_content || "",
        highlight_1_rank: school.highlight_1_rank || "",
        highlight_1_text: school.highlight_1_text || "",
        highlight_1_source: school.highlight_1_source || "",
        button_1_text: school.button_1_text || "",
        button_1_url: school.button_1_url || "",
        button_2_text: school.button_2_text || "",
        button_2_url: school.button_2_url || "",
        button_3_text: school.button_3_text || "",
        button_3_url: school.button_3_url || "",

        // School Department Section
        department_title: school.department_title || "",
        department_desc: school.department_desc || "",
        department_programs_count: school.department_programs_count || "",
        department_programs_text: school.department_programs_text || "",
        department_button_1_text: school.department_button_1_text || "",
        department_button_1_url: school.department_button_1_url || "",
        department_button_2_text: school.department_button_2_text || "",
        department_button_2_url: school.department_button_2_url || "",

        // Placement Section
        placement_title: school.placement_title || "",
        placement_subtitle: school.placement_subtitle || "",
        hall_of_fame_image: "",
        hall_of_fame_heading: school.hall_of_fame_heading || "",
        hall_of_fame_url: school.hall_of_fame_url || "",

        // Testimonial Section
        testimonial_title: school.testimonial_title || "",
        testimonial_subtitle: school.testimonial_subtitle || "",

        // Happening Section
        happening_title: school.happening_title || "",
        happening_subtitle: school.happening_subtitle || "",
    });

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    const submit = (e) => {
        e.preventDefault();
        post(route("school.section.update", school.id));
    };

    return (
        <>
            <ToastContainer />
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="mb-0">
                    Add / Edit School Sections —{" "}
                    <span className="text-primary">{school.name}</span>
                </h4>
            </div>

            <form onSubmit={submit} encType="multipart/form-data">
                <div className="nav-align-top mb-4">
                    {/* ================== TABS ================== */}
                    <ul className="nav nav-pills mb-3 nav-fill" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link active" data-bs-toggle="tab"
                                data-bs-target="#tab-about" role="tab" aria-selected="true">
                                <i className="tf-icons bx bx-home me-1"></i> About School
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-department" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-building me-1"></i> Departments
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-placement" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-briefcase me-1"></i> Placement
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-testimonial" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-chat me-1"></i> Testimonials
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button type="button" className="nav-link" data-bs-toggle="tab"
                                data-bs-target="#tab-happening" role="tab" aria-selected="false">
                                <i className="tf-icons bx bx-calendar-event me-1"></i> Happenings
                            </button>
                        </li>
                    </ul>

                    {/* ================== TAB CONTENT ================== */}
                    <div className="tab-content">

                        {/* ========== ABOUT SCHOOL TAB ========== */}
                        <div className="tab-pane fade show active" id="tab-about" role="tabpanel">
                            <div className="row">
                                {/* Title */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="about_school_title" className="form-label">Title</label>
                                    <input
                                        id="about_school_title"
                                        type="text"
                                        className={`form-control ${errors.about_school_title ? 'is-invalid' : ''}`}
                                        value={data.about_school_title}
                                        onChange={(e) => setData("about_school_title", e.target.value)}
                                    />
                                    {errors.about_school_title && <div className="form-text text-danger">{errors.about_school_title}</div>}
                                </div>

                                {/* Subtitle */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="about_school_subtitle" className="form-label">Subtitle</label>
                                    <input
                                        id="about_school_subtitle"
                                        type="text"
                                        className={`form-control ${errors.about_school_subtitle ? 'is-invalid' : ''}`}
                                        value={data.about_school_subtitle}
                                        onChange={(e) => setData("about_school_subtitle", e.target.value)}
                                    />
                                    {errors.about_school_subtitle && <div className="form-text text-danger">{errors.about_school_subtitle}</div>}
                                </div>

                                {/* Description */}
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="about_school_description" className="form-label">Description</label>
                                    <textarea
                                        id="about_school_description"
                                        className={`form-control ${errors.about_school_description ? 'is-invalid' : ''}`}
                                        rows="3"
                                        value={data.about_school_description}
                                        onChange={(e) => setData("about_school_description", e.target.value)}
                                    />
                                    {errors.about_school_description && <div className="form-text text-danger">{errors.about_school_description}</div>}
                                </div>

                                {/* Chancellor Image */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="about_school_chancellor_img" className="form-label">Chancellor Image</label>
                                    <input
                                        id="about_school_chancellor_img"
                                        type="file"
                                        accept="image/*"
                                        className={`form-control ${errors.about_school_chancellor_img ? 'is-invalid' : ''}`}
                                        onChange={(e) => setData("about_school_chancellor_img", e.target.files[0])}
                                    />
                                    {errors.about_school_chancellor_img && <div className="form-text text-danger">{errors.about_school_chancellor_img}</div>}
                                </div>

                                {/* Chancellor Logo */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="about_school_chancellor_logo" className="form-label">Chancellor Logo</label>
                                    <input
                                        id="about_school_chancellor_logo"
                                        type="file"
                                        accept="image/*"
                                        className={`form-control ${errors.about_school_chancellor_logo ? 'is-invalid' : ''}`}
                                        onChange={(e) => setData("about_school_chancellor_logo", e.target.files[0])}
                                    />
                                    {errors.about_school_chancellor_logo && <div className="form-text text-danger">{errors.about_school_chancellor_logo}</div>}
                                </div>

                                {/* Logo Content */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="about_school_logo_content" className="form-label">Logo Content</label>
                                    <input
                                        id="about_school_logo_content"
                                        type="text"
                                        className={`form-control ${errors.about_school_logo_content ? 'is-invalid' : ''}`}
                                        value={data.about_school_logo_content}
                                        onChange={(e) => setData("about_school_logo_content", e.target.value)}
                                    />
                                    {errors.about_school_logo_content && <div className="form-text text-danger">{errors.about_school_logo_content}</div>}
                                </div>

                                {/* Stats */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="about_school_stats_number" className="form-label">Stats Number</label>
                                    <input
                                        id="about_school_stats_number"
                                        type="text"
                                        className={`form-control ${errors.about_school_stats_number ? 'is-invalid' : ''}`}
                                        value={data.about_school_stats_number}
                                        onChange={(e) => setData("about_school_stats_number", e.target.value)}
                                    />
                                    {errors.about_school_stats_number && <div className="form-text text-danger">{errors.about_school_stats_number}</div>}
                                </div>

                                <div className="mb-3 col-md-3">
                                    <label htmlFor="about_school_stats_content" className="form-label">Stats Content</label>
                                    <input
                                        id="about_school_stats_content"
                                        type="text"
                                        className={`form-control ${errors.about_school_stats_content ? 'is-invalid' : ''}`}
                                        value={data.about_school_stats_content}
                                        onChange={(e) => setData("about_school_stats_content", e.target.value)}
                                    />
                                    {errors.about_school_stats_content && <div className="form-text text-danger">{errors.about_school_stats_content}</div>}
                                </div>

                                {/* Highlights */}
                                <div className="col-12 mt-3"><h6>Highlights</h6></div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="highlight_1_rank" className="form-label">Rank</label>
                                    <input
                                        id="highlight_1_rank"
                                        type="text"
                                        className={`form-control ${errors.highlight_1_rank ? 'is-invalid' : ''}`}
                                        value={data.highlight_1_rank}
                                        onChange={(e) => setData("highlight_1_rank", e.target.value)}
                                    />
                                    {errors.highlight_1_rank && <div className="form-text text-danger">{errors.highlight_1_rank}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="highlight_1_text" className="form-label">Text</label>
                                    <input
                                        id="highlight_1_text"
                                        type="text"
                                        className={`form-control ${errors.highlight_1_text ? 'is-invalid' : ''}`}
                                        value={data.highlight_1_text}
                                        onChange={(e) => setData("highlight_1_text", e.target.value)}
                                    />
                                    {errors.highlight_1_text && <div className="form-text text-danger">{errors.highlight_1_text}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label htmlFor="highlight_1_source" className="form-label">Source</label>
                                    <input
                                        id="highlight_1_source"
                                        type="text"
                                        className={`form-control ${errors.highlight_1_source ? 'is-invalid' : ''}`}
                                        value={data.highlight_1_source}
                                        onChange={(e) => setData("highlight_1_source", e.target.value)}
                                    />
                                    {errors.highlight_1_source && <div className="form-text text-danger">{errors.highlight_1_source}</div>}
                                </div>

                                {/* Buttons */}
                                <div className="col-12 mt-3"><h6>Buttons</h6></div>
                                {[1, 2, 3].map((num) => (
                                    <div key={num} className="col-md-4 mb-3">
                                        <label htmlFor={`button_${num}_text`} className="form-label">Button {num} Text</label>
                                        <input
                                            id={`button_${num}_text`}
                                            type="text"
                                            className={`form-control ${errors[`button_${num}_text`] ? 'is-invalid' : ''}`}
                                            value={data[`button_${num}_text`]}
                                            onChange={(e) => setData(`button_${num}_text`, e.target.value)}
                                        />
                                        {errors[`button_${num}_text`] && <div className="form-text text-danger">{errors[`button_${num}_text`]}</div>}

                                        <label htmlFor={`button_${num}_url`} className="form-label mt-2">Button {num} URL</label>
                                        <input
                                            id={`button_${num}_url`}
                                            type="url"
                                            className={`form-control ${errors[`button_${num}_url`] ? 'is-invalid' : ''}`}
                                            value={data[`button_${num}_url`]}
                                            onChange={(e) => setData(`button_${num}_url`, e.target.value)}
                                        />
                                        {errors[`button_${num}_url`] && <div className="form-text text-danger">{errors[`button_${num}_url`]}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ========== DEPARTMENT TAB ========== */}
                        <div className="tab-pane fade" id="tab-department" role="tabpanel">
                            <div className="row">
                                {/* Title */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="department_title" className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="department_title"
                                        value={data.department_title}
                                        onChange={(e) => setData("department_title", e.target.value)}
                                    />
                                    {errors.department_title && (
                                        <div className="form-text text-danger">{errors.department_title}</div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="department_desc" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        id="department_desc"
                                        value={data.department_desc}
                                        onChange={(e) => setData("department_desc", e.target.value)}
                                    ></textarea>
                                    {errors.department_desc && (
                                        <div className="form-text text-danger">{errors.department_desc}</div>
                                    )}
                                </div>

                                {/* Programs Count */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_programs_count" className="form-label">Programs Count</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="department_programs_count"
                                        value={data.department_programs_count}
                                        onChange={(e) => setData("department_programs_count", e.target.value)}
                                    />
                                    {errors.department_programs_count && (
                                        <div className="form-text text-danger">{errors.department_programs_count}</div>
                                    )}
                                </div>

                                {/* Programs Text */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_programs_text" className="form-label">Programs Text</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="department_programs_text"
                                        value={data.department_programs_text}
                                        onChange={(e) => setData("department_programs_text", e.target.value)}
                                    />
                                    {errors.department_programs_text && (
                                        <div className="form-text text-danger">{errors.department_programs_text}</div>
                                    )}
                                </div>

                                {/* Button 1 */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_button_1_text" className="form-label">Button 1 Text</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="department_button_1_text"
                                        value={data.department_button_1_text}
                                        onChange={(e) => setData("department_button_1_text", e.target.value)}
                                    />
                                    {errors.department_button_1_text && (
                                        <div className="form-text text-danger">{errors.department_button_1_text}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_button_1_url" className="form-label">Button 1 URL</label>
                                    <input
                                        className="form-control"
                                        type="url"
                                        id="department_button_1_url"
                                        value={data.department_button_1_url}
                                        onChange={(e) => setData("department_button_1_url", e.target.value)}
                                    />
                                    {errors.department_button_1_url && (
                                        <div className="form-text text-danger">{errors.department_button_1_url}</div>
                                    )}
                                </div>

                                {/* Button 2 */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_button_2_text" className="form-label">Button 2 Text</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="department_button_2_text"
                                        value={data.department_button_2_text}
                                        onChange={(e) => setData("department_button_2_text", e.target.value)}
                                    />
                                    {errors.department_button_2_text && (
                                        <div className="form-text text-danger">{errors.department_button_2_text}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="department_button_2_url" className="form-label">Button 2 URL</label>
                                    <input
                                        className="form-control"
                                        type="url"
                                        id="department_button_2_url"
                                        value={data.department_button_2_url}
                                        onChange={(e) => setData("department_button_2_url", e.target.value)}
                                    />
                                    {errors.department_button_2_url && (
                                        <div className="form-text text-danger">{errors.department_button_2_url}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ========== PLACEMENT TAB ========== */}
                        <div className="tab-pane fade" id="tab-placement" role="tabpanel">
                            <div className="row">
                                {/* Title */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="placement_title" className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="placement_title"
                                        value={data.placement_title}
                                        onChange={(e) => setData("placement_title", e.target.value)}
                                    />
                                    {errors.placement_title && (
                                        <div className="form-text text-danger">{errors.placement_title}</div>
                                    )}
                                </div>

                                {/* Subtitle */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="placement_subtitle" className="form-label">Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="placement_subtitle"
                                        value={data.placement_subtitle}
                                        onChange={(e) => setData("placement_subtitle", e.target.value)}
                                    />
                                    {errors.placement_subtitle && (
                                        <div className="form-text text-danger">{errors.placement_subtitle}</div>
                                    )}
                                </div>

                                {/* Hall of Fame Image */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="hall_of_fame_image" className="form-label">Hall of Fame Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="hall_of_fame_image"
                                        accept="image/*"
                                        onChange={(e) => setData("hall_of_fame_image", e.target.files[0])}
                                    />
                                    {errors.hall_of_fame_image && (
                                        <div className="form-text text-danger">{errors.hall_of_fame_image}</div>
                                    )}
                                </div>

                                {/* Heading */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="hall_of_fame_heading" className="form-label">Heading</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="hall_of_fame_heading"
                                        value={data.hall_of_fame_heading}
                                        onChange={(e) => setData("hall_of_fame_heading", e.target.value)}
                                    />
                                    {errors.hall_of_fame_heading && (
                                        <div className="form-text text-danger">{errors.hall_of_fame_heading}</div>
                                    )}
                                </div>

                                {/* URL */}
                                <div className="mb-3 col-md-3">
                                    <label htmlFor="hall_of_fame_url" className="form-label">URL</label>
                                    <input
                                        className="form-control"
                                        type="url"
                                        id="hall_of_fame_url"
                                        value={data.hall_of_fame_url}
                                        onChange={(e) => setData("hall_of_fame_url", e.target.value)}
                                    />
                                    {errors.hall_of_fame_url && (
                                        <div className="form-text text-danger">{errors.hall_of_fame_url}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ========== TESTIMONIAL TAB ========== */}
                        <div className="tab-pane fade" id="tab-testimonial" role="tabpanel">
                            <div className="row">
                                {/* Title */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="testimonial_title" className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="testimonial_title"
                                        value={data.testimonial_title}
                                        onChange={(e) => setData("testimonial_title", e.target.value)}
                                    />
                                    {errors.testimonial_title && (
                                        <div className="form-text text-danger">{errors.testimonial_title}</div>
                                    )}
                                </div>

                                {/* Subtitle */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="testimonial_subtitle" className="form-label">Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="testimonial_subtitle"
                                        value={data.testimonial_subtitle}
                                        onChange={(e) => setData("testimonial_subtitle", e.target.value)}
                                    />
                                    {errors.testimonial_subtitle && (
                                        <div className="form-text text-danger">{errors.testimonial_subtitle}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ========== HAPPENING TAB ========== */}
                        <div className="tab-pane fade" id="tab-happening" role="tabpanel">
                            <div className="row">
                                {/* Title */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="happening_title" className="form-label">Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="happening_title"
                                        value={data.happening_title}
                                        onChange={(e) => setData("happening_title", e.target.value)}
                                    />
                                    {errors.happening_title && (
                                        <div className="form-text text-danger">{errors.happening_title}</div>
                                    )}
                                </div>

                                {/* Subtitle */}
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="happening_subtitle" className="form-label">Subtitle</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="happening_subtitle"
                                        value={data.happening_subtitle}
                                        onChange={(e) => setData("happening_subtitle", e.target.value)}
                                    />
                                    {errors.happening_subtitle && (
                                        <div className="form-text text-danger">{errors.happening_subtitle}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ========== SUBMIT BUTTON ========== */}
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary" disabled={processing}>
                        {processing ? "Saving..." : "Submit"}
                    </button>
                    {progress && (
                        <div className="progress mt-2">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${progress.percentage}%` }}
                            >
                                {progress.percentage}%
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default Create;
