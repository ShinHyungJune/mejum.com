import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import {Link} from "react-router-dom";
import Tabs from '../../components/common/Tabs';
import CreateMenu from '../Menus/Create';


const Show = ({match}) => {
    let [store, setStore] = useState(null);
    let [isWidthLong, setIsWidthLong] = useState(false);
    let [defaultForm, setDefaultForm] = useState({});
    
    useEffect(() => {
        axios.get("/api/stores/" + match.params.store_id)
            .then(response => {
    
                setStore(response.data);
                
                console.log(response.data);
    
                setDefaultForm({
                    store_id: response.data.id
                });
                
                let img = new Image();
    
                img.src = response.data.img.url;
    
                img.onload = () => {
                    if(img.width > img.height)
                        return setIsWidthLong(true);
        
                    setIsWidthLong(false);
                };
            })
    }, []);
    
    const onMenuCreated = (response) => {
        setStore({
            ...store,
            menus: [...store.menus, response.data]
        });
        
        window.setPop("");
    };

    return (
        <Fragment>
            <Header title={store ? store.title : ""} />
            
            {store ?
                <div id="store">
                    <div className="box type01">
                        {/* 메뉴 생성 팝업 */}
                        <CreateMenu store={store} onThen={onMenuCreated} defaultForm={defaultForm}/>
    
                        {/* 썸네일 */}
                        <div className={`ratioBox-wrap ${isWidthLong ? "widthLong" : "heightLong"}`}>
                            <div className="ratioBox">
                                <img src={store.img.url} alt=""/>
                            </div>
                        </div>
    
                        {/* 유틸 버튼 */}
                        <div className="store__buttons">
                            <button className="store__button"></button>
                            <button className="store__button"></button>
                            <button className="store__button"></button>
                        </div>
    
                        {/* 정보 */}
                        <div className="infos--wrap">
                            <div className="infos type01">
                                <div className="info type01">
                                    <p className="info--title">주차장</p>
                                    <p className="info--body">{store.park ? "있음" : "없음"}</p>
                                </div>
            
                                <div className="info type01">
                                    <p className="info--title">휴무일</p>
                                    <p className="info--body">{store.closed ? store.closed : "연중무휴"}</p>
                                </div>
                            </div>
        
                            <div className="map">
                                지도 영역
                            </div>
                        </div>
    
                        <Tabs>
                            {/* 메뉴 */}
                            <div name="메뉴">메뉴</div>
    
                            {/* 리뷰 */}
                            <div name="리뷰">리뷰</div>
                        </Tabs>
                        
                        {/* 메뉴 생성 */}
                        <div className="button--utils">
                            <button className="button--util bg--primary" onClick={null}>
                                <img src="/img/edit--white.png" alt=""/>
                            </button>
        
                            <button className="button--util bg--primary" onClick={() => {window.setPop("메뉴 생성")}}>
                                <img src="/img/plus--white.png" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>
                : null
            }

        </Fragment>

    );
};

export default Show;
