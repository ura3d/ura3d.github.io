import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = '1030112945561-liubp5iub86ki9ekl70sc9r4ts0js3en.apps.googleusercontent.com'; // Replace with your Google Client ID

const GoogleAuth = ({ onLoginSuccess, onLogoutSuccess, saveToDrive }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: 'https://www.googleapis.com/auth/drive.file',
            }).then(() => {
                const authInstance = gapi.auth2.getAuthInstance();
                if (authInstance.isSignedIn.get()) {
                    updateSigninStatus(authInstance.currentUser.get());
                }
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);

    const updateSigninStatus = (currentUser) => {
        setUser(currentUser.getBasicProfile());
        onLoginSuccess(currentUser.getBasicProfile());
    };

    const handleLoginSuccess = (response) => {
        const profile = response.getBasicProfile();
        setUser(profile);
        onLoginSuccess(profile);
    };

    const handleLoginFailure = (response) => {
        console.log('Login failed: res:', response);
    };

    const handleLogoutSuccess = () => {
        console.log('Logout made successfully');
        setUser(null);
        onLogoutSuccess();
    };

    const handleSaveToDrive = async () => {
        if (!user) {
            console.error('User is not logged in');
            return;
        }

        const fileContent = saveToDrive();
        const file = new Blob([JSON.stringify(fileContent)], { type: 'application/json' });
        const metadata = {
            name: 'SweetNotesArchive.json',
            mimeType: 'application/json',
        };

        const accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
            body: form,
        })
        .then(response => response.json())
        .then(data => {
            console.log('File saved to Google Drive:', data);
        })
        .catch(error => console.error('Error saving file to Google Drive:', error));
    };

    return (
        <div className="google-auth-container">
            {user ? (
                <div className="user-info">
                    <img src={user.getImageUrl()} alt="User Profile" className="user-image" />
                    <h3>Welcome, {user.getName()}</h3>
                    <button onClick={handleSaveToDrive} className="save-button">Save Notes to Drive</button>
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={handleLogoutSuccess}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logout-button">
                                Logout
                            </button>
                        )}
                    />
                </div>
            ) : (
                <div className="login-container">
                    <h2>Sign in with Google</h2>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google"
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="login-button">
                                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="google-logo" />
                                Login with Google
                            </button>
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default GoogleAuth;
