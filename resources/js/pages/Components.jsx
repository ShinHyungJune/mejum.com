import React, {Component} from 'react';

const Components = () => {
    return (
        <div className={"container"}>
            {/* 입력 */}
            <div className="input--search--white">
                <input type="text" placeholder={"댓글을 수집할 유튜브 동영상 URL을 입력해주세요."}/>
            </div>

            <div className="height--10"></div>
            <div className="input--text">
                <input type="text" placeholder={"input"}/>
            </div>

            <div className="height--10"></div>
            <div className="input--textarea">
                <textarea placeholder={"textarea"}></textarea>
            </div>

            {/* 버튼 */}
            <div className="height--10"></div>
            <button className="button--big bg--white primary">댓글 수집하기</button>
            <button className="button button--middle bg--accent button--round">버튼</button>
            <button className="button--icon">
                <img src="/img/menu--black.png" alt=""/>
            </button>
            <button className="button--full button--middle bg--primary">더보기</button>
            
            {/* 텍스트 */}
            <p className="text--h1">h1</p>
            <p className="text--h2">h2</p>
            <p className="text--title">제목</p>
            <p className="text--content">내용</p>
            <p className="text--sub">서브</p>
            <p className="text--alert">경고</p>

            {/* 박스 */}
            <div className="height--10"></div>
            <div className="box type01">
                <div className="box__top">
                    <p className="text--title">
                        제목
                    </p>

                    <img src="/img/heart.png" alt="" className="box__top__icon"/>
                </div>

                <div className="box__bottom">
                    <p className="text--body">내용...</p>
                </div>
            </div>
            <div className="empty type01">
                <p className="empty__text">데이터가 없습니다.</p>
            </div>

            <div className="height--10"></div>
            <div className="comments">
                <div className="comments--comment">
                    <p className="comments--comment--content text--content">댓글 내용</p>
                    <p className="comments--comment--sub text--sub">2019-04-15 11:48:00</p>
                </div>
                <div className="comments--comment">
                    <p className="comments--comment--content text--content">댓글 내용2</p>
                    <p className="comments--comment--sub text--sub">2019-04-15 11:48:00</p>
                </div>
            </div>

            {/* 정보나열 */}
            <div className="height--10"></div>
            <div className="infos type01">
                <div className="infos__info" style={{width:"200px"}}>
                    <p className="infos__info__title gray">제목</p>
                    <p className="infos__info__content accent">
                        내용
                        <span className="infos__info__button"><img src="/img/edit--sky.png" alt=""/></span>
                    </p>
                </div>
            </div>

            {/* 팝업창 */}
            {/* 실제 팝업처럼 중앙에 보이길 원한다면 activate 클래스 추가(현재는 전시용이라 fixed 같은거 빠짐 */}
            <div className="height--10"></div>
            <div className="pop type01">
                <div className="input--text">
                    <input type="text"/>
                </div>

                <div className="pop__buttons">
                    <button className={"button--middle button--round bg--primary"}>확인</button>
                    <button className={"button--middle button--round bg--gray"}>취소</button>
                </div>
            </div>

            {/* 탭메뉴 */}
            <div className="height--10"></div>
            <div className="tabs">
                <div className="tabs__buttons">
                    <button className="tabs__buttons__button active">메뉴1</button>
                    <button className="tabs__buttons__button">메뉴2</button>
                    <button className="tabs__buttons__button">메뉴3</button>
                </div>

                <div className="tabs__contents">
                    <button className="tabs__contents__content active">탭메뉴 내용</button>
                    <button className="tabs__contents__content">내용2</button>
                    <button className="tabs__contents__content">내용3</button>
                </div>
            </div>

            {/* 테이블 */}
            <div className="height--10"></div>
            <table className="table type01">
                <thead>
                    <tr>
                        <th>작성자</th>
                        <th>내용</th>
                        <th>작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>신태호</td>
                        <td>너는 왜 그러냐</td>
                        <td>2019-04-15 23:11:58</td>
                    </tr>
                    <tr>
                        <td>신태호</td>
                        <td>너는 왜 그러냐</td>
                        <td>2019-04-15 23:11:58</td>
                    </tr>
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <div className="height--10"></div>
            <div className="pagination type01 scroll-smooth scrollbar">
                <div className="pagination__container bg--sub">
                    <button type={"button"} className="pagination__page active primary">1</button>
                    <button type={"button"} className="pagination__page primary">2</button>
                    <button type={"button"} className="pagination__page primary">3</button>
                    <button type={"button"} className="pagination__page primary">4</button>
                    <button type={"button"} className="pagination__page primary">5</button>
                    <button type={"button"} className="pagination__page primary">6</button>
                    <button type={"button"} className="pagination__page primary">7</button>
                    <button type={"button"} className="pagination__page primary">8</button>
                    <button type={"button"} className="pagination__page primary">9</button>
                    <button type={"button"} className="pagination__page primary">10</button>
                    <button type={"button"} className="pagination__page primary">11</button>
                    <button type={"button"} className="pagination__page primary">12</button>
                </div>
            </div>

            {/* 진행도 */}
            <div className="height--10"></div>
            <div className="progress type01">
                <p className="progress--texts accent">3424 / 5000개 수집완료</p>
                <div className="progress--base">
                    <div className="progress--base--active bg--primary"></div>
                </div>

                <div className="progress--points">
                    <p className="progress--points--point primary">0%</p>
                    <p className="progress--points--point primary">25%</p>
                    <p className="progress--points--point primary">75%</p>
                    <p className="progress--points--point primary">100%</p>
                </div>
            </div>
        </div>
    );
};

export default Components;
