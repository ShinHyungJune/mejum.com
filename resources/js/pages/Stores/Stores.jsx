import React, {useEffect, useState, Fragment} from 'react';
import Create from "./Create";
import Edit from './Edit';
import Store from './Store';
import Header from '../../components/common/Header';
import {connect} from "react-redux";

const Stores = ({history, match}) => {
    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let [defaultForm, setDefaultForm] = useState(null);

    let [params, setParams] = useState({
        page: 1,
        group_id: match.params.group_id
    });

    useEffect(() => {
        if(!match.params.group_id){
            window.setFlash("참여된 그룹이 없습니다. 그룹에 먼저 참여해주세요.");
            
            return history.push("/groups");
        }
        
        axios.get("/api/stores", {
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
            <Header title="음식점 목록" />
    
            <div className="groups">
                {
                    items.data.length === 0
                        ? <div className="empty">
                            <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                            <p className="empty__text">등록된 음식점이 없습니다.</p>
                        </div>
                        : items.data.map(item => <Store key={item.id} store={item} />)
                }
        
                <button className="button--util bg--primary" onClick={() => {history.push("/stores/create")}}>
                    <img src="/img/plus--white.png" alt=""/>
                </button>
            </div>
        </Fragment>

    );
};

const mapStates = (state) => {
    return {
        activeGroup: state.groupStates.activeGroup
    }
};

export default connect(mapStates,null)(Stores);
