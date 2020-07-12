import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';
import axios from "axios";

const SendResetPassword = ({user, setFlash, history}) => {
	
	let [loading, setLoading] = useState(false);

    let [form, setForm] = useState({
        phone: ""
    });

    const changeForm = (event) => {
        if(event.target.type === "checkbox"){
            form[event.target.name].includes(event.target.value)
                ? form[event.target.name] = form[event.target.name].filter(data => data !== event.target.value)
                : form[event.target.name].push(event.target.value);

            form[event.target.name].sort();

            return setForm({
                ...form,
                [event.target.name]: form[event.target.name]
            });
        }

        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();

        setLoading(true);

        let phone = null;

        if(form.phone)
            phone = "+82" + form.phone.replace("-", "");

        axios.post("/api/passwordReset/send", {
            ...form,
            phone: phone
        }).then(response => {
                setLoading(false);

                setFlash(response.data.message);

                history.push("/passwordReset");
            }).catch(error => {

            setLoading(false);

            if(error.response.status === 422)
                return setForm({
                    ...form,
                    errors: error.response.data.errors
                });

            setFlash(error.response.data.message);
        });

    };

	useEffect(() => {
		if(user)
			history.replace("/");
		
	}, []);
	
	return (
	    <div className="container--auth">
            <div id="sendResetPasswordMail">
                <div className="container--mobile">
                    <img src="/img/logo.png" alt="" className="logo"/>

                    <form onSubmit={submit}>
                        <div className="input--wrap">
                            <div className="input--text">
                                <input type="text" name="phone" placeholder="기존 폰번호 아이디" onChange={changeForm}/>
                            </div>

                            <p className="input--error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                        </div>

                        <button className="button--middle button--full bg--primary">
                            {loading
                                ? <p className="animated flash infinite white">진행중</p>
                                : "인증번호 발송"
                            }
                        </button>
                    </form>
                </div>
            </div>

        </div>
	);
};
const mapState = (state) => {
	return {
		user: state.commonStates.user
	}
};

const mapDispatch = (dispatch) => {
	return {
		setFlash: (data) => {
			dispatch(setFlash(data));
		}
	}
};
export default connect(mapState, mapDispatch)(SendResetPassword);
