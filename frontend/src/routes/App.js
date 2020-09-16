import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Router} from 'react-router';
import store from '../store';
import '../assets/styles/App.scss';
/* STYLES */
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import Dashboard from '../components/dashboard/Dashboard';
import Layout from '../components/Layout';
/* Componentes Containers*/
import Landing from '../containers/Landing';
import PrivateRoute from './private-routes/PrivateRoute';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
    }
}


const App = () => {
    return (
        <BrowserRouter>
                <Switch>
                    <Layout>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                    </Layout>
                </Switch>
        </BrowserRouter>
    )
}

export default App;