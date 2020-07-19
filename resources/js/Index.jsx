import React, {Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import AuthRoute from './components/common/AuthRoute';
import store from './store';

import Header from './components/common/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import SendResetPassword from './pages/SendResetPassword';
import ResetPassword from './pages/ResetPassword';
import Components from './pages/Components';
import GroupIndex from './pages/Groups/Groups';
import GroupShow from './pages/Groups/Show';
import Join from "./pages/Groups/Join";
import Navs from "./components/common/Navs";
import Mypage from "./pages/Mypage";
import StoresIndex from './pages/Stores/Stores';
import {Redirect} from "react-router-dom";
import More from './pages/More';

import Flash from './components/common/Flash';


const Index = ({history}) => {
    let key = "2c421067f35449af1e8b0e88255eb3df";

    useEffect(() => {
        window.Kakao.init(key);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Flash />

                    <div className="contents">
                        <Switch>
                            <Redirect exact path="/" to={"/groups"} />
                            <AuthRoute exact path="/groups" component={GroupIndex}/>
                            <AuthRoute exact path="/groups/:id" component={GroupShow}/>
                            <AuthRoute exact path="/groups/invite/:id" component={Join}/>
                            <AuthRoute exact path="/stores" component={StoresIndex}/>
                            <AuthRoute exact path="/more" component={More}/>
                            <Route exact path="/mypage" component={Mypage} />

                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/sendResetPasswordMail" component={SendResetPassword} />
                            <Route exact path="/passwordReset" component={ResetPassword} />
                            <Route exact path="/components" component={Components} />
                        </Switch>
                    </div>

                    <Navs />

                </Fragment>
            </Router>
        </Provider>
    );
};

export default Index;

if (document.getElementById('app')) {
	ReactDOM.render(<Index/>, document.getElementById('app'));
}
