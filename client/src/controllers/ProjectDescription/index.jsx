import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width:'100%',
    height: '100%'
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

function ProjectDescription(props) {
  const classes = useStyles();
  const { description, projectName } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography className={classes.projectTitle} variant="h5" gutterBottom>
        {projectName}
      </Typography>
      <Typography className={classes.caption} display="block" variant="caption" gutterBottom>
        Start Collaborating
      </Typography>
      <Typography className={classes.description} variant="body1" gutterBottom>
        {description}
      </Typography>
    </Paper>
  )
}

export default ProjectDescription
