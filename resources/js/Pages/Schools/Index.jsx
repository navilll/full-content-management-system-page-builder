import React, { useEffect, useRef, useState } from 'react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';

const Index = (props) => {
    const { searchTerm, schools } = props;
    const { flash } = usePage().props;

    const [query, setQuery] = useState(searchTerm || "");
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const [schoolIdDelete, setSchoolIdDelete] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const imageModalRef = useRef(null);
    const imageModalInstance = useRef(null);

    const { get, processing } = useForm();

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
    }, [flash.success]);

    useEffect(() => {
        const delaySearch = _.debounce(() => {
            router.get("schools", { search: query }, { preserveState: true, replace: true });
        }, 300);
        delaySearch();
        return () => delaySearch.cancel();
    }, [query]);

    useEffect(() => {
        if (modalRef.current) modalInstance.current = new bootstrap.Modal(modalRef.current);
        if (imageModalRef.current) imageModalInstance.current = new bootstrap.Modal(imageModalRef.current);
    }, []);

    const showDeleteModal = (id) => {
        setSchoolIdDelete(id);
        modalInstance.current.show();
    };

    const handleConfirmDelete = () => {
        get(route('schools.destroy', schoolIdDelete), {
            onSuccess: () => {
                modalInstance.current.hide();
                setSchoolIdDelete(null);
            },
        });
    };

    const toggleStatus = (id) => {
        router.post(route('schools.toggleStatus', id), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };
    
    const showImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        imageModalInstance.current.show();
    };

    return (
        <>
            <h1 className="text-muted">Schools List</h1>
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6 col-8">
                            <div className="input-group input-group-merge">
                                <span className="input-group-text"><i className="bx bx-search"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by School Name..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-3">
                            <Link
                                href={route('schools.create')}
                                className="btn btn-primary float-end"
                                aria-label="Click me"
                            >
                                <i className='bx bx-plus'></i>
                                <span className='d-none d-sm-inline-block'>Add School</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="table-responsive text-nowrap">
                    <table className="table table-hover my-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Menu Name</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Display Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.data.map((school) => (
                                <tr key={school.id}>
                                    <td><i className="bx bx-heading bx-sm me-3"></i>{school.name}</td>
                                    <td><i className="bx bx-link bx-sm me-3"></i>{school.slug}</td>
                                    <td><i className="bx bx-navigation bx-sm me-3"></i>{school.menu_name}</td>
                                    <td>
                                        {school.image ? (
                                            <img
                                                src={school.image}
                                                alt="School"
                                                className="img-thumbnail"
                                                style={{ width: "80px", height: "50px", objectFit: "cover", cursor: "pointer" }}
                                                onClick={() => showImageModal(school.image)}
                                            />
                                        ) : (
                                            <span className="text-muted">No image</span>
                                        )}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge cursor-pointer ${school.status ? "bg-label-success" : "bg-label-danger"}`}
                                            onClick={() => toggleStatus(school.id)}
                                        >
                                            {school.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td><i className="bx bx-category bx-sm me-3"></i>{school.display_order ?? "-"}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <Link
                                                href={route('school.section.create', school.id)}
                                                method="get"
                                                as="button"
                                                className="btn btn-sm btn-outline-primary p-1 m-1"
                                            >
                                                <span class="tf-icons bx bx-right-arrow-circle bx-18px me-2"></span>Sections
                                            </Link>
                                            <div className="dropdown">
                                                <button aria-label='Click me' type="button" className="btn btn-outline-secondary p-1 m-1 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" href={route("schools.edit", school.id)}>
                                                        <i className="bx bx-edit-alt me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={() => showDeleteModal(school.id)}
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

            {/* Delete Modal */}
            <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this School?</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button
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
            <div className="modal fade" ref={imageModalRef} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Image Preview</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body text-center">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="School Preview"
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
            {schools.links.length > 3 && (
                <div className="row m-2">
                    <div className="col-md-4">
                        <p className="text-dark mb-0 mt-2">
                            Showing {schools.from ?? 0} to {schools.to ?? 0} of {schools.total} entries
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="float-end">
                            <Pagination links={schools.links} query={query} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Index;
