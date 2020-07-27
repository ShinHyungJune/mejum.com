import React, {Fragment} from 'react';
import FindAddress from './FindAddress';

const InputAddress = ({form, setForm, el, mergeOnChange}) => {
    
    const changeForm = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };
    
    return (
        <Fragment>
            <FindAddress form={form} setForm={setForm} name={el.props.name}/>

            <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`} onClick={() => {window.setPop("주소 찾기")}}>
                {
                    React.cloneElement(el, {
                        onChange: (event) => {el.props.onChange ? mergeOnChange(el, event) : changeForm(event); },
                        value: form[el.props.name] || "",
                        disabled: true
                    })
                }
            </div>
        </Fragment>

    );
};

export default InputAddress;
