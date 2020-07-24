import React, {Fragment, useState, useEffect} from 'react';
import {setFlash} from "../../../actions/commonActions";
import Form from "../Form";
import InputImage from '../inputs/InputImage';

const InputMenus = ({form, setForm, el, mergeOnChange}) => {
    let max = el.props.max ? el.props.max : 50;
    
    let [inputs, setInputs] = useState([]);
    
    let [controlStates, setControlStates] = useState([]);
    
    useEffect(() => {
        setForm({
            ...form,
            [el.props.name] : []
        })
    }, []);
    
    const removeInput = (index) => {
        setForm({
            ...form,
            [el.props.name]: form[el.props.name].splice(index, 1)
        });
    };
    
    const changeForm = (event, index) => {
        form[el.props.name][index][event.target.name] = event.target.value;
    };
    
    const addInput = () => {
        setControlStates([
            ...controlStates,
            useState({})
        ]);
        
        form[el.props.name].push([]);
        
        // 최대 개수 체크
        if(max <= form[el.props.name].length)
            return store.dispatch(setFlash(`최대 ${max}개까지만 입력 가능합니다.`));
    
        setInputs([
            ...inputs,
            ""
        ]);
    };
    
    return (
        <div className={"input--menus"}>
            {inputs.map((input, index) =>
                <Fragment key={index}>
                    <InputImage form={form} setForm={setForm} el={{props: {name: "img"}}}/>
                    
                    <input type="img" name={"img"} onChange={(event) => changeForm(event, index)}/>
                    <input type="text" name={"title"} onChange={(event) => changeForm(event, index)}/>
                    <input type="text" name={"price"} onChange={(event) => changeForm(event, index)}/>
                </Fragment>
            )}
    
            <button type={"button"} className={"button--middle bg--lightGray width--100"} onClick={addInput}>메뉴 추가</button>
        </div>
    );
};

export default InputMenus;
