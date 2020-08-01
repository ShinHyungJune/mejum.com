import React, {} from 'react';
import {useLocation} from 'react-router-dom';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Navs = ({activeGroup}) => {
    let hiddenUrls = ["/login", "/register", "/sendResetPasswordMail", "/passwordReset"];

    let navs = [{
        title: "그룹",
        to: "/groups",
        activeLinks: ["/groups"],
        activeIcon: "/img/users--primary.png",
        inactiveIcon: "/img/users--gray.png",
    }, {
        title: "음식점",
        to: `/stores${activeGroup ? `/${activeGroup.id}` : ""}`,
        activeLinks: ["/stores"],
        activeIcon: "/img/store--primary.png",
        inactiveIcon: "/img/store--gray.png",
    }, {
        title: "내 정보",
        to: "/mypage",
        activeLinks: ["/mypage"],
        activeIcon: "/img/smile--primary.png",
        inactiveIcon: "/img/smile--gray.png",
    },{
        title: "투표지",
        to: "/votes",
        activeLinks: ["/votes"],
        activeIcon: "/img/vote--primary.png",
        inactiveIcon: "/img/vote--gray.png",
    },{
        title: "더보기",
        to: "/more",
        activeLinks: ["/more"],
        activeIcon: "/img/dots--primary.png",
        inactiveIcon: "/img/dots--gray.png",
    }];

    return (
        hiddenUrls.includes(useLocation().pathname) ? null
            : <div className={"navs"}>
                {navs.map((nav, index) => {
                    return (
                        <Link to={nav.to} className={nav.activeLinks.some(activeLink => useLocation().pathname.includes(activeLink)) ? "nav active" : "nav"} key={index}>
                            <img src={nav.activeIcon} alt="" className="icon--active"/>
                            <img src={nav.inactiveIcon} alt="" className="icon--inactive"/>

                            <p className="nav--title">{nav.title}</p>
                        </Link>
                    );
                })}
            </div>
    );
};

const mapStates = (state) => {
    return {
        activeGroup: state.groupStates.activeGroup
    }
};

export default connect(mapStates, null)(Navs);
