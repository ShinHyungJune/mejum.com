import React, {Fragment} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";

const Create = ({onThen}) => {

    return (
        <Fragment>
            <Header title={"음식점 등록"}/>
            
            <div className="box type01" id={"create--store"}>
                <Form method="post" url="/api/stores" onThen={onThen}>
                    <input type="img" name={"img"} className={"create--store--thumbnail"}/>
        
                    <input type="text" name={"title"} placeholder={"상호명"} title={"상호명"}/>
        
                    <input type="text" name={"phone"} placeholder={"전화번호"} title={"전화번호"}/>
        
                    <input type="text" name={"address"} placeholder={"주소"} title={"주소"}/>
    
                    <input type="radio" name={"park"} label="있음" value="true" id={"parkTrue"} title={"주차장 여부"}/>
    
                    <input type="radio" name={"park"} label="없음" value="false" id={"parkFalse"}/>
    
                    <input type="array" name={"menus"}>
                        <input type="object">
                            <input type="img" name={"img"}/>
                            <input type="text" name={"title"}/>
                            <input type="text" name={"price"}/>
                        </input>
    
                        <input type="object">
                            <input type="img" name={"img"}/>
                            <input type="text" name={"title"}/>
                            <input type="text" name={"price"}/>
                        </input>
                    </input>
                    
                    <div className="pop__buttons">
                        <button className={"button--middle width--100 bg--primary"}>생성</button>
                        <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                    </div>
                </Form>
            </div>
        </Fragment>
     
    );
};

export default Create;
