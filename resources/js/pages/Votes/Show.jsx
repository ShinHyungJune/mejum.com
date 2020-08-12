import React, {Fragment, useEffect, useState} from 'react';
import Form from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import store from "../../store";

const Show = ({history, match, user}) => {
	let [vote, setVote] = useState(null);
	
	let [isFirst, setIsFirst] = useState(true);
	
	let [defaultForm, setDefaultForm] = useState(null);
	
	let [currentAddress, setCurrentAddress] = useState(null);
	
	let choiced;
	
	useEffect(() => {
		axios.get("/api/votes/" + match.params.id)
			.then(response => {
					setVote(response.data);
					
					setDefaultChoice(response.data);
					
					getCurrentAddress();
				}
			);
	}, []);
	
	useEffect(() => {
		if (vote && isFirst) {
			initKakaoButton();
			
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
		setVote(response.data);
		
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
				imageUrl: vote.store.img.url,
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
	
	const getCurrentAddress = () => {
		let land = null;
		
		if (navigator.geolocation)
			return navigator.geolocation.getCurrentPosition(function (pos) {
				axios.get("/api/getAddress", {
					params: {
						x: pos.coords.longitude,
						y: pos.coords.latitude
					}
				}).then(response => {
					console.log(response);
					
					if(response.data.results) {
						land = response.data.results[0].land;
						
						currentAddress = land.name;
						
						if(land.number1)
							currentAddress += ` ${land.number1}`;
						
						if(land.number2)
							currentAddress += ` ${land.number1}`;
						
						setCurrentAddress(currentAddress);
					}
				});
			});
		
		return window.setFlash("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
	};
	
	
	return (
		<Fragment>
			<Header title={`${vote ? vote.store.title : ""} 투표지`} history={history}>
				<div className="header__right">
					<button className="header__right__btn" onClick={() => copy(vote.invitation)}>
						<img src="/img/clipboard--white.png" alt=""/>
					</button>
					
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
								
								<a href={`https://map.kakao.com?sName=${currentAddress}&eName=${vote.store.address}`} target={"__blank"} title={"새창열림"} className="vote__contact__btn">
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
							
							<Form method={"post"} url={"/api/choices"} onThen={onThen} defaultForm={defaultForm}>
								{vote.choices.data.map(choice => {
									return (
										<input type="radio" name="choice_id" value={choice.id} label={choice.title}
										       data-count={choice.users.data.length} key={choice.id}/>
									)
								})}
								
								<button className={"vote__button bg--primary"}>투표하기</button>
							</Form>
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
