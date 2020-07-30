import React, {useState} from 'react';
import {setFlash} from "../../../actions/commonActions";

const InputTags = ({form, setForm, el, mergeOnChange}) => {
    let max = el.props.max ? el.props.max : 10;
    
    let [word, setWord] = useState("");
    
    let label = el.props.label ? el.props.label : "태그";
    
    let inputEl = document.querySelector(`input[name=${el.props.name}]`);
    
    const addTag = (event, forced = false) => {
        console.log(form);
        event.preventDefault();
        
        if((event.key === "Enter" && word !== "") || forced && word !== ""){
            // undefined나 null이라면 빈 배열로 초기화
            if(!form[el.props.name]) {
                form[el.props.name] = [];
                setForm(form);
            }
            
            // 중복 체크
            if(form[el.props.name].find(tag => tag === word))
                return store.dispatch(setFlash(`중복된 ${label}(은)는 추가할 수 없습니다.`));
            
            // 최대 개수 체크
            if(max <= form[el.props.name].length)
                return store.dispatch(setFlash(`${label}(은)는 최대 ${max}개까지만 입력 가능합니다.`));
    
            form[el.props.name].push(word);
            
            setForm({
                ...form,
                [el.props.name]: form[el.props.name]
            });
            
           inputEl.value = "";
           
           inputEl.focus();
            
           setWord("");
        }else{
            setWord(event.target.value);
        }
    };
    
    const removeTag = (tag) => {
        setForm({
            ...form,
            [el.props.name]: form[el.props.name].filter(tagData => tagData !== tag)
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            {
                form[el.props.name] ? form[el.props.name].map(tag =>
                    <p className="input--tag" key={tag}>
                        <span className="text">{tag}</span>
                        <button type={"button"} onClick={() => {removeTag(tag)}} className="input--tag__button"></button>
                    </p>
                ) : null
            }
            
            {
                React.cloneElement(el, {
                    onKeyUp: (event) => {el.props.onChange ? mergeOnChange(el, event) : addTag(event); },
                    type: "text",
                    placeholder: el.props.placeholder ? el.props.placeholder : "입력 후 엔터"
                })
            }
    
            <button className={`button--middle width--100`} onClick={(event) => {addTag(event, true)}}>{label} 추가</button>
        </div>
    );
};

export default InputTags;
