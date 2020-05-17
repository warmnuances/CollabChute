import React from 'react'
import { lighten,makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import StarIcon from '@material-ui/icons/Star';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height:'100%'
  },
  content: {
    padding:theme.spacing(2)
  },
  avatar:{
    height: '120px',
    width: '120px',
    marginBottom: theme.spacing(2),
    boxShadow:  theme.shadows[1]
  },
  projectTitle: {
    fontWeight:700,
  },
  projectDetails: {
    marginTop:theme.spacing(3),
  },
  applyButton:{
    width: '100%',
    height:'fit-content'
  },
  cardButton: {
    minWidth:'45%',
    width: 'fit-content',
    height:'fit-content',
  },
  shiftFirstChild: {
    marginRight: '10%'
  }

}))

const fakeData = ['ABC','DEF','GHI']

const BorderLinearProgress = withStyles({
  root: {
    flexGrow: 1,
    height: 10,
    borderRadius: 50,
    backgroundColor: lighten('#ff6c5c', 0.5),
    marginRight: 16
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);

function ProjectFeed() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1}>
      {
        fakeData.map((item, index) => {
          return(
            <ProjectFeedItem key={index} data={item}/>
          )
        })
      }
    </Paper>
  )
}

function ProjectFeedItem(props){
  const classes = useStyles();
  return(
    <>
    <div className={classes.content}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Avatar 
            className={classes.avatar}
            alt="Remy Sharp" 
            src="https://www.placecage.com/c/460/300" />
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.projectTitle} variant="h5">Project Name</Typography>
          <Typography className={classes.projectDetails} variant="subtitle1">Project Details</Typography>
        </Grid>
        <Grid container item xs={3}>
          <Button 
            startIcon={<InfoIcon/>}
            className={classes.applyButton}
            variant="contained">Message</Button>
            <Button 
              aria-label="Email"
              variant="contained"
              className={clsx(classes.cardButton,classes.shiftFirstChild)}>
                <EmailIcon />
            </Button>
            <Button 
              aria-label="Starred"
              variant="contained"
              className={classes.cardButton}>
                <StarIcon />
            </Button>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <BorderLinearProgress
          className={classes.margin}
          variant="determinate"
          color="secondary"
          value={50}
        />
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold" m={1}>
          10%
          </Box>
        </Typography>
      </Grid>
    </div>
    <Divider />
    </>
  )
}


export default ProjectFeed;
