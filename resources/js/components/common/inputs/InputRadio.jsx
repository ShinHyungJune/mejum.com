import React, {Fragment} from 'react';

const InputRadio = ({form, setForm, el}) => {
    
    const changeForm = (event) => {
        
        return setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            {
                React.cloneElement(el, {
                    onChange: (event) => { changeForm(event); },
                    value: el.props.value,
                    id: el.props.value,
                    checked: form[el.props.name] ? el.props.value == form[el.props.name] : false
                })
            }
            
            {el.props.label ?
                <label htmlFor={el.props.value}>{el.props.label}</label>
                : null}
        </div>
    );
};

export default InputRadio;
