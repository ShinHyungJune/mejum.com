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
import Groups from './pages/Groups/Groups';

import Flash from './components/common/Flash';


const Index = () => {

    useEffect(() => {

    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Flash />

                    <Header />

                    <div className="contents">
                        <Switch>
                            <AuthRoute exact path="/" component={Groups}/>

                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/sendResetPasswordMail" component={SendResetPassword} />
                            <Route exact path="/passwordReset" component={ResetPassword} />
                            <Route exact path="/components" component={Components} />
                        </Switch>
                    </div>

                </Fragment>
            </Router>
        </Provider>
    );
};

export default Index;

if (document.getElementById('app')) {
	ReactDOM.render(<Index/>, document.getElementById('app'));
}
