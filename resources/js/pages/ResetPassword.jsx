import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';
import axios from "axios";

const ResetPassword = ({user, setFlash, history}) => {

	let [loading, setLoading] = useState(false);

    let [form, setForm] = useState({
        "phone": "",
        "token": "",
        "password": "",
        "password_confirmation": ""
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

        axios.post("/api/passwordReset", {
            ...form,
            phone: phone
        }).then(response => {
                setLoading(false);

                setFlash(response.data.message);

                history.push("/login");
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
            <div id="resetPassword">
                <div className="container--mobile">
                    <img src="/img/logo.png" alt="" className="logo"/>

                    <form onSubmit={submit}>
                        <div className="input--wrap">
                            <div className="input--text">
                                <input type="text" name="token" placeholder="인증번호" onChange={changeForm}/>
                            </div>

                        </div>

                        <div className="input--wrap">
                            <div className="input--text">
                                <input type="text" name="phone" placeholder="폰번호 아이디" onChange={changeForm}/>
                            </div>

                        </div>

                        <div className="input--wrap">
                            <div className="input--text">
                                <input type="password" name="password" placeholder="새 비밀번호" onChange={changeForm}/>
                            </div>
                        </div>

                        <div className="input--wrap">
                            <div className="input--text">
                                <input type="password" name="password_confirmation" placeholder="새 비밀번호 확인" onChange={changeForm}/>
                            </div>

                            <p className="input--error">{form.errors && form.errors.token ? form.errors.token : ""}</p>
                            <p className="input--error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                            <p className="input--error">{form.errors && form.errors.password ? form.errors.password : ""}</p>
                        </div>

                        <button className="button--middle button--full bg--primary">
                            {loading
                                ? <p className="animated flash infinite white">진행중</p>
                                : "비밀번호 재설정"
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
export default connect(mapState, mapDispatch)(ResetPassword);
