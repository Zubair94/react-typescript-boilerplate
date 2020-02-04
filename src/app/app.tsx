import * as React from "react";

export interface AppProps { compiler: string; framework: string; }

export class App extends React.Component<AppProps, {}> {
    render() {
        return <h1 className="header">Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}