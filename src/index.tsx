import "core-js/stable";
import "regenerator-runtime/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app/app";
import "./styles/styles.scss";
ReactDOM.render(
    <App compiler="TypeScript Yea" framework="React" />,
    document.getElementById("root")
);