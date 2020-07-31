import React, {Fragment, useEffect, useState} from 'react';
import Form from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import Header from "../../components/common/Header";
import {connect} from "react-redux";

const Show = ({history, match, user}) => {
	let [vote, setVote] = useState(null);
	
	let [defaultForm, setDefaultForm] = useState(null);
	
	let [alreadyVote, setAlreadyVote] = useState(false);
	
	useEffect(() => {
		axios.get("/api/votes/" + match.params.id)
			.then(response => {
					setVote(response.data);
					
					let result = response.data.choices.data.some(choice => {
						if(choice.users.data.some(userData => userData.id === user.id))
							return true;
					});
					
					setAlreadyVote(result);
				}
			);
	}, []);
	
	const onThen = (response) => {
		setVote(response.data);
	};
	
	return (
		<Fragment>
			<Header title={`${vote ? vote.store.title : ""} 투표지`} history={history}/>
			
			{vote
				? (
					<div className="box type01" id={"show--vote"}>
						<div id="vote">
							<div className="vote__count">
								<button type={"button"}  className="vote__count__btn">
									<img src="/img/user--thin--black.png" alt="" className="icon--person"/>
									
									<span className="vote__count__active">{vote.participantCount}</span>
									<span className="hyphen">/</span>
									<span className="vote__count__inactive">{vote.totalCount}</span>
									
									<img src="/img/arrow--right--gray.png" alt="" className="icon--arrow"/>
								</button>
							</div>
							
							<Form method={"post"} url={"/api/choices"} onThen={onThen}>
								{vote.choices.data.map(choice => {
									return (
										<input type="radio" name="choice_id" value={choice.id} label={choice.title} data-count={choice.users.data.length} key={choice.id}/>
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
