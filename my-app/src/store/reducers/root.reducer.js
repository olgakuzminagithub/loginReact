import {combineReducers} from 'redux';

import {alert} from "./alert.reduser";
import {authentication} from "./auth.reducer";
import {users} from "./user.reducer";

export const rootReducer = combineReducers({
    alert: alert,
    authentication: authentication,
    users: users
});