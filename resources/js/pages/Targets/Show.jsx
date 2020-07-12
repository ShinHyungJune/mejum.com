import React, {useEffect, useState} from 'react';
import {setFlash} from "../../actions/commonActions";
import Form from "./Edit";
import {setTarget} from "../../actions/targetActions";


const Show = ({match, history}) => {
    let [item, setItem] = useState({});

    useEffect(() => {
        axios.get("/api/targets/" + match.params.id)
            .then(response => {
                setItem(response.data.data);
            })
            .catch(error => {
                store.dispatch(setFlash(error));
            })
    }, []);

    const edit = () => {
        store.dispatch(setTarget(item));

        history.push("/targets/edit");
    };

    const remove = () => {
        axios.delete("/api/targets/" + item.id)
            .then(response => {
                store.dispatch(setFlash(response.data.message));

                history.push("/targets");
            })
    };

    return (
        <div className={"show"}>
            <div className="container__title">댓글 수집 자세히보기</div>

            <div className="align--right">
                <button className="button button--round button--middle bg--red" onClick={remove}>삭제</button>
                <button className="button button--round button--middle bg--primary" onClick={edit}>수정</button>
                {/* <button className="button button--round button--middle bg--primary" onClick={edit}>수정</button> */}
            </div>

            <div className="height--24"></div>
            
            <div className="container__body">
                <div className="input--wrap">
                    <p className="input--title">플랫폼</p>
                    <div className="input--text">
                        {item.platform}
                    </div>
                </div>

                <div className="input--wrap">
                    <p className="input--title">제목</p>
                    <div className="input--text">
                        {item.title}
                    </div>
                </div>

                <div className="input--wrap">
                    <p className="input--title">URL</p>
                    <div className="input--text">
                        <a href={item.url} target={"_blank"} className="primary">{item.url}</a>
                    </div>
                </div>

                <div className="input--wrap">
                    <p className="input--title">썸네일</p>
                    <div className="input--img">
                        <img src={item.thumbnail} alt=""/>
                    </div>
                </div>

                <div className="input--wrap">
                    <p className="input--title">내용</p>
                    <div className="input--text">
                        {item.body}
                    </div>
                </div>

                <div className="input--wrap">
                    <p className="input--title">수집상태</p>
                    <div className="input--text">
                        {item.state}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
