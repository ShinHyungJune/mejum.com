import React, {Component} from 'react';
import Form  from '../../components/common/Form';

const Create = ({history}) => {
    return (
        <div className={"create"}>
            <div className="container__title">댓글 수집 생성</div>

            <div className="container__body">
                <Form method={"post"} url={"/api/targets"} onThen={() => history.goBack()}>
                    <select name="platform" title={"플랫폼"}>
                        <option value="">선택</option>
                        <option value="YOUTUBE">유튜브</option>
                    </select>

                    <input type="text" name={"url"} title={"영상 URL"}/>

                    <div className="align--right">
                        <button className="button button--round button--middle bg--primary">생성</button>
                    </div>
                </Form>
            </div>

        </div>
    );
};

export default Create;
