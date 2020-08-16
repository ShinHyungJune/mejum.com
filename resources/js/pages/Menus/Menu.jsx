import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

const Menu = ({menu, onClick}) => {

    
    return (
        <div className={`menu`} onClick={onClick}>
            <div className="ratioBox-wrap">
                <div className="ratioBox">
                    <img src={menu.img ? menu.img.url : null} alt=""/>
                </div>
            </div>
            
            <div className="menu__texts">
                <p className="menu__title">{menu.title}</p>
                <p className="menu__price">· {menu.price}</p>
            </div>
        </div>
    );
};

export default Menu;
