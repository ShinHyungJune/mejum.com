import React, {useEffect} from 'react';

const Join = ({match, history}) => {
    useEffect(() => {
        axios.get("/api/votes/join?" + match.params.id)
            .then(response => {
                // window.setFlash(response.data.message);

                history.push("/votes/" + response.data.data.id);
            })
    }, []);

    return null;
};


export default Join;
