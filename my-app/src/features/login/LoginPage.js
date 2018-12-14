import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { userActions } from '../../store/action/user.action';

import './login-page.css';

class LoginPageComponent extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            user: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user, password } = this.state;
        const { dispatch } = this.props;
        if (user && password) {
            dispatch(userActions.login(user, password));
        }
    }

    render() {
        const { alert } = this.props;
        const { user, password, submitted } = this.state;
        return (
            <div className="Sign-in">
                <span><b>Bank</b> Support Portal</span>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="user" value={user} placeholder="Username" onChange={this.handleChange} />
                        {submitted && !user &&
                        <div className="help-block">Введите username</div>
                        }
                        {alert.message === `No such User ${this.state.user}` &&
                        <div className={`alert ${alert.type}`}>Invalid username</div>
                        }
                        {alert.type === 'alert-success' &&
                        <div className={`alert ${alert.type}`}> </div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" name="password" value={password} placeholder="Password" onChange={this.handleChange}/>
                        {submitted && !password &&
                        <div className="help-block">Ведите пароль</div>
                        }
                        {alert.message === 'password is incorrect' &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        {alert.type === 'alert-success' &&
                        <div className={`alert ${alert.type}`}> </div>
                        }
                    </div>
                    <div className="form-group">
                        <button>Login</button>
                        <p className='note'>Forgot your password? <a href="#">Reset it here</a></p>
                    </div>
                </form>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export const LoginPage = connect(mapStateToProps)(LoginPageComponent);