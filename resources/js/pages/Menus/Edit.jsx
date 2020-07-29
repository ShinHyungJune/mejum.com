import React, {} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Edit = ({onThen, defaultForm, onDeleted}) => {
    
    const remove = () => {
        axios.delete("/api/menus/" + defaultForm.id)
            .then(response => {
                window.setFlash(response.data.message);
    
                onDeleted(defaultForm);
            });
    };
    
    return (
        <Pop name={"메뉴 수정"}>
            <div className="create--menu">
                <Form method="patch" url={`/api/menus/${defaultForm.id}`} onThen={onThen} defaultForm={defaultForm}>
                    <input type="avatar" name={"img"} className={"create--menu--thumbnail"}/>
        
                    <input type="text" name={"title"} placeholder={"메뉴명"}/>
        
                    <input type="text" name={"price"} placeholder={"가격"}/>
        
                    <div className="pop__buttons">
                        <button type={"button"} className={"button--middle bg--red"} onClick={remove}>삭제</button>
                        <button className={"button--middle bg--primary"}>수정</button>
                        <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                    </div>
                </Form>
            </div>
        </Pop>
    );
};

export default Edit;
