import React , { useState } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Landing from './Pages/Landing';
// import SignIn from './Pages/SignIn';
// import SignUp from './Pages/SignUp';
// import WorkSpace from './Pages/WorkSpace';
import SignInForm from './components/form';
import NavigationBar from './components/NavigationBar';

function App() {
  const [navState, toggleNavState] = useState(true);

  return (
    <div className="App">

      <NavigationBar state={navState} color="#12312"/>

      {/* <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/workspace/:projid" component={WorkSpace}/>
      </Switch> */}
      <button onClick={() => toggleNavState(!navState)}>Show Navigation</button>
    
      <SignInForm />
    </div>
  );
}


export default App;
