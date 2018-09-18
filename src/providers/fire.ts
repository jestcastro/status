/* tslint:disable:quotemark */
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';
import { toArray, getWithKey } from '../helpers/helpers';
export const Fire = {
    get(ref) {
        const subscribe = new BehaviorSubject({});
        firebase.database().ref(ref).on('value', (snap) => {
            if (snap) {
                subscribe.next(snap.val());
            }
        });
        return subscribe;
    },
    getRef(path) {
        return firebase.database().ref(path);
    },
    getDoc(firebaseRef, eventType) {
        const subscribe = new BehaviorSubject({});
        if (typeof firebaseRef === 'string') {
            firebaseRef = this.getRef(firebaseRef);
        }
        if (eventType === 'once') {
            firebaseRef.once('value', (snap) => {
                subscribe.next(getWithKey(snap.val(), snap.key));
            });
            return subscribe;
        }
        firebaseRef.on(eventType, (snap) => {
            subscribe.next(getWithKey(snap.val(), snap.key));
        });
        return subscribe;
    },
    getCollection(firebaseRef, eventType = 'value') {
        const subscribe = new BehaviorSubject([] as any[]);
        if (typeof firebaseRef === 'string') {
            firebaseRef = this.getRef(firebaseRef);
        }
        firebaseRef.on(eventType, (snap) => {
            subscribe.next(toArray(snap.val()));
        });
        return subscribe;
    },
    getDocPromise(firebaseRef, eventType) {
        if (typeof firebaseRef === 'string') {
            firebaseRef = this.getRef(firebaseRef);
        }
        return firebaseRef.once('value');
    },
    getCollectionPromise(firebaseRef) {
        if (typeof firebaseRef === 'string') {
            firebaseRef = this.getRef(firebaseRef);
        }
        return firebaseRef.once('value');
    },
    getServerTime() {
        return firebase.database.ServerValue.TIMESTAMP;
    },
    getServerDate() {
        const key = firebase.database().ref('/hora').push().key;
        const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
        const id = (key || '').substring(0, 8);
        let timestamp = 0;
        for (let i = 0; i < id.length; i++) {
            const c = id.charAt(i);
            timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c);
        }
        return timestamp;
    },
    getServerDateNegative() {
        return this.getServerDate() * -1;
    },
    update(path, instancia) {
        return firebase.database().ref(path).update(instancia);
    },
    push(path, instancia) {
        return firebase.database().ref(path).push(instancia);
    },
    set(path, instancia) {
        return firebase.database().ref(path).set(instancia);
    },
    getKey(path) {
        return firebase.database().ref(path).push({}).key;
    },
    multiPathUpdate(instancia) {
        return firebase.database().ref('/').update(instancia);
    },
    delete(path) {
        return firebase.database().ref(path).remove();
    }
};