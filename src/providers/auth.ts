
import * as firebase from "firebase/app";
import { authState } from 'rxfire/auth';
// const auth = firebase.auth();
export interface Usuario {
    displayName: string;
    photoURL: string;
}

export const AuthData = {
    signupUser(newEmail: string, newPassword: string): any {
        return firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword);
    },
    loginGoogle: () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://mail.google.com/');
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return firebase.auth().signInWithPopup(provider);
        })

    },
    loginUser(email: string, password: string): any {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logoutUser(): any {
        return firebase.auth().signOut();
    },
    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    },
    getUser() {
        return firebase.auth().currentUser;
    },
    updateUser(userInfo: Usuario): any {
        const user = this.getUser();
        if (user) {
            user.updateProfile(userInfo);
        }
    },
    authState() {
        return authState(firebase.auth());
    }
};