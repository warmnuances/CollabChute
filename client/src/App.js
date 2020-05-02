import React , { useState ,useEffect } from 'react';
import io from 'socket.io-client';
// import { Route, Switch } from 'react-router-dom';
// import Landing from './Pages/Landing';
// import SignIn from './Pages/SignIn';
// import SignUp from './Pages/SignUp';
// import WorkSpace from './Pages/WorkSpace';
// import SignInForm from './components/form';

function App() {
  useEffect(() => {
    const socket = io.connect('http://localhost:5000');
    socket.on('news', (data) => {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  })
  return (
    <div className="App">
      <h1>Chat</h1>
      {/* <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/signin" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/workspace/:projid" component={WorkSpace}/>
      </Switch> */}
      {/* <SignInForm /> */}


    </div>
  );
}


export default App;
