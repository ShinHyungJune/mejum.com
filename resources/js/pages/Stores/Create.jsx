import React, {Fragment, useState, useEffect} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";

const Create = ({history, match}) => {
    let [loading, setLoading] = useState(false);
    
    let defaultForm = {
        "group_id" : match.params.group_id,
    };

    const onThen = (response) => {
        setLoading(false);
        
        history.goBack();
    };
    
    const onCatch = (error) => {
        setLoading(false);
    };

    return (
        <Fragment>
            <Header title={"음식점 등록"} history={history}/>
            
            <div className="box type01" id={"create--store"}>
                <Form method="post" url="/api/stores" onThen={onThen} onCatch={onCatch} defaultForm={defaultForm}>
                    <input type="img" name={"img"} className={"create--store--thumbnail"}/>

                    <input type="text" name={"title"} placeholder={"상호명"} title={"상호명"}/>
        
                    <input type="text" name={"contact"} placeholder={"전화번호"} title={"전화번호"}/>
        
                    <input type="address" name={"address"} placeholder={"주소"} title={"주소"}/>

                    <input type="radio" name={"park"} label="있음" value="1" id={"parkTrue"} title={"주차장 여부"}/>
    
                    <input type="radio" name={"park"} label="없음" value="0" id={"parkFalse"}/>
    
                    <input type="checkbox" name={"closed"} label="월" value="월" title={"휴무일"}/>
    
                    <input type="checkbox" name={"closed"} label="화" value="화"/>
                    
                    <input type="checkbox" name={"closed"} label="수" value="수"/>
                    
                    <input type="checkbox" name={"closed"} label="목" value="목"/>
                    
                    <input type="checkbox" name={"closed"} label="금" value="금"/>
                    
                    <input type="checkbox" name={"closed"} label="토" value="토"/>
                    
                    <input type="checkbox" name={"closed"} label="일" value="일"/>

                    <div className="pop__buttons">
                        <button className={`button--middle width--100 bg--primary ${loading ? "loading type01" : null}`} onClick={() => setLoading(true)}>생성</button>
                    </div>
                </Form>
            </div>
        </Fragment>
     
    );
};

export default Create;
