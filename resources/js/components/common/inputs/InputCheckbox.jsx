import React, {Fragment} from 'react';

const InputCheckbox = ({form, setForm, el}) => {
    
    const changeForm = (event) => {
        if(!form[event.target.name])
            form[event.target.name] = [];
        console.log(event.target.value);
        form[event.target.name] && form[event.target.name].includes(event.target.value)
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
                    value: el.props.value,
                    id: el.props.value
                })
            }
            
            {el.props.label ?
                <label htmlFor={el.props.value}>{el.props.label}</label>
                : null}
        </div>
    );
};

export default InputCheckbox;
