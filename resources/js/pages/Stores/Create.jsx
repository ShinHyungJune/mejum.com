import React, {} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Create = ({onThen}) => {

    return (
        <Pop name={"그룹 생성"}>
            <Form method="post" url="/api/groups" onThen={onThen}>
                <input type="text" name={"title"} placeholder={"그룹명"}/>

                <div className="pop__buttons">
                    <button className={"button--middle bg--primary"}>생성</button>
                    <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                </div>
            </Form>
        </Pop>
    );
};

export default Create;
