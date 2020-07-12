import React, {Component} from 'react';
import Form  from '../../components/common/Form';

const Edit = ({history}) => {
    let item = store.getState().targetStates.target;

    return (
        <div className={"create"}>
            <div className="container__title">댓글 수집 수정</div>

            <div className="container__body">
                <Form method={"PATCH"} url={"/api/targets/" + item.id} onThen={() => history.goBack()} defaultForm={item}>
                    <select name="platform" title={"플랫폼"}>
                        <option value="">선택</option>
                        <option value="YOUTUBE">유튜브</option>
                    </select>

                    <input type="text" name={"title"} title={"제목"}/>

                    <input type="text" name={"url"} title={"영상 URL"}/>

                    <input type="text" name={"body"} title={"body"}/>

                    <div className="align--right">
                        <button className="button button--round button--middle bg--primary">수정</button>
                    </div>
                </Form>
            </div>

        </div>
    );
};

export default Edit;
