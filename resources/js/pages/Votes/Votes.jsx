import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import Vote from './Vote';
import useSWR, {useSWRInfinite} from 'swr';

const Votes = ({history}) => {
    let {data: items, mutate: mutateItems, size, setSize} = useSWRInfinite(index => `/api/votes?page=${index + 1}`);

    return (
        <Fragment>
            <Header title="투표지 목록" history={history}/>
            
            <div className="votes">
                {
                    items ? (
                        items[0].data.length === 0
                            ? <div className="empty type01">
                                <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                                <p className="empty__text">생성된 투표지가 없습니다.</p>
                            </div>
                            : <Fragment>
                                {
                                    items.map(item =>
                                        item.data.map(data => <Vote key={data.id} vote={data}/>)
                                    )
                                }

                                {items[0].meta.last_page > size ? <button className={"button button--middle button--full bg--lightGray"} onClick={() => setSize(size + 1)}>더보기</button> : null}
                            </Fragment>
                        ) : <div className="loading type02 animated flash infinite">불러오는중</div>
                }

            </div>
        </Fragment>

    );
};

export default Votes;
