import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import ProjectFeed from '../controllers/ProjectFeed'; 
// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
}))

// function Landing() {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
      
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <ProjectFeed />
//         </Grid>
//         <Grid item xs={4}>
//           <h6>Top</h6>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
       <Typography variant="caption" display="block" gutterBottom>
        Open an exisiting project at the side bar or Create a new project!
      </Typography>
    </div>
  )
}

export default Landing
