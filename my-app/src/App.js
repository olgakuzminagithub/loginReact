import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.css";

import { LoginPage } from './features/login/LoginPage';


export class App extends Component {

    render() {
        return (
            <div className="container">
                <div className="col-4 offset-4">
                    <LoginPage/>
                </div>
            </div>
        )
    }
}

