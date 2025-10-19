import React, { useEffect, useRef, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { router, usePage } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import _, { set } from "lodash";

const Index = (props) => {
    const { searchTerm, testimonials } = props;
    const [query, setQuery] = useState(searchTerm || "");
    const { flash } = usePage().props;
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [idDelete, setIdDelete] = useState(null);

    //for view modal
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const viewModalInstance = useRef(null);

    // For image modal
    const [selectedImage, setSelectedImage] = useState(null);
    const imageModalRef = useRef(null);
    const imageModalInstance = useRef(null);

    const { get, processing } = useForm();

    const showViewModal = (testimonial) => {
        setSelectedTestimonial(testimonial);
        viewModalInstance.current.show();
    };



    // Toast for flash messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    // Search debounce
    useEffect(() => {
        const delaySearch = _.debounce(() => {
            router.get("testimonial", { search: query }, { preserveState: true, replace: true });
        }, 300);

        delaySearch();
        return () => delaySearch.cancel();
    }, [query]);

    // Initialize modals
    useEffect(() => {
        if (modalRef.current) {
            modalInstance.current = new bootstrap.Modal(modalRef.current);
        }
        if (imageModalRef.current) {
            imageModalInstance.current = new bootstrap.Modal(imageModalRef.current);
        }
    }, []);

    // Delete modal
    const showDeleteModal = (id) => {
        setIdDelete(id);
        modalInstance.current.show();
    };

    const handleConfirmDelete = () => {
        get(route('testimonial.destroy', idDelete), {
            onSuccess: () => {
                modalInstance.current.hide();
                setIdDelete(null);
            }
        });
    };

    // Toggle status
    const toggleStatus = (id) => {
        router.post(route('testimonial.toggleStatus', id), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // Image preview modal
    const showImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        imageModalInstance.current.show();
    };

    return (
        <>
            <h1 className="text-muted">Testimonials List</h1>
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6 col-8">
                            <div className="input-group input-group-merge">
                                <span className="input-group-text" id="basic-addon-search31">
                                    <i className="bx bx-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search By Teatimonial Title..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    aria-label="Search..."
                                    aria-describedby="basic-addon-search31"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-3">
                            <Link
                                href={route('testimonial.create')}
                                className="btn btn-primary float-end"
                                aria-label="Click me"
                            >
                                <i className='bx bx-plus'></i>
                                <span className='d-none d-sm-inline-block'>Add Testimonials</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="table-responsive text-nowrap">
                    <table className="table table-hover my-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Image</th>
                                <th>Display Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {testimonials.data.map((testimonial) => (
                                <tr key={testimonial.id}>
                                    <td><i className="bx bx-category bx-sm me-3"></i>{testimonial.type}</td>
                                    <td><i className="bx bx-heading bx-sm me-3"></i>{testimonial.title}</td>
                                    <td><i className="bx bx-link bx-sm me-3"></i>{testimonial.slug}</td>
                                    <td>
                                        {testimonial.image ? (
                                            <img
                                                src={testimonial.image}
                                                alt="testimonial"
                                                className="img-thumbnail"
                                                style={{
                                                    width: "80px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => showImageModal(testimonial.image)}
                                            />
                                        ) : (
                                            <span className="text-muted">No image</span>
                                        )}
                                    </td>
                                    <td><i className="bx bx-category bx-sm me-3"></i>{testimonial.display_order}</td>
                                    <td>
                                        <span
                                            className={`badge cursor-pointer ${testimonial.status ? "bg-label-success" : "bg-label-danger"}`}
                                            onClick={() => toggleStatus(testimonial.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {testimonial.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Link
                                                className="btn btn-sm btn-outline-primary p-1 m-1"
                                                href={route("testimonial.mapping", testimonial.id)}
                                            >
                                                <span className="tf-icons bx bx-right-arrow-circle bx-18px me-2"></span>Mapping
                                            </Link>
                                            <div className="dropdown">
                                                <button
                                                    aria-label='Click me'
                                                    type="button"
                                                    className="btn btn-outline-secondary p-1 m-1 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        href="#viewDetailsModal"
                                                        data-bs-toggle="modal"
                                                        onClick={() => setSelectedTestimonial(testimonial)}
                                                        className="dropdown-item"
                                                    >
                                                        <i className="bx bx-show me-1"></i> View
                                                    </a>
                                                    <Link
                                                        aria-label="dropdown action option"
                                                        className="dropdown-item"
                                                        href={route("testimonial.edit", testimonial.id)}
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        onClick={() => showDeleteModal(testimonial.id)}
                                                        aria-label="dropdown action option"
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        <i className="bx bx-trash me-1"></i> Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Details Modal */}
            <div
                className="modal fade"
                id="viewDetailsModal"
                aria-labelledby="viewDetailsLabel"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewDetailsLabel">
                                Testimonial Details
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectedTestimonial ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr><th>Type</th><td>{selectedTestimonial.type}</td></tr>
                                            <tr><th>Title</th><td>{selectedTestimonial.title}</td></tr>
                                            <tr><th>Slug</th><td>{selectedTestimonial.slug}</td></tr>
                                            <tr>
                                                <th>Image</th>
                                                <td>
                                                    {selectedTestimonial.image ? (
                                                        <img
                                                            src={selectedTestimonial.image}
                                                            alt={selectedTestimonial.alt_text || 'Testimonial Image'}
                                                            className="img-fluid rounded"
                                                            style={{ maxHeight: "200px" }}
                                                        />
                                                    ) : (
                                                        <span className="text-muted">No image</span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr><th>Alt Text</th><td>{selectedTestimonial.alt_text}</td></tr>
                                            <tr><th>Video URL</th><td>{selectedTestimonial.video_url || "—"}</td></tr>
                                            <tr><th>Short Description</th><td>{selectedTestimonial.short_description}</td></tr>
                                            <tr><th>Description</th><td>{selectedTestimonial.description}</td></tr>
                                            <tr><th>Designation</th><td>{selectedTestimonial.designation}</td></tr>
                                            <tr><th>Company</th><td>{selectedTestimonial.company}</td></tr>
                                            <tr><th>Location</th><td>{selectedTestimonial.location}</td></tr>
                                            <tr><th>Status</th><td>{selectedTestimonial.status ? "Active" : "Inactive"}</td></tr>
                                            <tr><th>Show on Home</th><td>{selectedTestimonial.show_on_home ? "Yes" : "No"}</td></tr>
                                            <tr><th>Display Order</th><td>{selectedTestimonial.display_order}</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>No details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div
                className="modal fade"
                id="deleteConfirmModal"
                aria-labelledby="deleteConfirmLabel"
                tabIndex="-1"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteConfirmLabel">Confirm Deletion</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Testimonial?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleConfirmDelete}
                                disabled={processing}
                            >
                                {processing ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            <div
                className="modal fade"
                id="imagePreviewModal"
                aria-labelledby="imagePreviewLabel"
                tabIndex="-1"
                aria-hidden="true"
                ref={imageModalRef}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="imagePreviewLabel">Testimonial Image</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="testimonial Preview"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "80vh",
                                        borderRadius: "8px"
                                    }}
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {testimonials.links.length > 3 && (
                <div className="row m-2">
                    <div className="col-md-4">
                        <p className="text-dark mb-0 mt-2">
                            Showing {testimonials.from ?? 0} to {testimonials.to ?? 0} of {testimonials.total} entries
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="float-end">
                            <Pagination links={testimonials.links} query={query} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
