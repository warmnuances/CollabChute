import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Landing from './Landing';
import AppBar from '../components/AppBar';
import SideBar from '../components/Sidebar';
import ProjectDetails from '../controllers/ProjectsDetails';
import AddProject from '../controllers/AddProject';
import { useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height:'100vh',
    width:'100vw',
    display:'flex'
  },
  content: {
    width:'100%'
  },
  contentStart: {
    padding: theme.spacing(3)
  }
}));

function MainComponent() {
  const classes = useStyles();
  let location = useLocation();

  return (
    <section className={classes.root}>
      {location.pathname === '/main' && <Redirect to="/main/project" />}
      
      <SideBar/>
      <div className={classes.content}>
        <AppBar/>
        <section className={classes.contentStart}>
          <Switch>
            <Route exact path="/main/add-project" component={AddProject} />
            {/* <Route exact path="/main/home" component={Landing}/> */}
            <Route path="/main/project/:projectname" component={ProjectDetails}/>
          </Switch>
        </section>
      </div>
    
    </section>
  )
}

export default MainComponent
