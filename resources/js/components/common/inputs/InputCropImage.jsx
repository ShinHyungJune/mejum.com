import React, {Fragment, useState, useEffect} from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

const InputImage = ({form, setForm, el, mergeOnChange}) => {
    
    let [url, setUrl] = useState(null);
    let [imgChanged, setImgChanged] = useState(false);
    let [fakeFile, setFakeFile] = useState({
        name: null,
        url: null
    });
    let [crop, setCrop] = useState({x:0, y:0});
    let [zoom, setZoom] = useState(1);
    let [activated, setActivated] = useState(false);
    let [rotate, setRotate] = useState(null);
    let [aspect, setAspect] = useState(el.props["data-aspect"] ? el.props["data-aspect"] : 4 / 3);
    let [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    let [croppedImage, setCroppedImage] = useState(null);

    useEffect(() => {
        if(form[el.props.name] && !imgChanged){ // 사용자가 파일 선택 눌러서 이미지 변경했으면, 업데이트라 해도 이미지는 새로 등록되야함.
            setFakeFile(form[el.props.name]);
            
            setUrl(form[el.props.name].url);
            
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
            
            setActivated(true);
            
            setForm({
                ...form,
                [eventTargetName]: file
            });
        };
    };
    
    const onCropChange = crop => {
        setCrop(crop);
    };
    
    const onCropComplete =(croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };
    
    const doCrop = async () => {
        const croppedImage = await getCroppedImg(
            url,
            croppedAreaPixels,
            0
        );
        
        let resizeImage =  await resize(croppedImage, 500);
        
        setUrl(resizeImage);
        
        setForm({
            ...form,
            [el.props.name] : window.dataURLtoFile(resizeImage)
        });
        
        setZoom(1);
        
        setActivated(false);
    };
    
    const onZoomChange = zoom => {
        setZoom(zoom);
    };
    
    
    const resize = (url, maxWidth = 450)  => {
        return new Promise((resolve, reject) => {
            let img = new Image();
    
            let resizeUrl = null;
    
            let ratio = 1;
    
            img.src = url;
    
            img.onload = function() {
                if(this.width > maxWidth){
                    ratio = maxWidth / this.width;
            
                    let canvas = document.createElement("canvas");
            
                    canvas.width = this.width * ratio; //리사이징하여 그릴 가로 길이
                    canvas.height = this.height * ratio; //리사이징하여 그릴 세로 길이
            
                    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            
                    //canvas의 dataurl를 blob(file)화 하는 과정
                    resizeUrl = canvas.toDataURL("image/jpg"); //png => jpg 등으로 변환 가능
                }else{
                    resizeUrl = url;
                }
                
                resolve(resizeUrl);
            };
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className + ` ${url ? "active" : ""}` :`input--${el.props.type ? el.props.type : el.type} ${url ? "active" : ""}`}>
            {/* button */}
            <label className={"btn btn-text bg-primary"} htmlFor={el.props.name}>
                <img className={"input--cropImage__label"} src="/img/replace--store.jpg" alt=""/>
    
                {url && !activated ? <img className="input--cropImage__img" src={url} /> : null}
            </label>
            
            {React.cloneElement(el, {
                onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                type: "file",
                accept: "image/*",
                id: el.props.name
            })}
            
            {
                form[el.props.name] || fakeFile
                    ? (
                        <Fragment>
                            {/* file img */}
                            {activated && url ?
                                <Fragment>
                                    <Cropper
                                        image={url}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={aspect}
                                        onCropChange={onCropChange}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={onZoomChange}
                                    />
                                    
                                    <button type={"button"} onClick={doCrop} className={"input--cropImage__btn--cut"}>자르기</button>
                                </Fragment> : null}
                            
                        </Fragment>
                    ) : null
            }
        </div>
    );
};

export default InputImage;
