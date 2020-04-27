import * as React from "react";
import { hot } from "react-hot-loader";
import { Button } from "@material-ui/core";

class App extends React.Component<{}, undefined> {
    public render() {
        return (
            <Button variant="contained" color="primary" >hello material-ui</Button>
        );
    }
}

declare let module: object;

export default hot(module)(App);
