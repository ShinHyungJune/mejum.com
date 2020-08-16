import React, {} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Create = ({onThen, defaultForm, loading, setLoading}) => {
    
    return (
        <Pop name={"메뉴 생성"}>
            <div className="create--menu">
                <Form method="post" url="/api/menus" onThen={onThen} onCatch={() => setLoading(false)} defaultForm={defaultForm}>
                    <input type="cropImage" name={"img"} data-aspect={1/1}/>
        
                    <input type="text" name={"title"} placeholder={"메뉴명"}/>
        
                    <input type="text" name={"price"} placeholder={"가격"}/>
        
                    <div className="pop__buttons">
                        <button className={`button--middle bg--primary ${loading ? "loading type01" : null}`} onClick={() => setLoading(true)}>생성</button>
                        <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                    </div>
                </Form>
            </div>
        </Pop>
    );
};

export default Create;
