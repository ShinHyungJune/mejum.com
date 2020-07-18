import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../../actions/commonActions";

const Header = ({title="", children = null, logout}) => {

    return (
        <header className="header bg--primary clearfix">
            <p className="header-title">{title}</p>

            <button onClick={logout}>로그아웃</button>
            {children}
        </header>
    );
};
const mapState = (state) => {
    return {
        user: state.commonStates.user
    }
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        },

        logout: (data) => {
            dispatch(logout(data));
        }
    }
};
export default connect(mapState, mapDispatch)(Header);
