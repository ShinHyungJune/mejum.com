import React, {} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import {mutate, trigger} from "swr";

const Edit = ({defaultForm, onThen, loading, setLoading}) => {
    
    return (
        <Pop name={"리뷰 수정"}>
            <div className="create--review">
                <Form method="patch" url={`/api/reviews/${defaultForm.id}`} onThen={onThen} onCatch={() => setLoading(false)} defaultForm={defaultForm}>
                    <input type="cropImage" name={"img"} data-aspect={3/2}/>
        
                    <textarea name={"body"} placeholder={"리뷰 내용"}/>

                    <select name="point" id="">
                        <option value="">별점 선택</option>
                        <option value="1">1점</option>
                        <option value="2">2점</option>
                        <option value="3">3점</option>
                        <option value="4">4점</option>
                        <option value="5">5점</option>
                    </select>

                    <div className="pop__buttons">
                        <button className={`button--middle bg--primary ${loading ? "loading type01" : null}`} onClick={() => setLoading(true)}>수정</button>
                        <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                    </div>
                </Form>
            </div>
        </Pop>
    );
};

export default Edit;
