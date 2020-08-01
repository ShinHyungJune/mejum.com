import React, {Fragment, useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import Tabs from '../../components/common/Tabs';

const Statistics = ({history, match}) => {
	let [vote, setVote] = useState(null);
	
	useEffect(() => {
		axios.get("/api/votes/" + match.params.id)
			.then(response => {
					setVote(response.data);
				}
			);
	}, []);
	
	return (
		<Fragment>
			<Header title={`${vote ? vote.store.title : ""} 투표현황`} history={history}/>
			
			{vote
				? (
					<div className="box type01" id={"statistics--vote"}>
                        <Tabs>
                            <div name="참여">
                                {vote.choices.data.map(choice =>
                                    choice.users.data.map(participant =>
                                        <div className="member" key={participant.id}>
                                            <div className="member--img ratioBox-wrap">
                                                <div className="ratioBox">
                                                    <img src={participant.img ? participant.img.url : "/img/replace--avatar.png"} alt=""/>
                                                </div>
                                            </div>

                                            <div className="member--texts">
                                                <p className="member--title">{participant.name}</p>
                                                <p className="member--body">{choice.title}</p>
                                            </div>

                                        </div>
                                    )
                                )}
                            </div>
                            <div name="미참여">
                                {vote.unparticipants.data.map(unparticipant =>
                                    <div className="member" key={unparticipant.id}>
                                        <div className="member--img ratioBox-wrap">
                                            <div className="ratioBox">
                                                <img src={unparticipant.img ? unparticipant.img.url : "/img/replace--avatar.png"} alt=""/>
                                            </div>
                                        </div>

                                        <div className="member--texts">
                                            <p className="member--title">{unparticipant.name}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Tabs>
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

export default connect(mapState, null)(Statistics);
