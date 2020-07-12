import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import {setFlash} from "../../actions/commonActions";
import Pagination from "../../components/common/Pagination";

const Index = ({history}) => {
    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let params = {
        page:1
    };

    useEffect(() => {
        getAll();
    }, []);

    const changePage = (page) => {
        params.page = page;

        getAll();
    };

    const getAll = () => {
        axios.get("/api/targets", {
            params: params
        }).then(response => {
            setItems(response.data);
        }).catch(error => {
            store.dispatch(setFlash(error.message));
        });
    };

    return (
        <div className={"index"}>
            <div className="container">
                <p className="container__title">댓글 수집 내역</p>

                {/* 상단 검색, 버튼 */}
                <div className="container__top">
                    <div className="input--search type01">
                        <input type="text" placeholder={"검색어를 입력해주세요."}/>
                    </div>

                    <Link to="/targets/create" className="button button--round button--middle bg--primary">댓글 수집 생성</Link>
                </div>

                <div className="container__body">
                    {/* 데이터가 없을 경우 */}
                    {items.data.length === 0 ?
                        <div className="empty type01">
                            <p className="empty__text">데이터가 없습니다.</p>
                        </div>
                        :  (
                            <Fragment>
                                {/* 데이터 목록 */}
                                <table className="table type01">
                                    <thead>
                                    <tr>
                                        <th>플랫폼</th>
                                        <th>썸네일</th>
                                        <th>제목</th>
                                        <th>수집상태</th>
                                        <th>생성날짜</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        items.data.map(item =>
                                            <tr key={item.id} onClick={() => history.push("/targets/" + item.id)}>
                                                <td>
                                                    {item.platform}
                                                </td>
                                                <td>
                                                    <img src={item.thumbnail} alt=""/>
                                                </td>
                                                <td>
                                                    {item.title}
                                                </td>
                                                <td>
                                                    {item.state}
                                                </td>
                                                <td>
                                                    {item.created_at}
                                                </td>
                                                <td onClick={(event) => {event.stopPropagation()}}>
                                                    <Link to={`/comments/${item.id}`}>댓글보기</Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>

                                {/* 페이지네이션 */}
                                <Pagination meta={items.meta} changePage={changePage} />
                            </Fragment>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Index;
