import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Pages/Landing';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import WorkSpace from './Pages/WorkSpace';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/workspace/:projid" component={WorkSpace}/>
      </Switch>
    </div>
  );
}

export default App;
