import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from '../components/AppBar';
import SideBar from '../components/Sidebar';
import ProjectDetails from '../controllers/ProjectsDetails';
import AddProject from '../controllers/AddProject';
import Landing from '../Pages/Landing';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    height:'100vh',
    width:'100vw',
    display:'flex'
  },
  content: {
    width:'100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentStart: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function MainComponent(props) {
  const classes = useStyles();
  let location = useLocation();

  const [user, setUser] = React.useState();
  const { projects } = props;

  React.useEffect(() => {
    let currentUser = sessionStorage.getItem("user");
    if(currentUser !== {}){
      setUser(currentUser);
    }else{
      setUser(null)
    }
  }, [user])


  return (
    <section className={classes.root}>
      {location.pathname === '/main' && <Redirect to="/main/home" />}
      
      <SideBar projects={projects}/>
      <div className={classes.content}>
        <AppBar user={user}/>
        <section className={classes.contentStart}>
          <Switch>
            <Route exact path="/main/add-project" component={AddProject} />
            <Route exact path="/main/home" component={Landing}/>
            <Route path="/main/project/:projectname" component={ProjectDetails}/>
          </Switch>
        </section>
      </div>
    
    </section>
  )
}

const getProjects = (state) => {
  const roles = state.auth.user.roles
  return roles.map(role => role.project_name);
}

const mapStateToProps = state => {
  return{
    projects: getProjects(state)
  }
}
export default connect(mapStateToProps, null)(MainComponent)
