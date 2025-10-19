import React, { useEffect, useRef, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { router, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

const Index = (props) => {
    const { searchTerm, happenings } = props;
    const [query, setQuery] = useState(searchTerm || "");
    const { flash } = usePage().props;
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [idDelete, setIdDelete] = useState(null);

    // View modal
    const [selectedHappening, setSelectedHappening] = useState(null);
    const viewModalInstance = useRef(null);

    // Image modal
    const [selectedImage, setSelectedImage] = useState(null);
    const imageModalRef = useRef(null);
    const imageModalInstance = useRef(null);

    const { get, processing } = useForm();

    // Toast for flash messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    // Search debounce
    useEffect(() => {
        const delaySearch = _.debounce(() => {
            router.get("happening", { search: query }, { preserveState: true, replace: true });
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
        get(route("happening.destroy", idDelete), {
            onSuccess: () => {
                modalInstance.current.hide();
                setIdDelete(null);
            },
        });
    };

    // Toggle status
    const toggleStatus = (id) => {
        router.post(route("happening.toggleStatus", id), {}, {
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
            <h1 className="text-muted">Happenings List</h1>
            <ToastContainer />

            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6 col-8">
                            <div className="input-group input-group-merge">
                                <span className="input-group-text">
                                    <i className="bx bx-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by Happening Title..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-3">
                            <Link
                                href={route("happening.create")}
                                className="btn btn-primary float-end"
                            >
                                <i className="bx bx-plus"></i>
                                <span className="d-none d-sm-inline-block">Add Happening</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="table-responsive text-nowrap">
                    <table className="table table-hover my-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Upcoming Event</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Image</th>
                                <th>Display Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {happenings.data.map((happening) => (
                                <tr key={happening.id}>
                                    <td><i className="bx bx-party bx-sm me-3"></i>{happening.event_type}</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                happening.upcoming_event ? "bg-label-warning" : "bg-label-secondary"
                                            }`}
                                        >
                                            {happening.upcoming_event ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td><i className="bx bx-heading bx-sm me-3"></i>{happening.title}</td>
                                    <td><i className="bx bx-link bx-sm me-3"></i>{happening.slug}</td>
                                    <td>
                                        {happening.image ? (
                                            <img
                                                src={happening.image}
                                                alt="happening"
                                                className="img-thumbnail"
                                                style={{
                                                    width: "80px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => showImageModal(happening.image)}
                                            />
                                        ) : (
                                            <span className="text-muted">No image</span>
                                        )}
                                    </td>
                                    <td><i className="bx bx-category bx-sm me-3"></i>{happening.display_order}</td>
                                    <td>
                                        <span
                                            className={`badge cursor-pointer ${
                                                happening.status ? "bg-label-success" : "bg-label-danger"
                                            }`}
                                            onClick={() => toggleStatus(happening.id)}
                                        >
                                            {happening.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <Link
                                                className="btn btn-sm btn-outline-primary p-1"
                                                href={route("happening.mapping", happening.id)}
                                            >
                                                <span className="tf-icons bx bx-right-arrow-circle bx-18px me-1"></span>
                                                Mapping
                                            </Link>

                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-secondary p-1 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a
                                                        href="#viewDetailsModal"
                                                        data-bs-toggle="modal"
                                                        onClick={() => setSelectedHappening(happening)}
                                                        className="dropdown-item"
                                                    >
                                                        <i className="bx bx-show me-1"></i> View
                                                    </a>
                                                    <Link
                                                        className="dropdown-item"
                                                        href={route("happening.edit", happening.id)}
                                                    >
                                                        <i className="bx bx-edit-alt me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        onClick={() => showDeleteModal(happening.id)}
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

            {/* View Modal */}
            <div className="modal fade" id="viewDetailsModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Happening Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {selectedHappening ? (
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr><th>Type</th><td>{selectedHappening.event_type}</td></tr>
                                        <tr><th>Title</th><td>{selectedHappening.title}</td></tr>
                                        <tr><th>Slug</th><td>{selectedHappening.slug}</td></tr>
                                        <tr><th>Alt Image Text</th><td>{selectedHappening.alt_text || "—"}</td></tr>
                                        <tr>
                                            <th>Image</th>
                                            <td>
                                                {selectedHappening.image ? (
                                                    <img
                                                        src={selectedHappening.image}
                                                        alt="Happening"
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: "200px" }}
                                                    />
                                                ) : (
                                                    <span>No image</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Banner Image</th>
                                            <td>
                                                {selectedHappening.banner_images ? (
                                                    <img
                                                        src={selectedHappening.banner_images}
                                                        alt="Happening"
                                                        className="img-fluid rounded"
                                                        style={{ maxHeight: "200px" }}
                                                    />
                                                ) : (
                                                    <span>No Banner image</span>
                                                )}
                                            </td>
                                        </tr>
                                        <tr><th>Video Url</th><td>{selectedHappening.video || "—"}</td></tr>
                                        <tr><th>PDF Title</th><td>{selectedHappening.pdf_title || "—"}</td></tr>
                                        <tr><th>PDF Url</th><td><a href={selectedHappening.pdf} target="_blank" rel="noopener noreferrer">{selectedHappening.pdf || "—"}</a></td></tr>
                                        <tr><th>Event From</th><td>{selectedHappening.event_date_from || "—"}</td></tr>
                                        <tr><th>Event To</th><td>{selectedHappening.event_date_to || "—"}</td></tr>
                                        <tr><th>Short Description</th><td>{selectedHappening.short_description || "—"}</td></tr>
                                        <tr><th>Description</th><td>{selectedHappening.description || "—"}</td></tr>
                                        <tr><th>Status</th><td>{selectedHappening.status ? "Active" : "Inactive"}</td></tr>
                                        <tr><th>Show Home</th><td>{selectedHappening.show_home ? "Yes" : "No"}</td></tr>
                                        <tr><th>Display Order</th><td>{selectedHappening.display_order}</td></tr>
                                    </tbody>
                                </table>
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
                tabIndex="-1"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this Happening?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleConfirmDelete}
                                disabled={processing}
                            >
                                {processing ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            <div
                className="modal fade"
                id="imagePreviewModal"
                tabIndex="-1"
                aria-hidden="true"
                ref={imageModalRef}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Happening Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Happening Preview"
                                    style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px" }}
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {happenings.links.length > 3 && (
                <div className="row m-2">
                    <div className="col-md-4">
                        <p className="text-dark mb-0 mt-2">
                            Showing {happenings.from ?? 0} to {happenings.to ?? 0} of {happenings.total} entries
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="float-end">
                            <Pagination links={happenings.links} query={query} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
