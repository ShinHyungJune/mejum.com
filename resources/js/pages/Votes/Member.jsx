import React, {useEffect, Fragment} from 'react';

const Member = ({member, choice}) => {

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

            <div className="member--texts">
                <p className="member--title">{member.name}</p>
                <p className="member--body">{choice ? choice.title : ""}</p>
            </div>
        </div>
    );
};

export default Member;
