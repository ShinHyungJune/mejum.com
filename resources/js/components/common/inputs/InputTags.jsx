import React, {Fragment} from 'react';
import {setFlash} from "../../../actions/commonActions";

const InputTags = ({form, setForm, el, mergeOnChange}) => {
    let max = el.props.max ? el.props.max : 10;
    
    const addTag = (event) => {
        event.preventDefault();
        
        if(event.key === "Enter" && event.target.value !== ""){
            // undefined나 null이라면 빈 배열로 초기화
            if(!form[event.target.name]) {
                form[event.target.name] = [];
                setForm(form);
            }
            
            // 중복 체크
            if(form[event.target.name].find(tag => tag === event.target.value))
                return store.dispatch(setFlash("중복된 태그는 추가할 수 없습니다."));
            
            // 최대 개수 체크
            if(max <= form[event.target.name].length)
                return store.dispatch(setFlash(`태그는 최대 ${max}개까지만 입력 가능합니다.`));
    
            form[event.target.name].push(event.target.value);
            
            setForm({
                ...form,
                [event.target.name]: form[event.target.name]
            });
            
            event.target.value = "";
        }
    };
    
    const removeTag = (tag) => {
        setForm({
            ...form,
            [el.props.name]: form[el.props.name].filter(tagData => tagData !== tag)
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input-${el.props.type ? el.props.type : el.type}`}>
            {
                React.cloneElement(el, {
                    onKeyUp: (event) => {el.props.onChange ? mergeOnChange(el, event) : addTag(event); },
                    type: "text",
                    placeholder: el.props.placeholder ? el.props.placeholder : "입력 후 엔터"
                })
            }
    
            {
                form[el.props.name] ? form[el.props.name].map(tag =>
                    <p className="input-tag bg-accent" key={tag}>
                        <span className="text">{tag}</span>
                        <button type={"button"} onClick={() => {removeTag(tag)}} className="input-tag-btn"></button>
                    </p>
                ) : null
            }
        </div>
    );
};

export default InputTags;
