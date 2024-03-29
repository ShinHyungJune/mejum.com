import React, {useEffect, useState, Fragment} from 'react';
import Create from "./Create";
import Edit from './Edit';
import Invite from './Invite';
import Group from './Group';
import Header from '../../components/common/Header';
import useSWR from 'swr';

const Groups = ({history}) => {

    let [inviteGroup, setInviteGroup] = useState(null);

    let [defaultForm, setDefaultForm] = useState(null);

    let [menuOpenedGroup, setMenuOpenedGroup] = useState(null);

    let [params, setParams] = useState({
        page: 1
    });


    let {data:items, mutate : mutateItems} = useSWR(`/api/groups?page=${params.page}`);

    useSWR("/api/votes?page=1");

    const onCreated = (response) => {
        mutateItems({
              ...items,
              data: [
                  response.data,
                  ...items.data
              ]
          });

          window.setPop("");
    };

    const onUpdated = (response) => {
        mutateItems({
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
            <Header title="그룹 목록" history={history} />

            <Create onThen={onCreated}/>

            <Edit onThen={onUpdated} defaultForm={defaultForm}/>

            {inviteGroup ? <Invite onThen={null} group={inviteGroup} /> : null}


            <div className="groups">
                {
                    items && items.data.length === 0
                        ? <div className="empty type01">
                            <img src="/img/circleNotice.png" alt="" className="empty__img"/>
                            <p className="empty__text">소속된 그룹이 없습니다.</p>
                        </div>
                        : items && items.data.map(item => <Group group={item} groups={items} setGroups={mutateItems} key={item.id} menuOpenedGroup={menuOpenedGroup} setMenuOpenedGroup={setMenuOpenedGroup} setDefaultForm={setDefaultForm} invite={invite}/>)
                }

                <button className="button--util bg--primary" onClick={() => {window.setPop("그룹 생성")}}>
                    <img src="/img/plus--white.png" alt=""/>
                </button>
            </div>
        </Fragment>

    );
};

export default Groups;
