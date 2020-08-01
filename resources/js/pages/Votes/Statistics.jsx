import React, {Fragment, useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import Tabs from '../../components/common/Tabs';
import Member from './Member';

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
                                        <Member member={participant} choice={choice} key={participant.id} />
                                    )
                                )}
                            </div>
                            <div name="미참여">
                                {vote.unparticipants.data.map(unparticipant =>
                                    <Member member={unparticipant} key={unparticipant.id}/>
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
