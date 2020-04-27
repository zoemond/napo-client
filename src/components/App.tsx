import * as React from "react";
import { hot } from "react-hot-loader";
import { Button } from "@material-ui/core";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
                <img src={reactLogo.default} height="480" />
                <Button variant="contained" color="primary" >hello material-ui</Button>
            </div>
        );
    }
}

declare let module: object;

export default hot(module)(App);
