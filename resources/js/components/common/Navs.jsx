import React, {} from 'react';
import {useRouteMatch, useLocation} from 'react-router-dom';
import {Link} from "react-router-dom";
import SendResetPassword from "../../pages/SendResetPassword";
import ResetPassword from "../../pages/ResetPassword";

const Navs = ({}) => {
    let hiddenUrls = ["/login", "/register", "/sendResetPasswordMail", "/passwordReset"];

    let navs = [{
        title: "그룹",
        to: "/groups",
        activeLink: ["/groups", "/"],
        activeIcon: "/img/users--primary.png",
        inactiveIcon: "/img/users--gray.png",
    }, {
        title: "음식점",
        to: "/stores",
        activeLink: ["/stores"],
        activeIcon: "/img/store--primary.png",
        inactiveIcon: "/img/store--gray.png",
    }, {
        title: "내 정보",
        to: "/mypage",
        activeLink: ["/mypage"],
        activeIcon: "/img/smile--primary.png",
        inactiveIcon: "/img/smile--gray.png",
    }, {
        title: "더보기",
        to: "/more",
        activeLink: ["/more"],
        activeIcon: "/img/dots--primary.png",
        inactiveIcon: "/img/dots--gray.png",
    }];

    return (
        hiddenUrls.includes(useLocation().pathname) ? null
            : <div className={"navs"}>
                {navs.map((nav, index) => {
                    return (
                        <Link to={nav.to} className={nav.activeLink.includes(useLocation().pathname) ? "nav active" : "nav"} key={index}>
                            <img src={nav.activeIcon} alt="" className="icon--active"/>
                            <img src={nav.inactiveIcon} alt="" className="icon--inactive"/>

                            <p className="nav--title">{nav.title}</p>
                        </Link>
                    );
                })}
            </div>
    );
};

export default Navs;
