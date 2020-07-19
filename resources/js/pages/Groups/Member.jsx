import React, {useEffect, Fragment} from 'react';

const Member = ({member, master, authUser, group, appoint, banish}) => {

    useEffect(() => {
        if(member.img){
            let img = new Image();

            img.src = member.img.url;

            img.onload = () => {
                if(img.width > img.height)
                    $(".member--img img").css("width", "auto").css("height", "100%");

                if(img.width <= img.height)
                    $(".member--img img").css("width", "100%").css("height", "auto");
            };
        }

    }, []);

    return (
        <div className="member">
            <div className="member--img ratioBox-wrap">
                <div className="ratioBox">
                    <img src={member.img ? member.img.url : "/img/replace--avatar.png"} alt=""/>
                </div>
            </div>

            <p className="member--title">{member.name}</p>

            <div className="member--buttons">
                {master.id === authUser.id && !member.master ?
                    <Fragment>
                        <button className="member--button" onClick={() => appoint(member, group)}>그룹장 위임</button>
                        <button className="member--button" onClick={() => banish(member, group)}>내보내기</button>
                    </Fragment> : null
                }
            </div>
        </div>
    );
}

export default Member;
