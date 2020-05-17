import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width:'100%'
  },
  projectTitle: {
    fontWeight: 700
  },
  caption: {
    marginBottom: '0.25rem'
  },
  description: {
    fontFamily: theme.typography.alternative
  },
}));

function ProjectDescription() {
  const classes = useStyles();
  
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography className={classes.projectTitle} variant="h5" gutterBottom>
        Collab Chute
      </Typography>
      <Typography className={classes.caption} display="block" variant="caption" gutterBottom>
        This project aims to increase collaboration
      </Typography>
      <Typography className={classes.description} variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum esse ducimus nostrum! Totam corrupti voluptatum recusandae, veritatis ad ipsa explicabo delectus, incidunt dolorum facere nam laudantium dicta error, nesciunt amet.
      </Typography>
    </Paper>
  )
}

export default ProjectDescription
