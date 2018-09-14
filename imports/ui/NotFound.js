import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box boxed-view__form">
            <h1>Page not found</h1>
            <p>Sorry... This page does not exist.</p>
            <Link
            className="button button--link"
                to="/">
                Go back to home page
                </Link>
            </div>
        </div>
    )
}