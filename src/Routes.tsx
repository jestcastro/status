import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Login from "./modules/Login";

class Routes extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <Switch>
        <Route exact={true} path={"/"} component={Login} />
      </Switch>
    );
  }
}
export default withRouter(Routes);
