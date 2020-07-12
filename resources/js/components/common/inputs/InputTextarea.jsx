import React, {Fragment} from 'react';

const InputTextarea = ({form, setForm, el, mergeOnChange}) => {
    
    const changeForm = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            {
                React.cloneElement(el, {
                    onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                    value: form[el.props.name] || "",
                })
            }
        </div>
    );
};

export default InputTextarea;
