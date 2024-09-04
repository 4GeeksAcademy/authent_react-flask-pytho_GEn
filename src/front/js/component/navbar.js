import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const handleLogout = () => {
        actions.logout();
    };

    if (!store.user) {
        return null;
    }

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Secure APP</span>
				</Link>
				<div className="ml-auto">
				<ul>
                <div className="user-button" onClick={handleProfileClick}>
                            <button className="btn btn-primary" onClick={handleLogout}>
                                Logout
                            </button>
                    
                </div>
               
				</ul>
				</div>
			</div>
		</nav>
	);
};
