import React, {Fragment, useEffect, useState} from 'react';
import Form from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import store from "../../store";
import useSWR from 'swr';

const Show = ({history, match, user}) => {

	let [isFirst, setIsFirst] = useState(true);

	let [selectedChoice, setSelectedChoice] = useState(null);

	let [defaultForm, setDefaultForm] = useState(null);

	let [geoCode, setGeoCode] = useState({x: null, y: null});

	let choiced;

	let {data: vote, mutate: mutateVote} = useSWR(`/api/votes/${match.params.id}`);

	useEffect(() => {
		if (vote && isFirst) {
			initKakaoButton();

            setDefaultChoice(vote);

            getGeocode(vote.store);

            setIsFirst(false);
		}
	}, [vote]);

	const copy = (data) => {
		let textarea = document.createElement("textarea");

		document.body.appendChild(textarea);

		textarea.value = data;

		textarea.select();

		document.execCommand('copy');

		document.body.removeChild(textarea);

		window.setFlash("초대 링크가 복사되었습니다.");

		window.setPop("");
	};

	const onThen = (response) => {
		mutateVote(response.data);

		setDefaultChoice(response.data);
	};

	const setDefaultChoice = (vote) => {
		vote.choices.data.forEach(choice => {
			choiced = choice.users.data.some(userData => userData.id === user.id);

			if (choiced) {
				setTimeout(() => {
					setDefaultForm({
						choice_id: choice.id
					});
				}, 10);

			}
		});
	};

	const initKakaoButton = () => {
		Kakao.Link.createDefaultButton({
			container: '#kakao',
			objectType: 'feed',
			content: {
				title: "매일점심으로부터 투표지가 도착하였습니다.",
				description: `${store.getState().commonStates.user.name}님께서 [${vote.title}] 투표지를 공유하였습니다.`,
				imageUrl: vote.store.img ? vote.store.img.url : "https://in-diary.s3.amazonaws.com/141/euvuFmjoOJnTQB7R.png",
				link: {
					mobileWebUrl: vote.invitation,
					webUrl: vote.invitation,
				}
			},
			buttons: [{
				title: "투표하기",
				link: {
					mobileWebUrl: vote.invitation,
					webUrl: vote.invitation,
				}
			}],
			success: function (response) {
				console.log(response);
			},
			fail: function (error) {
				console.log(error);
			}
		});
	};

	const getGeocode = (data) => {
		axios.get(`/api/getGeoCode?address=${data.address}`)
			.then(response => {
				if(response.data.addresses[0]){
					setGeoCode({
						x: response.data.addresses[0].x,
						y: response.data.addresses[0].y,
					});
				}
			});
	};

    let [word, setWord] = useState("");

    const changeWord = (e) => {
        setWord(e.target.value);
    };

    const choice = () => {
        axios.post("/api/choices", {
            choice_id: selectedChoice.id
        }).then(response => {
            window.setFlash(response.data.message);
            
            onThen(response.data);
        })
    };


    return (
        <Fragment>
            <Header title={``} history={history}>
                <div className="input--search type01">
                    <input type="text" name={"word"} placeholder={"선택지 검색"} onChange={changeWord}/>

                    <button type={"submit"}>
                        <img src="/img/search--primary.png" alt=""/>
                    </button>
                </div>

                <div className="header__right">
                    {/*<button className="header__right__btn" onClick={() => copy(vote.invitation)}>
                        <img src="/img/clipboard--white.png" alt=""/>
                    </button>*/}

                    <button className="header__right__btn" id={"kakao"}>
                        <img src="/img/externalLink--white.png" alt=""/>
                    </button>
                </div>
            </Header>

            {vote
                ? (
                    <div className="box type01" id={"show--vote"}>
                        <div id="vote">
                            <div className="vote__top">
                                <a href={`tel:${vote.store.contact}`} className="vote__contact__btn">
                                    <img src="/img/phone--thin--black.png" alt="" className="icon"/>

                                    <span className="vote__count__active">{vote.store.contact}</span>
                                </a>

                                {/*<a href={`https://map.kakao.com/link/to/${vote.title},${geoCode.y},${geoCode.x}`} target={"__blank"} title={"새창열림"} className="vote__contact__btn">
									<img src="/img/pin--thin--black.png" alt="" className="icon"/>
									
									<span className="vote__count__active">길찾기</span>
								</a>*/}

                                <a href={`https://map.kakao.com/link/to/${vote.title},${geoCode.y},${geoCode.x}`}
                                   target={"__blank"} title={"새창열림"} className="vote__contact__btn">
                                    <img src="/img/pin--thin--black.png" alt="" className="icon"/>

                                    <span className="vote__count__active">길찾기</span>
                                </a>

                                <Link to={"/votes/statistics/" + vote.id} type={"button"} className="vote__count__btn">
                                    <img src="/img/user--thin--black.png" alt="" className="icon--person"/>

                                    <span className="vote__count__active">{vote.participants.data.length}</span>
                                    <span className="hyphen">/</span>
                                    <span
                                        className="vote__count__inactive">{vote.participants.data.length + vote.unparticipants.data.length}</span>

                                    <img src="/img/arrow--right--gray.png" alt="" className="icon--arrow"/>
                                </Link>
                            </div>

                            {vote.choices.data.map(choice => {
                                if (choice.title.includes(word))
                                    return (
                                        <div className="input--wrap" key={choice.id} onClick={() => setSelectedChoice(choice)}>
                                            <div className="input--radio">
                                                <input type="radio" name="choice_id" value={choice.id} id={choice.id} data-count={choice.users.data.length}/>
                                                <label htmlFor={choice.id}>{choice.title}</label>
                                            </div>
                                        </div>
                                    )
                            })}

                            <button className={"vote__button bg--primary"} onClick={choice}>투표하기</button>
                        </div>
                    </div>
                ) : null
            }
        </Fragment>
    );
};

const mapState = (state) => {
	return {
		user: state.commonStates.user
	}
};

export default connect(mapState, null)(Show);
