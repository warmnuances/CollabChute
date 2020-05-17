import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectDescription from '../ProjectDescription/index';
import ChatContainer from '../ChatContainer';
import AddFiles from '../AddFiles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  }
}));

function ProjectDetails() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ChatContainer />
      <ProjectDescription /><br/>
      <AddFiles />
    </section>
  )
}

export default ProjectDetails
