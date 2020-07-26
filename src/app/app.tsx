import * as React from 'react';
import logo from '../assets/logo.svg';
import './app.scss';

export interface AppProps {
    compiler: string;
    framework: string;
}

export class App extends React.Component<AppProps> {
    render(): JSX.Element {
        return (
            <div className="header">
                <img src={logo} alt="logo" />
                <h1>
                    Hello from {this.props.compiler} and {this.props.framework}!
                </h1>
            </div>
        );
    }
}
