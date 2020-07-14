import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import Create from "./Create";
import Group from './Group';

const Groups = ({history}) => {
    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let params = {
        page: 1
    };

    useEffect(() => {
        axios.get("/api/groups", {
            params: params
        }).then(response => {
            setItems(response.data);
        }).catch(error => {
            window.setFlash(error.message);
        });
    }, []);

    const onCreated = (response) => {
          setItems({
              ...items,
              data: [
                  response.data,
                  ...items.data
              ]
          });

          window.setPop("");
    };

    return (
        <Fragment>
            <Create onThen={onCreated}/>

            <div className="groups">
                {items.data.map(item => <Group group={item} key={item.id} />)}

                <button className="button--util bg--primary" onClick={() => {window.setPop("그룹 생성")}}>
                    <img src="/img/plus--white.png" alt=""/>
                </button>

                <div className="navs">
                    <p className="navs--title">페이지 하단</p>
                </div>
            </div>
        </Fragment>

    );
};

export default Groups;
