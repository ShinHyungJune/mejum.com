import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import {setFlash} from "../../actions/commonActions";
import Pagination from "../../components/common/Pagination";

const Groups = ({group}) => {
    let [active, setActive] = useState(false);

    useEffect(() => {
    }, []);

    return (
        <div className="group">
            <div className="group__texts">
                <p className="group__title">{group.title}</p>
                <p className="group__date">{group.created_at}</p>
            </div>

            <button className="group__btn">
                <img src="/img/dots.png" alt=""/>
            </button>
        </div>
    );
};

export default Groups;
