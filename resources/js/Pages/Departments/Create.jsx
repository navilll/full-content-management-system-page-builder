import { useForm } from "@inertiajs/react";
import React, { useRef } from "react";

const Create = () => {
    const { data, setData, post, progress, errors, processing } = useForm({
        name: "",
        menu_name: "",
        name_short: "",
        short_description: "",
        slug: "",
        display_order: 100,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("department.store"));
    };

    return (
        <>
            <h1 className="text-muted">Create Department</h1>
            <div className="card mb-4">
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="card-body">
                        <div className="row">
                            {/* ================== BASIC INFO ================== */}
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Department Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                <div className="form-text text-danger">{errors.name}</div>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label">Menu Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={data.menu_name}
                                    onChange={(e) => setData("menu_name", e.target.value)}
                                />
                                <div className="form-text text-danger">{errors.menu_name}</div>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label">Short Name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={data.name_short}
                                    onChange={(e) => setData("name_short", e.target.value)}
                                />
                                <div className="form-text text-danger">{errors.name_short}</div>
                            </div>

                            <div className="mb-3 col-md-6">
                                <label className="form-label">Slug</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData("slug", e.target.value)}
                                />
                                <div className="form-text text-danger">{errors.slug}</div>
                            </div>

                            <div className="mb-3 col-md-3">
                                <label className="form-label">Display Order</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={data.display_order}
                                    onChange={(e) => setData("display_order", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* ================== SUBMIT ================== */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Submit"}
                            </button>

                            {progress && (
                                <div className="progress mt-2">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${progress.percentage}%` }}
                                        aria-valuenow={progress.percentage}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        {progress.percentage}%
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;
