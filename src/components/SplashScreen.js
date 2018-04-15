import React, {Component} from 'react';
import {getUser} from "./User";
import {Redirect} from "react-router-dom";

export default class SplashScreen extends Component {
    render() {
        const redirectTo = getUser() ? '/admin' : '/auth';
        return <Redirect to={redirectTo}/>
    }
}