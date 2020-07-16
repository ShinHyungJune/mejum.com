import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import Pagination from "../../components/common/Pagination";

const Groups = ({group, setGroups, groups, menuOpenedGroup, setMenuOpenedGroup, setDefaultForm}) => {

    const out = () => {
        axios.delete("/api/groups/" + group.id)
            .then(response => {
                window.setFlash(response.data.message);

                setGroups({
                    ...groups,
                    data: groups.data.filter(groupData => groupData.id !== group.id)
                });
            }).catch(error => {
                window.setFlash(error);
        })
    };

    return (
        <div className="group">
            <img src="/img/spoon.png" alt="" className="img"/>

            <div className="group__texts">
                <p className="group__title">{group.title}</p>
                <p className="group__date">{group.created_at}</p>
            </div>

            <button className="group__btn" onClick={() => setMenuOpenedGroup(group)}>
                <img src="/img/dots.png" alt=""/>
            </button>

            {menuOpenedGroup && menuOpenedGroup.id === group.id ?
                <div className="group__menus">
                    <button className="group__menu">그룹원 초대</button>
                    <button className="group__menu" onClick={() => {setDefaultForm(group); setPop("그룹 수정")}}>그룹 수정</button>
                    <button className="group__menu" onClick={out}>그룹 나가기</button>
                    <button className="group__menu" onClick={() => setMenuOpenedGroup(null)}>닫기</button>
                </div> : null}

        </div>
    );
};

export default Groups;
