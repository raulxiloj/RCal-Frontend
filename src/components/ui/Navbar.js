import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { eventLogout } from '../../actions/events';

export const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(eventLogout());
    }

    return (
        <div className="navbar navbar-dark mb-4" style={{ backgroundColor: 'black' }}>
            <span className="navbar-brand"> <i className="fas fa-user-astronaut"></i> {name} </span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout</span>
            </button>
        </div>
    )
}
