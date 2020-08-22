import React, {Fragment, useEffect, useState} from 'react';
import Header from "../../components/common/Header";
import {connect} from "react-redux";
import Tabs from '../../components/common/Tabs';
import Member from './Member';
import useSWR from 'swr';
import Pop from '../../components/common/Pop';
import Form from "../Groups/Edit";

const Statistics = ({history, match}) => {

	let {data: vote, mutate: mutateVote} = useSWR(`/api/votes/${match.params.id}`);
	let [selectedChoices, setSelectedChoices] = useState([]);
	let [count, setCount] = useState(0);

	useEffect(() => {
	    if(vote)
	        setSelectedChoices(vote.choices.data);
    }, [vote]);

	useEffect(() => {
	    count = 0;

	    selectedChoices.map(selectedChoice => {
	        count += selectedChoice.users.data.length;
        });

	    setCount(count);
    }, [selectedChoices]);

	const countChoice = (choice) => {
	    if(selectedChoices.includes(choice))
	        return setSelectedChoices(selectedChoices.filter(selectedChoice => selectedChoice.id !== choice.id));

	    return setSelectedChoices([...selectedChoices, choice]);
    };

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
			                                    <div className={`statistics--vote__group ${selectedChoices.includes(choice) ? "active" : ""}`} onClick={() => countChoice(choice)}>
				                                    <p className="statistics--vote__group__title">{`${choice.title} (${choice.users.data.length}명)`}</p>
				
				                                    {choice.users.data.map(participant => <Member member={participant} choice={choice} key={participant.id} />)}
			                                    </div>
			                                </Fragment>
		                                )
                                })}

                                <div className="statistics--vote__count bg--primary">체크된 참여자 총 {count}명</div>
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
