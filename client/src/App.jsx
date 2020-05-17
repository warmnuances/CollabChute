import React , {useEffect} from 'react';
import io from 'socket.io-client';
import Main from './Pages/Main.jsx'
import Authentication from './Pages/Authentication';
import { Route, Switch ,Redirect , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { renewToken } from './redux/Auth/auth.actions';
import './Scss/global.scss';

function App(props) {
  // useEffect(() => {
  //   const socket = io.connect('http://localhost:5000');
  //   socket.on('news', (data) => {
  //     console.log(data);
  //     socket.emit('my other event', { my: 'data' });
  //   });
  // })

  const { history } = props;

  React.useEffect(() => {
    let user = sessionStorage.getItem("user");
    user? history.push("/main/board"): history.push("/auth/signin");
  },[])
  

  return (
    <div className="App">
      <Switch>
        <Route path="/main" component={Main}/>
        <Route path="/auth" component={Authentication}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  console.log("State", state)
  return{
    user: state.auth.user
  }
}


export default withRouter(connect(mapStateToProps,{ renewToken })(App));
