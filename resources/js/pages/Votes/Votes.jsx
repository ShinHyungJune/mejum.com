import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import Vote from './Vote';
import useSWR from 'swr';

const Votes = ({history}) => {

    let [params, setParams] = useState({
        page: 1
    });

    let {data: items, mutate: mutateItems} = useSWR(`/api/votes?page=${params.page}`);

    return (
        <Fragment>
            <Header title="투표지 목록" history={history}/>
            
            <div className="votes">
                {
                    items ? (
                        items.data.length === 0
                            ? <div className="empty type01">
                                <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                                <p className="empty__text">생성된 투표지가 없습니다.</p>
                            </div> : items.data.map(item => <Vote key={item.id} vote={item} />)
                        ) : <div className="loading type02 animated flash infinite">불러오는중</div>
                }

            </div>
        </Fragment>

    );
};

export default Votes;
