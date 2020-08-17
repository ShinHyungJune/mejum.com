import React, {Fragment, useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import Tabs from '../../components/common/Tabs';
import Member from './Member';
import useSWR from 'swr';

const Statistics = ({history, match}) => {

	let {data: vote, mutate: mutateVote} = useSWR(`/api/votes/${match.params.id}`);
	
	return (
		<Fragment>
			<Header title={`${vote ? vote.store.title : ""} 투표현황`} history={history}/>
			
			{vote
				? (
					<div className="box type01" id={"statistics--vote"}>
                        <Tabs>
                            <div name="참여">
                                {vote && vote.choices.data.map(choice => {
                                	if(choice.users.data.length)
		                                return (

		                                    <Fragment key={choice.id}>
			                                    <div className="statistics--vote__group">
				                                    <p className="statistics--vote__group__title">{`${choice.title} (${choice.users.data.length}명)`}</p>
				
				                                    {choice.users.data.map(participant => <Member member={participant} choice={choice} key={participant.id} />)}
			                                    </div>
			                                </Fragment>
		                                )
                                })}
                            </div>
                            <div name="미참여">
                                {vote && vote.unparticipants.data.map(unparticipant =>
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
