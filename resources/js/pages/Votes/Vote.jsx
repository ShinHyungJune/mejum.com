import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

const Vote = ({vote}) => {

    return (
        <Link to={`/votes/${vote.id}`} className={"vote"}>
            <img src="/img/vote.png" alt="" className="img"/>

            <div className="vote__texts">
                <p className="vote__title">{vote.title}</p>
                <p className="vote__date">{vote.created_at}</p>
            </div>
        </Link>
    );
};

export default Vote;
