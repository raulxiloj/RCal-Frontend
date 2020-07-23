import React from 'react'

export const Navbar = () => {
    return (
        <div className="navbar navbar-dark mb-4" style={{ backgroundColor: 'black' }}>
            <span className="navbar-brand"> Raul </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
        </div>
    )
}
