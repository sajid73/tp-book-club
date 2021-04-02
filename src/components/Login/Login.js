import { Button } from '@material-ui/core';
import React from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useHistory, useLocation } from 'react-router';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Login = () => {

    const [loggedUser, setLoggedUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const provider = new firebase.auth.GoogleAuthProvider();
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                const newUser = {
                    signed: 'true',
                    username: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setLoggedUser(newUser);

                history.replace(from);
            }).catch((error) => {

            });
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
            <Button variant="contained" color="secondary" onClick={googleSignIn}>Log in with GOOGLE</Button>
        </div>
    );
};

export default Login;