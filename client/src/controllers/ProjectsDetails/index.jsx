import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectDescription from '../ProjectDescription/index';
import ChatContainer from '../ChatContainer';
import MembersList from '../MembersList';
import AddFiles from '../AddFiles';
import Grid from '@material-ui/core/Grid';
import TodoList from '../TodoList';

import { getProject } from '../../redux/Project/project.actions';
import { listFiles } from '../../redux/File/file.actions.js';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  }
}));


function ProjectDetails(props) {
  const classes = useStyles();

  const { todos, getProject, description,listFiles, files, history ,match, projectName} = props;


  React.useEffect(() => {
    getProject(match.params.projectname);
    listFiles(match.params.projectname);

    let unlisten = history.listen((location) => {
      const paths = location.pathname.split("/")
      const projectName = paths.slice(-1)[0];

      if(paths[paths.length - 2] === "project"){
        getProject(projectName);
        listFiles(projectName)
      }
      
    });
    return () => {
      unlisten()
    }
  }, [])

  


  return (
    <>
      <section className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <ProjectDescription description={description} projectName={projectName}/>
          </Grid>
          <Grid item xs={4}>
            <MembersList />
          </Grid>
          <Grid item xs={8}>
            <AddFiles files={files}/>
          </Grid>
          <Grid item xs={4}>
            <TodoList todos={todos}/>
          </Grid>
        </Grid>  
      </section>
      <ChatContainer/>
    </>
  )
}

const mapStateToProps = state => {
  return{
    projectName: state.project.projectName,
    group: state.project.chatGroups,
    todos: state.project.todos || [],
    description: state.project.projectDetail,
    files: state.files.files
  }
}

export default withRouter(connect(mapStateToProps,{getProject ,listFiles})(ProjectDetails))
