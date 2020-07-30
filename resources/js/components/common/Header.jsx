import React, {Fragment, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {setFlash, logout} from "../../actions/commonActions";

const Header = ({title="", children = null, logout, history}) => {

    return (
        <header className="header bg--primary clearfix">
            <img src="/img/forkedArrow--left--white.png" alt="" className={"header__btn"} onClick={() => history.goBack()}/>
            
            <p className="header__title">{title}</p>

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
