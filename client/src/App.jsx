import React , {useEffect} from 'react';
import io from 'socket.io-client';
import Main from './Pages/Main.jsx'
import Authentication from './Pages/Authentication';
import { Route, Switch , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BackdropLoader from './controllers/Loader';
import './Scss/global.scss';

function App(props) {
  // useEffect(() => {
  //   const socket = io.connect('http://localhost:5000');
  //   socket.on('news', (data) => {
  //     console.log(data);
  //     socket.emit('my other event', { my: 'data' });
  //   });
  // })

  const { history , loading ,user } = props;


  React.useEffect(() => {
    // let user = sessionStorage.getItem("user");
    // user? history.push("/main/home"): history.push("/auth/signin");
    // return () => {
    //   sessionStorage.removeItem("user");
    // }
    user === {} ? history.push("/main/home"): history.push("/auth/signin")
  },[])
  


  return (
    <div className="App">
      <BackdropLoader open={loading}/>
      <Switch>
        <Route path="/main" component={Main}/>
        <Route path="/auth" component={Authentication}/>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    loading: state.loading.loader
  }
}


export default withRouter(connect(mapStateToProps, null)(App));
