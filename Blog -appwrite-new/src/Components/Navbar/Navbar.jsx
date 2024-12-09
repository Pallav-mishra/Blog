
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import ShareDialogBox from "../shareDialogBox/ShareDialogBox";
import './Navbar.css';

export default function Nav() {
    const [openNav, setOpenNav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const context = useContext(myContext);
    const { mode, toggleMode } = context;

    useEffect(() => {
        const admin = localStorage.getItem('admin');
        setIsLoggedIn(!!admin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin'); 
        setIsLoggedIn(false); 
    };

    // All NavList
    const navList = (
        <ul className="nav-list">
            <li className="nav-item">
                <Link to={'/'}>Home</Link>
            </li>
            <li className="nav-item">
                <Link to={'/allblogs'}>Blogs</Link>
            </li>
            {!isLoggedIn && (
                <li className="nav-item">
                    <Link to={'/adminlogin'}>Admin Login</Link>
                </li>
            )}
        </ul>
    );

    return (
        <>
            {/* Navbar */}
            <div className={`navbar ${mode === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
                {/* Desktop View */}
                <div className="navbar-container">
                    {/* Home Page Link */}
                    <Link to={'/'} className="navbar-logo">
                        <img src='https://cdn-icons-png.flaticon.com/128/3685/3685253.png' alt="logo" />
                        My Blogs
                    </Link>

                    {/* All Items */}
                    <div className="nav-actions">
                        {/* Navlist */}
                        <div className="nav-list lg:block">
                            {navList}
                        </div>

                        {/* Share Icon */}
                        <div className="nav-share">
                            <ShareDialogBox />
                        </div>

                        {/* Admin Profile Pic */}
                        <div>
                            {isLoggedIn && (
                                <Link to={'/dashboard'}>
                                    <div>
                                        <img
                                            src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                            alt="avatar"
                                            className={`avatar ${mode === 'dark' ? 'avatar-border-dark' : 'avatar-border-light'}`}
                                        />
                                    </div>
                                </Link>
                            )}
                        </div>

                        {/* Dark And Light Button */}
                        <div>
                            <button
                                onClick={toggleMode}
                                className={`icon-button ${mode === 'dark' ? 'icon-button-dark' : 'icon-button-light'}`}
                            >
                                {mode === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="navbar-toggle"
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={`collapse-open ${openNav ? 'block' : 'hidden'}`}>
                    {navList}
                </div>
            </div>
        </>
    );
}
