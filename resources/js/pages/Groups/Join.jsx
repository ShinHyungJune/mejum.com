import React, {useEffect} from 'react';
import Form  from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Join = ({match, history}) => {
    useEffect(() => {
        axios.get("/api/groups/join?" + match.params.id)
            .then(response => {
                window.setFlash(response.data.message);

                history.push("/groups/" + response.data.data.id);
            })
    }, []);

    return null;
};

export default Join;
