import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, setFlash} from '../actions/commonActions';
import axios from "axios";

const Login = ({login, setFlash, user, location, history}) => {
    let [form, setForm] = useState({
        "phone": "",
        "password": "",
        errors: null
    });

    useEffect(() => {

        if(store.getState().commonStates.user)
            history.replace("/");
    }, []);

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

        axios.get('/sanctum/csrf-cookie').then(response => {
            let phone = null;

            if(form.phone)
                phone = "+82" + form.phone.replace("-", "");

            axios.post("/login", {
                ...form,
                phone: phone
            }).then(response => {
                axios.get("/api/user")
                    .then(response => {
                        login(response.data);

                        if(store.getState().commonStates.blockedUrl){
                            let url = store.getState().commonStates.blockedUrl;

                            window.setBlockedUrl(null);

                            return history.push(url);
                        }

                        history.push("/");
                    });
                form.phone = "";
            }).catch(error => {
                if(error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });

                setFlash(error.response.data.message);
            })
        });
    };

	return (
	    <div className="container--auth">
            <div id="login">
                <div className="container--mobile">
                    <img src="/img/logo.png" alt="" className="logo"/>

                    <form onSubmit={submit}>
                        <div className="input--wraps">
                            <div className="input--wrap">
                                <div className="input--text">
                                    <input type="text" name="phone" placeholder="폰번호 아이디" onChange={changeForm}/>
                                </div>
                            </div>

                            <div className="input--wrap">
                                <div className="input--text">
                                    <input type="password" name="password" placeholder="비밀번호" onChange={changeForm}/>
                                </div>
                            </div>
                        </div>

                        <p className="input--error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                        <p className="input--error">{form.errors && form.errors.password ? form.errors.password : ""}</p>

                        <button className="button--full button--middle bg--primary">로그인</button>


                    </form>
                </div>

                <div className="links align--center">
                    <Link to="/sendResetPasswordMail" className="link">비밀번호 찾기</Link>
                    <Link to="/register" className="link">회원가입 하기</Link>
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

const mapDIspatch = (dispatch) => {
	return {
		login: (user) => {
			dispatch(login(user));
		},

        setFlash: (data) => {
		    dispatch(setFlash(data));
        }
	}
};

export default connect(mapState, mapDIspatch)(Login);
