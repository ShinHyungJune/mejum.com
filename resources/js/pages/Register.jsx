import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {login, setFlash} from '../actions/commonActions';
import axios from "axios";
import Form from '../components/common/Form';

const Register = ({user, setFlash, history, login}) => {

    let phone = null;

    let [form, setForm] = useState({
        avatar: "",
        number: "",
        name: "",
        phone: "",
        password: "",
        password_confirmation: "",
        errors: null
    });

    let [loading, setLoading] = useState(false);
    let [mode, setMode] = useState("sendVerifyNumber");

    const clearError = () => {
        if (form.errors)
            setForm({
                ...form,
                errors: null
            });
    };

    const changeForm = (event) => {
        if (event.target.type === "checkbox") {
            const result = form[event.target.name].includes(event.target.value)
                ? form[event.target.name].filter(data => data !== event.target.value)
                : form[event.target.name].push(event.target.value);

            setForm({
                ...form,
                [event.target.name]: result.sort()
            });
        }

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const sendVerifyNumber = (e) => {
        e.preventDefault();

        setLoading(true);

        if (form.phone)
            phone = "+82" + form.phone.replace("-", "");

        axios.post("/api/verifyNumber", {
            ...form,
            phone: phone
        })
            .then(response => {
                setLoading(false);

                setMode("checkVerifyNumber");

                setFlash(response.data.message);
            })
            .catch(error => {
                setLoading(false);

                if (error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });

                setFlash(error.response.data.message);
            });
    };


    const checkVerifyNumber = (e) => {
        e.preventDefault();

        setLoading(true);

        if (form.phone)
            phone = "+82" + form.phone.replace("-", "");

        axios.patch("/api/verifyNumber", {
            ...form,
            phone: phone
        }).then(response => {
            setLoading(false);

            setMode("register");

            setFlash(response.data.message);
        })
            .catch(error => {
                setLoading(false);

                if (error.response.status === 422)
                    return setForm({
                        ...form,
                        errors: error.response.data.errors
                    });

                setFlash(error.response.data.message);
            });
    };

    const register = (response) => {
        let user = response.data;

        setFlash(response.message);

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post("/login", user)
                .then(response => {
                    axios.get("/api/user")
                        .then(response => {
                            login(response.data);

                            if(store.getState().commonStates.blockedUrl){
                                let url = store.getState().commonStates.blockedUrl;

                                setLoading(false);

                                window.setBlockedUrl(null);

                                return history.push(url);
                            }

                            history.push("/");
                        })
                }).catch(error => {
                setLoading(false);

                setFlash(error.response.data.message);
                })
        });
    };

    useEffect(() => {
        if (user)
            history.replace("/");

    }, []);

    return (
        <div className="container--auth">
            <div id="register">
                <div className="container--mobile">
                    {
                        mode === "sendVerifyNumber" ?
                            <form onSubmit={sendVerifyNumber} onKeyDown={clearError}>
                                <p className="comment">본인 휴대폰번호를 입력해주세요</p>

                                <div className="input--wrap">
                                    <div className="input--text">
                                        <input type="text" name="phone" placeholder="-를 제외한 휴대폰 번호"
                                               onChange={changeForm}/>
                                        <p className="input--error">{form.errors && form.errors.phone ? form.errors.phone : ""}</p>
                                    </div>
                                </div>

                                <button className="button--middle button--full bg--primary">
                                    {loading
                                        ? <p className="animated flash infinite white">전송중</p>
                                        : "인증문자 발송"
                                    }
                                </button>
                            </form> : null
                    }

                    {
                        mode === "checkVerifyNumber" ?
                            <form onSubmit={checkVerifyNumber} onKeyDown={clearError}>
                                <p className="comment">전송받은 4자리 인증번호를 입력해주세요</p>

                                <div className="input--wrap">
                                    <div className="input--text">
                                        <input type="text" name="phone" placeholder="휴대폰 번호(-를 제외한 숫자만 입력해주세요.)"
                                               value={form.phone} disabled/>
                                    </div>
                                </div>

                                <div className="input--wrap">
                                    <div className="input--text">
                                        <input type="text" name="number" placeholder="인증번호" onChange={changeForm}/>

                                        <p className="input--error">{form.errors && form.errors.number ? form.errors.number : ""}</p>
                                    </div>
                                </div>

                                <button className="button--middle button--full bg--primary">
                                    {loading
                                        ? <p className="animated flash infinite white">인증중</p>
                                        : "인증하기"
                                    }
                                </button>
                            </form> : null
                    }

                    {
                        mode === "register" ?
                            <Form method={"post"} url={"/api/auth/signup"} onThen={register} defaultForm={form}>
                                <input type="avatar" name="avatar" placeholder="휴대폰 번호(-를 제외한 숫자만 입력해주세요.)"/>

                                <input type="text" name="phone" placeholder="휴대폰 번호(-를 제외한 숫자만 입력해주세요.)" disabled/>

                                <input type="text" name="name" placeholder="이름"/>

                                <input type="password" name="password" placeholder="비밀번호"/>

                                <input type="password" name="password_confirmation" placeholder="비밀번호 확인" />

                                <button type={"submit"} className="button--middle button--full bg--primary" onClick={() => setLoading(true)}>
                                    {loading
                                        ? <p className="animated flash infinite white">진행중</p>
                                        : "회원가입"
                                    }
                                </button>
                            </Form> : null
                    }
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
        },

        login: (user) => {
            dispatch(login(user));
        }
    }
};
export default connect(mapState, mapDispatch)(Register);
