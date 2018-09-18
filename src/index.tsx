import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import { GAPI } from './providers/gapi';
import { AuthData } from './providers/auth';
import { config } from './config';

firebase.initializeApp(config);

GAPI.setConfig({
  apiKey: config.apiKey,
  clientId: config.clientId,
  discoveryDocs: config.discoveryDocs,
  scope: config.scopes.join(" ")
})

AuthData.authState().subscribe(((auth) => {
  if (auth) {
    GAPI.getInstance().then(async (gapi) => {
      let credential: any = localStorage.getItem('gt');
      credential = credential ? JSON.parse(credential) : {};
      await gapi.client.setToken({ access_token: credential.accessToken });
    })
  }
}))



ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
