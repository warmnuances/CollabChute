import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SignIn from '../controllers/SignIn';
import SignUp from '../controllers/SignUp';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  brand: {
    borderRight: theme.borderRight
  },
  logo: {
    width: '100%',
    height: '100%'
  },
  firstItem: {
    borderRight: '1px solid #CACACA',
    height: '100%'
  },
  secondItem:{
    display:'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    background: '#ffffff',
    height:'100%'
  },
  title: {
    fontWeight: 700,
    color: theme.palette.fontDefault
  },
  caption: {
    marginBottom: theme.spacing(4)
  }
}));


function Authentication(props) {
  

  const classes = useStyles();

  const imageUrl = "https://cdn.pixabay.com/photo/2016/10/25/14/37/landscape-1769052_960_720.png"

  return (
    <Grid className={classes.root} container alignItems="center" justify="center">
      <Grid className={classes.firstItem} item xs={6}>
        <img className={classes.logo} src={imageUrl} alt="logo"/>
      </Grid>
      <Grid className={classes.secondItem} item xs={6}>
        <Typography className={classes.title} variant="h4">
          CollabChute
        </Typography>
        <Typography className={classes.caption} variant="caption" gutterBottom>
          A collaboration tool to manage your projects
        </Typography>
        <Switch>
          <Route exact path="/auth/signin" component={SignIn}/>
          <Route exact path="/auth/signup" component={SignUp}/>
        </Switch>
      </Grid>
    </Grid>
  )
}


export default withRouter(Authentication);
