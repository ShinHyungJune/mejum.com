import React, {} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Create = ({store}) => {
    let defaultForm = {
        store_id: store.id,
        choices: store.menus.map(menu => `${menu.title} - ${menu.price}`)
    };
    
    return (
        <Pop name={"투표지 생성"}>
            <div className="create--vote">
                <Form method="post" url="/api/votes" defaultForm={defaultForm} enterSubmitDisabled={true}>
                    
                    <input type="tags" name={"choices"} label="선택지" placeholder={"선택지명 입력 후 엔터"}/>
    
                    {/* enterSubmitDisabled쓸 때는 버튼 위에 부모 감싸면 안돼, 부모없이 별도로 버튼 css 처리 필요*/}
                    <button type={"submit"} className={`pop__button button--middle bg--primary`}>생성</button>
                    <button type={"button"} onClick={() => window.setPop("")} className={"pop__button button--middle bg--lightGray"}>취소</button>
                </Form>
            </div>
        </Pop>
    );
};

export default Create;
