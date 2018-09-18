import * as React from 'react';
import { AuthData } from '../providers/auth';
import { GAPI } from '../providers/gapi';
export interface LoginProps {
}

export interface LoginState {
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
        }
    }
    public componentDidMount() {
        AuthData.authState().subscribe((user) => {
            console.log(user);
            if (user) {
                user.getIdToken().then((token) => {
                    console.log('token', token)
                })
            }
        })

    }
    public makeBody(to, subject, message) {
        const str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", to, "\n",
            "subject: ", subject, "\n\n",
            message
        ].join('');

        const encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
    }
    public onLogin = async () => {
        const user = AuthData.getUser()
        if (user) {
            this.sendEmail();
        } else {
            AuthData.loginGoogle().then((data) => {
                console.log(data)
                if (data.credential) {
                    // @ts-ignore
                    localStorage.setItem('gt', JSON.stringify(data.credential));
                }
            });
        }
    }
    public async sendEmail() {
        const gapi: any = await GAPI.getInstance();
        const raw = this.makeBody('jest.castro@gmail.com', 'test subject', 'test message');
        gapi.client.gmail.users.messages.send({
            userId: 'me',
            resource: {
                raw
            }
        }).then((response) => {
            console.log(response);
        });
    }

    public render() {
        return (
            <div>
                <button onClick={this.onLogin}>Log in</button>
            </div>
        );
    }
}
