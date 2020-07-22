import React, {useEffect, useState, Fragment} from 'react';
import Create from "./Create";
import Edit from './Edit';
import Invite from './Invite';
import Group from './Group';
import Header from '../../components/common/Header';

const Groups = ({history}) => {
    let [items, setItems] = useState({
        data: [],
        meta: {}
    });
    let [inviteGroup, setInviteGroup] = useState(null);

    let [defaultForm, setDefaultForm] = useState(null);

    let [menuOpenedGroup, setMenuOpenedGroup] = useState(null);

    let params = {
        page: 1
    };

    useEffect(() => {
        axios.get("/api/groups", {
            params: params
        }).then(response => {
            setItems(response.data);
        }).catch(error => {
            window.setFlash(error.message);
        });
    }, []);

    const onCreated = (response) => {
          setItems({
              ...items,
              data: [
                  response.data,
                  ...items.data
              ]
          });

          window.setPop("");
    };

    const onUpdated = (response) => {
        setItems({
            ...items,
            data: items.data.map(item => {
                if(item.id === response.data.id)
                    return response.data;

                return item;
            })
        });

        window.setPop("");
    };

    const invite = (item) => {
        setInviteGroup(item);

        window.setPop("그룹원 초대");
    };

    return (
        <Fragment>
            <Header title="그룹 목록" />

            <Create onThen={onCreated}/>

            <Edit onThen={onUpdated} defaultForm={defaultForm}/>

            {inviteGroup ? <Invite onThen={null} group={inviteGroup} /> : null}


            <div className="groups">
                {
                    items.data.length === 0
                        ? <div className="empty">
                            <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                            <p className="empty__text">소속된 그룹이 없습니다.</p>
                        </div>
                        : items.data.map(item => <Group group={item} groups={items} setGroups={setItems} key={item.id} menuOpenedGroup={menuOpenedGroup} setMenuOpenedGroup={setMenuOpenedGroup} setDefaultForm={setDefaultForm} invite={invite}/>)
                }

                <button className="button--util bg--primary" onClick={() => {window.setPop("그룹 생성")}}>
                    <img src="/img/plus--white.png" alt=""/>
                </button>
            </div>
        </Fragment>

    );
};

export default Groups;
