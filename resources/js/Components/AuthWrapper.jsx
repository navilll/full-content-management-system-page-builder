import React from 'react'
import '../../../../page-auth.css'
import { Link, usePage } from '@inertiajs/react'
export const AuthWrapper = ({ children }) => {
    const {appLogo} = usePage().props;
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center">
                                <Link aria-label='Go to Home Page' to="/" className="app-brand-link gap-2">
                                        <img src={appLogo} alt="logo" style={{ width: '200px', height: 'auto' }} />
                                </Link>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
