import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";
import {setFlash} from "../../actions/commonActions";
import Pagination from "../../components/common/Pagination";

const Index = ({history, match}) => {
    let max = 6000;

    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let params = {
        page:1,
        target_id: match.params.target_id
    };

    useEffect(() => {
        getAll();
    }, []);

    const changePage = (page) => {
        params.page = page;

        getAll();
    };

    const getAll = () => {
        axios.get("/api/comments", {
            params: params
        }).then(response => {
            setItems(response.data);
        }).catch(error => {
            store.dispatch(setFlash(error.message));
        });
    };

    const download = () => {
        axios.post(`/api/excelFiles`, {
            target_id: items.data[0].target_id
        }).then(response => {
            return store.dispatch(setFlash(response.data.message));
        });
    };

    return (
        <div className={"index"}>
            <div className="container">
                <p className="container__title">댓글</p>

                {/* 상단 검색, 버튼 */}
                <div className="container__top">
                    <div className="input--search type01">
                        <input type="text" placeholder={"검색어를 입력해주세요."}/>
                    </div>

                    {items.data.length !== 0 ? <a href={`/api/excelFiles/download?target_id=${items.data[0].target_id}`} className="button button--round button--middle bg--primary">엑셀 다운</a> : null}

                    {/*{items.meta.total !== 0 && items.meta.total < max
                        ? <a href={`/api/excelFiles/download?target_id=${items.data[0].target_id}`} className="button button--round button--middle bg--primary">엑셀 다운</a>
                        : <button className="button button--round button--middle bg--primary" onClick={download}>엑셀 파일로 변환</button>
                    }*/}
                </div>

                <div className="container__body">
                    {/* 데이터가 없을 경우 */}
                    {items.data.length === 0 ?
                        <div className="empty type01">
                            <p className="empty__text">데이터가 없습니다.</p>
                        </div>
                        : (
                            <Fragment>
                                {/* 데이터 목록 */}
                                <table className="table type01">
                                    <thead>
                                    <tr>
                                        <th>닉네임</th>
                                        <th>댓글내용</th>
                                        <th>댓글날짜</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        items.data.map(item =>
                                            <tr key={item.id} onClick={() => history.push("/comments/" + item.id)}>
                                                <td>
                                                    {item.nickname}
                                                </td>
                                                <td>
                                                    {item.body}
                                                </td>
                                                <td>
                                                    {item.commented_at}
                                                </td>
                                                <td onClick={(event) => {event.stopPropagation()}}>
                                                    <Link to={"/targets/" + item.target_id}>비디오 보기</Link>
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
