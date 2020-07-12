import React, {Fragment} from 'react';

const InputFile = ({form, setForm, el, mergeOnChange}) => {
    
    const changeForm = (event) => {
        let file = event.target.files[0];
        
        // 이미지 파일이라면 썸네일 url 붙여주기
        if(file.type && file.type.includes("image"))
            file.thumbnail = URL.createObjectURL(file);
    
        return setForm({
            ...form,
            [event.target.name]: file
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            <label htmlFor={el.props.name}>파일 선택</label>
            {
                form[el.props.name]
                    ? (
                        <Fragment>
                            {/* file name */}
                            <div className="input-file-name">{form[el.props.name].name}</div>
                
                            {/* file img */}
                            {form[el.props.name].type && form[el.props.name].type.includes("image")
                                ? <img className="input-file-img" src={form[el.props.name].thumbnail} />
                                : null}
                        </Fragment>
                    ) : null
            }
        
            {React.cloneElement(el, {
                onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                value: "",
                id: el.props.name
            })}
        </div>
    );
};

export default InputFile;
