import React from "react";
import {Link} from "react-router-dom";
import AuthModal from "./AuthModal";

const Header = () => {
    return (
        <>
            <header className="header snipcss-Bz6oc">
                <div className="content content--fullwidth">
                    <div className="header__mobile-menu">
                        <div className="toggle">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                                 className="svg-inline--fa fa-bars " role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor"
                                      d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="header__logo">
                        <Link className="logo-link" to="/">главная</Link>
                    </div>
                    <div className="header__full-menu">
                        <nav className="header__nav">
                            <div className="nav-links">
                                <a className="nav-item" href="/sandbox">
                                    <span>Песочница</span>
                                </a>
                                <Link className="nav-item" to="/tasks"><span>Тренажёр</span></Link>
                            </div>
                        </nav>
                        <AuthModal />
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;