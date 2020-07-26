import React, {Fragment, useState, useEffect} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";

const Create = ({history, match}) => {

    let defaultForm = {
        "group_id" : match.params.group_id
    };

    const onThen = (response) => {
        history.goBack();
    };

    return (
        <Fragment>
            <Header title={"음식점 등록"}/>
            
            <div className="box type01" id={"create--store"}>
                <Form method="post" url="/api/stores" onThen={onThen} defaultForm={defaultForm}>
                    <input type="img" name={"img"} className={"create--store--thumbnail"}/>

                    <input type="text" name={"title"} placeholder={"상호명"} title={"상호명"}/>
        
                    <input type="text" name={"contact"} placeholder={"전화번호"} title={"전화번호"}/>
        
                    <input type="text" name={"address"} placeholder={"주소"} title={"주소"}/>

                    <input type="text" name={"address_detail"} placeholder={"상세주소"} title={"상세주소"}/>

                    <input type="radio" name={"park"} label="있음" value="1" id={"parkTrue"} title={"주차장 여부"}/>
    
                    <input type="radio" name={"park"} label="없음" value="0" id={"parkFalse"}/>

                    <div className="pop__buttons">
                        <button className={"button--middle width--100 bg--primary"}>생성</button>
                    </div>
                </Form>
            </div>
        </Fragment>
     
    );
};

export default Create;
