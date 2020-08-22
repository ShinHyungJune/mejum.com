import React, {useEffect, useState, Fragment} from 'react';
import Create from "./Create";
import Edit from './Edit';
import Store from './Store';
import Header from '../../components/common/Header';
import {connect} from "react-redux";
import useSWR from 'swr';

const Stores = ({history, match, activeGroup}) => {

    if (!match.params.group_id) {
        window.setFlash("참여된 그룹이 없습니다. 그룹에 먼저 참여해주세요.");

        return history.push("/groups");
    }

    let [params, setParams] = useState({
        page: 1,
        group_id: match.params.group_id,
        word: ""
    });

    let [word, setWord] = useState("");

    let [defaultForm, setDefaultForm] = useState(null);

    let {data: items, mutate: mutateItems} = useSWR(`/api/stores?page=${params.page}&group_id=${params.group_id}&word=${params.word}`);

    let {data: group} = useSWR(["/api/groups/" + match.params.group_id]);

    const changeWord = (e) => {
        setWord(e.target.value);
    };

    const search = (e) => {
        e.preventDefault();

        setParams({
            ...params,
            word: word
        })
    };

    return (
        <Fragment>
            <Header title="" history={history}>
                <form action="" onSubmit={search}>
                    <div className="input--search type01">
                        <input type="text" name={"word"} placeholder={"음식점 검색"} onChange={changeWord}/>

                        <button type={"submit"}>
                            <img src="/img/search--primary.png" alt=""/>
                        </button>
                    </div>
                </form>

            </Header>

            <div className="stores">
                {group ? <p className="groups__title"><span className="point">“{group.title}”</span>의 식당</p> : null}

                {
                    items ?
                        items.data.length === 0
                            ? <div className="empty type01">
                                <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                                <p className="empty__text">등록된 음식점이 없습니다.</p>
                            </div>
                            : <div className="box type01">
                                {items.data.map(item => <Store key={item.id} store={item}/>)}
                            </div>
                        : <div className="loading type02 animated flash infinite">불러오는중</div>
                }


                <button className="button--util bg--primary" onClick={() => {
                    history.push(`/stores/create/${match.params.group_id}`)
                }}>
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

export default connect(mapStates, null)(Stores);
