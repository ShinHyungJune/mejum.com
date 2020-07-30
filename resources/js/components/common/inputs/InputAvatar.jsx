import React, {Fragment, useState, useEffect} from 'react';

const InputAvatar = ({form, setForm, el, mergeOnChange}) => {
    let [url, setUrl] = useState(null);
    let [imgChanged, setImgChanged] = useState(false);
    let [fakeFile, setFakeFile] = useState({
        name: null,
        url: null
    });

    useEffect(() => {
        if(form[el.props.name] && !imgChanged){ // 사용자가 파일 선택 눌러서 이미지 변경했으면, 업데이트라 해도 이미지는 새로 등록되야함.
            setFakeFile(form[el.props.name]);
            
            setUrl(form[el.props.name].url);
            
            if(form[el.props.name].url)
                extendImg(form[el.props.name].url);
            
            setForm({
                ...form,
                [el.props.name] : "" // 이미지를 null로 넘겨줘야 백엔드에서 그냥 수정을 안하고 넘김
            });
        }
    }, [form]);
    
    const changeForm = (event) => {
        setImgChanged(true);
        
        if(! event.target.files.length)
            return ;
        
        let file = event.target.files[0];

        let reader = new FileReader();
        
        let eventTargetName = event.target.name;
        
        reader.readAsDataURL(file);

        reader.onload = e => {
            setUrl(e.target.result);

            extendImg(e.target.result);

            setForm({
                ...form,
                [eventTargetName]: file
            });
        };
    };
    
    const extendImg = (url) => {
        let img = new Image();
    
        img.src = url;
    
        img.onload = () => {
        
            if(img.width > img.height)
                $(`${el.props.className ? "." + el.props.className : ".input--avatar"} .ratioBox img`).css("width", "auto").css("height", "100%");
        
            if(img.width <= img.height)
                $(`${el.props.className ? "." + el.props.className : ".input--avatar"} .ratioBox img`).css("width", "100%").css("height", "auto");
        };
    };
    
    return (
        <div className={el.props.className ? `${el.props.className} ${url ? "active" : ""}` :`input--${el.props.type ? el.props.type : el.type} ${url ? "active" : ""}`}>
            {/* button */}
            <label className={`btn btn-text bg-primary`} htmlFor={el.props.name}>
                파일 선택
                {
                    url ?
                    <div className="ratioBox-wrap">
                        <div className="ratioBox">
                            <img src={url} alt=""/>
                        </div>
                    </div> : null
                }

            </label>
            
            {React.cloneElement(el, {
                onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                type: "file",
                accept: "image/*",
                id: el.props.name
            })}
            
            {
                form["img"] || fakeFile
                    ? (
                        <Fragment>
                            {/* file name */}
                            <div className="input-file-name">{fakeFile ? fakeFile.name : form[el.props.name].name}</div>
                            
                            {/* file img */}
                            {/*{url ? <img className="input-file-img" src={url} /> : null}*/}
                        </Fragment>
                    ) : null
            }
        </div>
    );
};

export default InputAvatar;
