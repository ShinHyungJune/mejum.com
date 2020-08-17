import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import {Link} from "react-router-dom";
import Tabs from '../../components/common/Tabs';
import CreateMenu from '../Menus/Create';
import EditMenu from '../Menus/Edit';
import CreateReview from '../Reviews/Create';
import Menu from '../Menus/Menu';
import useSWR from 'swr';
import {mutate, trigger} from "swr";
import Reviews from '../Reviews/Reviews';

const Show = ({history, match}) => {
    let [loading, setLoading] = useState(false);                    
    let [selectedMenu, setSelectedMenu] = useState(null);
    let [defaultForm, setDefaultForm] = useState({});
    let [reviewsParams, setReviewsParams] = useState({
        page: 1,
        orderBy: "updated_at",
        align: "desc"
    });
    let map;
    let {data: store, mutate: mutateStore} = useSWR("/api/stores/" + match.params.store_id);
    let {data: reviews, mutate: mutateReviews} = useSWR(`/api/reviews?store_id=${match.params.store_id}&page=${reviewsParams.page}&orderBy=${reviewsParams.orderBy}&align=${reviewsParams.align}`);

    useEffect(() => {
        if(store){
            setDefaultForm({
                store_id: store.id
            });

            settingMap(store);
        }
    }, [store]);


    const onMenuCreated = (response) => {
        setLoading(false);

        mutateStore({...store, menus: [...store.menus, response.data]}, false); // false 옵션을 주면 revalidate 할 필요 없이 바로 데이터 수정

        window.setPop("");
    };
    
    const onMenuUpdated = (response) => {
        setLoading(false);
        
        mutateStore({
            ...store,
            menus: store.menus.map(menu => {
                if(menu.id === response.data.id)
                    return response.data;
                
                return menu;
            })
        }, false);
        
        setSelectedMenu(null);
        
        window.setPop("");
    };
    
    const onMenuDeleted = (menu) => {
        mutateStore({
            ...store,
            menus: store.menus.filter(menuData => menuData.id !== menu.id)
        }, false);
        
        setSelectedMenu(null);
        
        window.setPop("");
    };

    const onReviewCreated = (response) => {
        setLoading(false);

        mutateReviews({...reviews, data: [...reviews.data, response.data]}, false);

        window.setPop("");
    };

    const settingMap = (data) => {
        let geoCode = {x: null, y: null};

        axios.get(`/api/getGeoCode?address=${data.address}`)
            .then(response => {
                if(response.data.addresses[0]){
                    geoCode = {
                        x: response.data.addresses[0].x,
                        y: response.data.addresses[0].y,
                    };
    
                    map = new naver.maps.Map('map', {
                        center: new naver.maps.LatLng(geoCode.y, geoCode.x),
                        zoom: 15
                    });
    
                    new naver.maps.Marker({
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
            <Header title={store ? store.title : ""} history={history}/>
            
            {store ?
                <div id="store">
                    <div className="box type01">
                        {/* 메뉴 생성 팝업 */}
                        <CreateMenu store={store} onThen={onMenuCreated} defaultForm={defaultForm} loading={loading} setLoading={setLoading}/>
    
                        {/* 메뉴 수정 팝업 */}
                        {selectedMenu ? <EditMenu store={store} onThen={onMenuUpdated} onDeleted={onMenuDeleted} defaultForm={selectedMenu} loading={loading} setLoading={setLoading}/> : null}

                        {/* 리뷰 작성 팝업 */}
                        <CreateReview store={store} onThen={onReviewCreated} defaultForm={{store_id: store.id}} loading={loading} setLoading={setLoading} />

                        {/* 썸네일 */}
                        <div className="store__top">
                            <div className={`ratioBox-wrap`}>
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
                                <a href={`tel:${store.contact}`} className="store__button">
                                    <img src="/img/phone--black.png" alt=""/>
                                    전화
                                </a>
                                
                                <button className="store__button" onClick={() => {window.setFlash("준비중입니다.")}}>
                                    <img src="/img/heart--black.png" alt=""/>
                                    좋아요
                                </button>
                                
                                <Link to={"/votes/create/" + store.id} className="store__button">
                                    <img src="/img/checkSquare--black.png" alt=""/>
                                    투표생성
                                </Link>
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
                                    <p className="info--title">특이사항</p>
                                    <p className="info--body">{store.memo}</p>
                                </div>
    
                                <div className="info type01">
                                    <p className="info--title">주소지</p>
                                    <p className="info--body">{store.address}</p>
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
                                <Reviews store={store} reviews={reviews} mutateReviews={mutateReviews} reviewsParams={reviewsParams} setReviewsParams={setReviewsParams}/>
                            </div>
                        </Tabs>
                        
                        {/* 메뉴 생성 */}
                        <div className="button--utils">
                            <button className="button--util bg--red" onClick={remove}>
                                <img src="/img/trash--white.png" alt=""/>
                            </button>

                            <button className="button--util bg--primary" onClick={() => {history.push("/stores/" + "edit/" + store.id)}}>
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
