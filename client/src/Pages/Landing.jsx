import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProjectFeed from '../controllers/ProjectFeed'; 
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
}))

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ProjectFeed />
        </Grid>
        <Grid item xs={4}>
          <h6>Top</h6>
        </Grid>
      </Grid>
    </div>
  )
}

export default Landing
