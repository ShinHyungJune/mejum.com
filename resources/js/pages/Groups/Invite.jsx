import React, {useEffect} from 'react';
import Form from '../../components/common/Form';
import Pop from "../../components/common/Pop";

const Invite = ({onThen, group = null}) => {
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
        window.Kakao.init("2c421067f35449af1e8b0e88255eb3df");
        window.Kakao.Link.createDefaultButton({
            container: "#kakao",
            objectType: "feed",
            content: {
                title: "메뉴선정서비스로부터 초대장이 도착하였습니다.",
                description: `${window.user.name}께서 ${group.title} 그룹으로 초대하였습니다.`,
                imageUrl: "https://in-diary.s3.amazonaws.com/141/euvuFmjoOJnTQB7R.png",
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
            }]
        })
    }, []);

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
                        <button className="input--withButtons__button" id={"kakao"}>
                            <img src="/img/externalLink.png" alt=""/>
                        </button>
                    </div>

                </div>


                <div className="pop__buttons">
                    <button type={"button"} onClick={() => window.setPop("")} className={"button--middle bg--lightGray"}>취소</button>
                </div>
            </Pop> : null
    );
};

export default Invite;
