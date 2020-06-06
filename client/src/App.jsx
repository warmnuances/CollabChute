import React  from 'react';
import Main from './Pages/Main.jsx'
import Authentication from './Pages/Authentication';
import { Route, Switch , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import BackdropLoader from './controllers/Loader';
import ErrorPage from './Pages/Error';
import './Scss/global.scss';

function App(props) {
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
        <Route path="/error" component={ErrorPage}/>
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
