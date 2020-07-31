import React, {Fragment, useEffect, useState} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";

const Create = ({history, match}) => {
    let [store, setStore] = useState(null);
    
    let [defaultForm, setDefaultForm] = useState(null);
    
    useEffect(() => {
        axios.get("/api/stores/" + match.params.store_id)
            .then(response => {
                console.log(response.data);
                    setDefaultForm({
                        store_id: response.data.id,
                        choices: response.data.menus.map(menu => `${menu.title} - ${menu.price}`)
                    });
                    
                    setStore(response.data)
                }
            );
    }, []);
    
    const onThen = (response) => {
        history.replace("/votes/" + response.data.id);
    };
    
    return (
        <Fragment>
            <Header title={`${store ? store.title : ""} 투표지 생성`} history={history}/>
        
            {store
                ? (
                    <div className="box type01" id={"create--store"}>
                        <div className="create--vote">
                            <Form method="post" url="/api/votes" onThen={onThen} defaultForm={defaultForm} enterSubmitDisabled={true}>
                                <input type="tags" name={"choices"} label="선택지" placeholder={"선택지명 입력 후 엔터"}/>
                    
                                {/* enterSubmitDisabled쓸 때는 버튼 위에 부모 감싸면 안돼, 부모없이 별도로 버튼 css 처리 필요*/}
                                <button type={"submit"} className={`width--100 pop__button button--middle bg--primary`}>생성</button>
                            </Form>
                        </div>
                    </div>
                ) : null
            }
        </Fragment>
    );
};

export default Create;
