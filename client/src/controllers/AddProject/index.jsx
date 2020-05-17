import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import GradientButton from '../../components/GradientButton';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  content: {
    padding: '48px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginBottom: theme.spacing(3)
  },
  title: {
    fontWeight: 700,
    textAlign: "left"
  },
  projectForm: {
    marginTop: theme.spacing(4),
    minWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      minWidth: 500
    }
  },
}));

function AddProject() { 
  const classes = useStyles();

  const [project, setProject] = React.useState({
    name: '',
    details: '',
    visibility: 'private',
  })


  const onInputChange = (e) =>{
    setProject({
      ...project,
      [e.target.name]:e.target.value
    })
  }

  const onToggleVisibility = (e,value) => {
    setProject({
      ...project,
      "visibility":value
    })
  }

  return (
    <section className={classes.root}>
      <Paper className={classes.content} elevation={1}>
        <Typography 
          className={classes.title}
          variant="h5" 
          component="h5">
          Create a new Collaboration Project
        </Typography>

        <Typography variant="caption" gutterBottom>
          What your awesome project is going to be and how other people is going to help you
        </Typography>


        <form
          className={classes.projectForm}>

          <TextField
            onChange={onInputChange}
            name="name"
            label="Project Name"
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            value={project.name}
            InputProps={{
              startAdornment: 
              <InputAdornment position="start">
                <GroupWorkIcon  color="secondary"/>
              </InputAdornment>
            }}/>

          <TextField
            onChange={onInputChange}
            name="details"
            label="Project Details"
            id="outlined-multiline-static"
            className={classes.textField}
            variant="outlined"
            multiline
            rows={4}
          />  

          <ToggleButtonGroup 

            exclusive
            className={classes.visibilityGroup}
            size="small" 
            value={project.visibility} 
            name="visibility"
            onChange={onToggleVisibility}>
            <ToggleButton value="private">
              <LockIcon/>
              <Typography variant="button"> Private</Typography>
            </ToggleButton> 
            <ToggleButton value="public">
              <LockOpenIcon />
              <Typography variant="button"> Public</Typography>
            </ToggleButton> 
          </ToggleButtonGroup>
          
          <GradientButton type="submit" text="Create Project"/>
        </form>
      </Paper>
    </section>
  )
}

export default AddProject
