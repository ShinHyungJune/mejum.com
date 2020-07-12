import React, {Fragment} from 'react';

const InputCheckbox = ({form, setForm, el}) => {
    
    const changeForm = (event) => {
        form[event.target.name].includes(event.target.value)
            ? form[event.target.name] = form[event.target.name].filter(data => data !== event.target.value)
            : form[event.target.name].push(event.target.value);
    
        form[event.target.name].sort();
    
        return setForm({
            ...form,
            [event.target.name]: form[event.target.name]
        });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            {
                React.cloneElement(el, {
                    onChange: (event) => { changeForm(event); },
                    value: form[el.props.name] || "",
                })
            }
        </div>
    );
};

export default InputCheckbox;
