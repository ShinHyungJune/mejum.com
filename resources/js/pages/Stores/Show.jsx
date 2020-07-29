import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import {Link} from "react-router-dom";
import Tabs from '../../components/common/Tabs';
import CreateMenu from '../Menus/Create';
import EditMenu from '../Menus/Edit';
import Menu from '../Menus/Menu';

const Show = ({history, match}) => {
    let [store, setStore] = useState(null);
    let [selectedMenu, setSelectedMenu] = useState(null);
    let [isWidthLong, setIsWidthLong] = useState(false);
    let [defaultForm, setDefaultForm] = useState({});
    let map;
    
    useEffect(() => {
        axios.get("/api/stores/" + match.params.store_id)
            .then(response => {
    
                setStore(response.data);

                setDefaultForm({
                    store_id: response.data.id
                });

                settingMap(response.data);
                
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
    
    const onMenuUpdated = (response) => {
        setStore({
            ...store,
            menus: store.menus.map(menu => {
                if(menu.id === response.data.id)
                    return response.data;
                
                return menu;
            })
        });
        
        setSelectedMenu(null);
        
        window.setPop("");
    };
    
    const onMenuDeleted = (menu) => {
        setStore({
            ...store,
            menus: store.menus.filter(menuData => menuData.id !== menu.id)
        });
        
        setSelectedMenu(null);
        
        window.setPop("");
    };
    
    const settingMap = (data) => {
        let url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";
        let geoCode = {x: null, y: null};

        axios.get(`${url}?query=${data.address}`, {
            headers: {
                "X-NCP-APIGW-API-KEY-ID": window.naver.couldKey,
                "X-NCP-APIGW-API-KEY": window.naver.couldSecret,
            }
        }).then(response => {
            if(response.data.addresses[0]){
                geoCode = {
                    x: response.data.addresses[0].x,
                    y: response.data.addresses[0].y,
                };

                map = new naver.maps.Map('map', {
                    center: new naver.maps.LatLng(geoCode.y, geoCode.x),
                    zoom: 15
                });

                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(geoCode.y, geoCode.x),
                    map: map
                });
            }

        });
    };

    const remove = () => {
        axios.delete("/api/stores/" + store.id)
            .then(response => {
                window.setFlash(response.data.message);

                history.goBack();
            })
    };

    return (
        <Fragment>
            <Header title={store ? store.title : ""} />
            
            {store ?
                <div id="store">
                    <div className="box type01">
                        {/* 메뉴 생성 팝업 */}
                        <CreateMenu store={store} onThen={onMenuCreated} defaultForm={defaultForm}/>
    
                        {/* 메뉴 수정 팝업 */}
                        {selectedMenu ? <EditMenu store={store} onThen={onMenuUpdated} onDeleted={onMenuDeleted} defaultForm={selectedMenu}/> : null}
                        
                        {/* 썸네일 */}
                        <div className="store__top">
                            <div className={`ratioBox-wrap ${isWidthLong ? "widthLong" : "heightLong"}`}>
                                <div className="ratioBox">
                                    <img src={store.img.url} alt=""/>
                                </div>
                            </div>

                            <div className="store__top__texts">
                                <p className="store__title">{store.title}</p>
                                <div className="store__ranks">
                                    <img src="/img/star--active.png" alt=""/>
                                    <img src="/img/star--active.png" alt=""/>
                                    <img src="/img/star--active.png" alt=""/>
                                    <img src="/img/star--active.png" alt=""/>
                                    <img src="/img/star--yellow.png" alt=""/>
                                </div>
                            </div>
                        </div>
                        
                        {/* 유틸 버튼 */}
                        <div className="store__buttons--wrap">
                            <div className="store__buttons">
                                <a href={`tel:${store.phone}`} className="store__button">
                                    <img src="/img/phone--black.png" alt=""/>
                                    전화
                                </a>
                                
                                <button className="store__button" onClick={() => {window.setFlash("준비중입니다.")}}>
                                    <img src="/img/heart--black.png" alt=""/>
                                    좋아요
                                </button>
                                
                                <button className="store__button">
                                    <img src="/img/checkSquare--black.png" alt=""/>
                                    투표생성
                                </button>
                            </div>
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
                                    <p className="info--body">{!store.closed || store.closed === "null" ? "연중무휴" : store.closed}</p>
                                </div>
                            </div>

                            <div id="map" style={{height:"200px"}}></div>
                        </div>
    
                        <Tabs>
                            {/* 메뉴 */}
                            <div name="메뉴">
                                <div className="menus">
                                    {store.menus.length === 0 ? <div className="empty type02"><p className="empty__text">등록된 메뉴가 없습니다.</p></div> : null}
                                    
                                    {store.menus.map(menu => <Menu menu={menu} key={menu.id} onClick={() => {setSelectedMenu(menu); window.setPop("메뉴 수정");}}/>)}
                                </div>
                            </div>
    
                            {/* 리뷰 */}
                            <div name="리뷰">
                                <div className="empty type02"><p className="empty__text">준비중입니다.</p></div>
                            </div>
                        </Tabs>
                        
                        {/* 메뉴 생성 */}
                        <div className="button--utils">
                            <button className="button--util bg--red" onClick={remove}>
                                <img src="/img/trash--white.png" alt=""/>
                            </button>

                            <button className="button--util bg--primary" onClick={() => {history.push("/stores/" + store.id + "/edit")}}>
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
