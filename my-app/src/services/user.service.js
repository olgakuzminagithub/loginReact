import { authHeader } from '../helpers/auth-header';

const url = 'https://flatearth-api.herokuapp.com/api/v1/auth';

export const userService = {
    login,
    logout,
};

function login(user, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password })
    };

    return fetch(`${url}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('data', user)
            // login successful if there's a jwt token in the response
            if (user.message.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.message));
            }

            return user.message;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${url}/secret`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}