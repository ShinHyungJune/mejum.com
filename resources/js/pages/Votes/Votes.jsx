import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import Vote from './Vote';

const Votes = ({history, match}) => {

    let [items, setItems] = useState({
        data: [],
        meta: {}
    });

    let [defaultForm, setDefaultForm] = useState(null);

    let [params, setParams] = useState({
        page: 1
    });

    useEffect(() => {
        axios.get("/api/votes", {
            params: params
        }).then(response => {
            setItems(response.data);
        }).catch(error => {
            window.setFlash(error.message);
        });
    }, []);

    return (
        <Fragment>
            <Header title="투표지 목록" history={history}/>
            
            <div className="votes">
                {
                    items.data.length === 0
                        ? <div className="empty type01">
                            <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                            <p className="empty__text">생성된 투표지가 없습니다.</p>
                        </div>
                        : <div className="box type01">
                            {items.data.map(item => <Vote key={item.id} vote={item} />)}
                        </div>
                }
            </div>
        </Fragment>

    );
};

export default Votes;
