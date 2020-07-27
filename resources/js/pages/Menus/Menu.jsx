import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

const Menu = ({menu, edit}) => {
    let [isWidthLong, setIsWidthLong] = useState(false);
    
    useEffect(() => {
        let img = new Image();
    
        img.src = menu.img.url;
    
        img.onload = () => {
            if(img.width > img.height)
                return setIsWidthLong(true);
    
            setIsWidthLong(false);
        };
    }, []);
    
    return (
        <div className={`menu ${isWidthLong ? "widthLong" : "heightLong"}`}>
            <div className="ratioBox-wrap">
                <div className="ratioBox">
                    <img src={menu.img.url} alt=""/>
                </div>
            </div>
            
            <div className="menu__texts">
                <p className="menu__title">{menu.title}</p>
                <p className="menu__title">{menu.price}</p>
            </div>
        </div>
    );
};

export default Menu;
