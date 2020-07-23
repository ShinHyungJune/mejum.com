import React, {useEffect, useState, Fragment} from 'react';
import Header from '../components/common/Header';
import Form from '../components/common/Form';

const Mypage = ({}) => {
    return (
        <Fragment>
            <Header title="내 정보" />
            
            <button onClick={() => window.logout()} style={{color:"white"}}>로그아웃</button>
         
        </Fragment>

    );
};

export default Mypage;
