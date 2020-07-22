import React, {useEffect} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Edit = ({onThen, defaultForm = null}) => {

    return (
        defaultForm ?
                <Pop name={"음식점 수정"}>
                    <Form method="patch" url={`/api/groups/${defaultForm.id}`} onThen={onThen} defaultForm={defaultForm}>
                        <input type="text" name={"title"} placeholder={"그룹명"}/>

                        <div className="pop__buttons">
                            <button className={"button--middle bg--primary"}>수정</button>
                            <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                        </div>
                    </Form>
                </Pop>
            : null

    );
};

export default Edit;
