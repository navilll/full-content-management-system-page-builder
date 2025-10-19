import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';

const Mapping = ({ testimonial, schools, pages }) => {
    // initialize form with school_ids and page_ids
    const { data, setData, post, processing, errors } = useForm({
        school_ids: testimonial.schools?.map((s) => s.id) || [],
        page_ids: testimonial.pages?.map((p) => p.id) || [],
    });

    // toggle selection for schools or pages
    const toggleItem = (id, field) => {
        const ids = data[field];
        setData(
            field,
            ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
        );
    };

    const { flash } = usePage().props;
    // Toast for flash messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("testimonial.mapping.attach", testimonial.id), {
            preserveScroll: true,
        });
    };

    const renderTransferList = (items, field, label) => (
        <div className="col-md-6 mb-3">
            <h6 className="fw-bold mb-2">{label}</h6>
            <div className="border rounded p-2" style={{ minHeight: 250 }}>
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => toggleItem(item.id, field)}
                        className={`p-2 mb-1 rounded d-flex justify-content-between align-items-center ${
                            data[field].includes(item.id)
                                ? "bg-primary text-white"
                                : "bg-light"
                        }`}
                        style={{ cursor: "pointer" }}
                    >
                        <span>{item.name || item.title}</span>
                        {data[field].includes(item.id) && (
                            <i className="bi bi-check-lg"></i>
                        )}
                    </div>
                ))}
            </div>
            {errors[field] && (
                <div className="text-danger small mt-1">{errors[field]}</div>
            )}
        </div>
    );

    return (
        <div className="container py-4">
            <ToastContainer />
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h5>
                        Map testimonial:{" "}
                        <span className="text-grey">{testimonial.title}</span>
                    </h5>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {renderTransferList(schools, "school_ids", "🎓 Schools")}
                            {renderTransferList(pages, "page_ids", "📄 Pages")}
                        </div>

                        <div className="text-end mt-4">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Save Mapping"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mapping;
