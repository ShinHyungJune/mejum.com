import React, {useEffect, useState} from 'react';
import Form from '../../components/common/Form';
import Pop from "../../components/common/Pop";
import store from "../../store";

const Invite = ({onThen, group = null}) => {
    let [loading, setLoading] = useState(false);
    
    const copy = (data) => {
        let textarea = document.createElement("textarea");

        document.body.appendChild(textarea);

        textarea.value = data;

        textarea.select();

        document.execCommand('copy');

        document.body.removeChild(textarea);

        window.setFlash("초대 링크가 복사되었습니다.");

        window.setPop("");
    };

    useEffect(() => {
        Kakao.Link.createDefaultButton({
            container: '#kakao' + group.id,
            objectType: 'feed',
            content: {
                title: "매일점심으로부터 초대장이 도착하였습니다.",
                description: `${store.getState().commonStates.user.name}님께서 [${group.title}] 그룹으로 초대하였습니다.`,
                imageUrl:
                    "https://in-diary.s3.amazonaws.com/141/euvuFmjoOJnTQB7R.png",
                link: {
                    mobileWebUrl: group.invitation,
                    webUrl: group.invitation,
                }
            },
            buttons: [{
                title: "초대 수락하기",
                link: {
                    mobileWebUrl: group.invitation,
                    webUrl: group.invitation,
                }
            }],
            success: function(response) {
                console.log(response);
            },
            fail: function(error) {
                console.log(error);

            }
        });
    }, [group]);

    return (
        group ?
            <Pop name={"그룹원 초대"}>
                <div className="input--withButtons">
                    <div className="input--text">
                        <input type="text" value={group.invitation} disabled={"disabled"}/>
                    </div>

                    <div className="input--withButtons__buttons">
                        <button className="input--withButtons__button" onClick={() => copy(group.invitation)}>
                            <img src="/img/clipboard.png" alt=""/>
                        </button>
                        <button className={`input--withButtons__button`} id={"kakao" + group.id}>
                            <img src="/img/externalLink.png" alt=""/>
                        </button>
                    </div>

                </div>


                <div className="pop__buttons">
                    <button type={"button"} onClick={() => {window.setPop(""); history.back();}} className={"button--middle bg--lightGray"}>취소</button>
                </div>
            </Pop> : null
    );
};

export default Invite;
