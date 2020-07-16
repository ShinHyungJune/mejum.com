import React, {useEffect, useState, Fragment} from 'react';


const Show = ({history}) => {

    return (
        <Fragment>
            <div className="empty">
                <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                <p className="empty__text">등록된 음식점이 없습니다.</p>
            </div>
        </Fragment>

    );
};

export default Show;
