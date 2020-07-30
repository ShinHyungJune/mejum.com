import React, {useEffect, useState, Fragment} from 'react';
import Header from '../../components/common/Header';
import Member from "./Member";


const Show = ({match, history}) => {
    let [group, setGroup] = useState(null);
    let [master, setMaster] = useState(null);
    let authUser = window.store.getState().commonStates.user;

    useEffect(() => {
        axios.get("/api/groups/" + match.params.id)
            .then(response => {
                setMaster(response.data.users.find(user => user.master));

                setGroup(response.data);
            })
    }, []);

    const appoint = (user, group) => {
        axios.post("/api/groups/appoint", {
            user_id: user.id,
            group_id: group.id
        }).then(response => {
            setGroup(response.data.data);

            setMaster(response.data.data.users.find(user => user.master));

            window.setFlash(response.data.message);
        })
    };

    const banish = (user, group) => {
        axios.post("/api/groups/banish", {
            user_id: user.id,
            group_id: group.id
        }).then(response => {
            setGroup({
                ...group,
                users: group.users.filter(userData => userData.id !== user.id)
            });

            window.setFlash(response.data.message);
        })
    };

    return (
        <Fragment>
            <Header title={group ? group.title : ""} history={history} />
            {group ?
                <div id="group">
                    <div className="infos type01">
                        <div className="info type01">
                            <p className="info--title">그룹명</p>
                            <p className="info--body">{group.title}</p>
                        </div>

                        <div className="info type01">
                            <p className="info--title">생성일</p>
                            <p className="info--body">{group.created_at}</p>
                        </div>

                        <div className="info type01">
                            <p className="info--title">그룹장</p>
                            <p className="info--body">{master.name}</p>
                        </div>
                    </div>

                    <div className="members">
                        {group.users.map(user => (
                            <Member key={user.id} member={user} authUser={authUser} banish={banish} appoint={appoint} group={group} master={master}/>
                        ))}
                    </div>
                </div>
                : null
            }

        </Fragment>

    );
};

export default Show;
