import React from "react";
import { Route, Switch } from "react-router-dom";
import ScannerApp from './ScannerApp';

function RoutesRoot() {
  return (
      <Switch>
        <Route path="/" exact render={() => <ScannerApp/>} />
      </Switch>
  );
}

export { RoutesRoot };