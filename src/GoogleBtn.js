
import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const CLIENT_ID = '270975188676-1huo2mhm2e9t08c7fjfgh0guhf6db6ju.apps.googleusercontent.com';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }


    login (response) {
        console.log(response);
        if(response.accessToken){
            this.setState(state => ({
                isLogin: true,
                imageUrl: response.profileObj.imageUrl,
                name: response.profileObj.name
            }));
        }
    }

    logout (response) {
        this.setState(state => ({
            isLogin: false,
            imageUrl: '',
            name: ''
        }));
    }


    handleLoginFailure (response) {
        alert('Failed to log in')
    }

    handleLogoutFailure (response) {
        alert('Failed to log out')
    }

    render() {
        return (

            <div>
                { this.state.isLogin ?
                    <GoogleLogout
                        clientId={ CLIENT_ID }
                        buttonText='Logout'
                        onLogoutSuccess={ this.logout }
                        onFailure={ this.handleLogoutFailure }
                    >
                    </GoogleLogout>: <GoogleLogin
                        clientId={ CLIENT_ID }
                        buttonText='Login'
                        onSuccess={ this.login }
                        onFailure={ this.handleLoginFailure }
                        cookiePolicy={ 'single_host_origin' }
                        isSignedIn={true}
                        responseType='code,token'
                    />
                }
                { this.state.imageUrl ? <h5>UserImage: <br/><br/> <img src={this.state.imageUrl} alt=""/></h5> : null },
                { this.state.name ? <h5>UserName: <br/><br/> {this.state.name}</h5> : null }

            </div>
        )
    }
}

export default GoogleBtn;