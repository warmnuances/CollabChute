import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import {useSpring, animated} from 'react-spring'
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Divider } from '@material-ui/core';

import { Link } from "react-router-dom";
import LinkMui from '@material-ui/core/Link';



const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(9) + 1,
    [theme.breakpoints.up('sm')]: {
      width: '64px',
      
    },
  },
  brand: {
    width: '100%',
    paddingLeft:theme.spacing(3) - 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight:'700'
  },
  sideBarTitle: {
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 600,
    paddingLeft: theme.spacing(2) + 4
  },
  itemIcon:{
    paddingLeft: 4
  },
  gradientButton: {
    ...theme.palette.gradient,
    margin: '0 16px 16px 16px',
    flexGrow: 1
  },
  minimizedGB:{
    margin: '0 8px'
  },
  buttonContainer: {
    display: 'flex'
  },
  projectLink:{
    color: theme.palette.fontDefault,
    '& > div > span': {
      fontWeight: 700,
    }
  }
}))



function Sidebar() {
  const [showSide, setShowSide] = React.useState(true);
  const classes = useStyles();

  const projectPath = "collabchute"

  const toggleDrawer = () =>   {
    setShowSide(!showSide);
  };

  return (
     <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: showSide,
          [classes.drawerClose]: !showSide,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: showSide,
            [classes.drawerClose]: !showSide,
          }),
        }}
      > 
        <div className={classes.toolbar}>

          {
            showSide && <Brand />
          }
          <IconButton onClick={toggleDrawer}>
            {
              showSide? <ChevronLeftIcon/>: <MenuIcon />
            }
          </IconButton>
        </div>
        
        <LinkMui to={`/main/add-project`} component={Link} underline="none">
        {
          showSide? 
          <AddProjectButton />:
          <IconButton className={classes.minimizedGB} color="primary" aria-label="add project">
            <AddCircleIcon/>
          </IconButton>
        }
        </LinkMui>

        {
          showSide? 
            <Typography variant="h6" className={classes.sideBarTitle}>PROJECTS</Typography>:
            <Divider />
        }

        <LinkMui className={classes.projectLink} to={`/main/project/${projectPath}`} component={Link} underline="none">
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="CollabChute" />
          </ListItem>
        </LinkMui>
        

        <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon className={classes.itemIcon}>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
          </ListItem>
        ))}
        
        </List>
    </Drawer>
  )
}

function Brand(){
  const { brand,logoText } = useStyles();
  const fade = useSpring({opacity: 1, from: {opacity: 0}, delay: 200})
  return(
    <animated.div className={brand} style={fade}>
      <Typography variant="h6" className={logoText}>
        CollabChute
      </Typography>
    </animated.div>
  )
}

function AddProjectButton(){
  const { gradientButton, buttonContainer } = useStyles();
  const grow = useSpring({transform: 'scale(1)', from: {transform: 'scale(0)'}})
  return(
    <animated.div className={buttonContainer} style={grow}>
      <Button className={gradientButton} variant="contained" color="primary">
        Add Project
      </Button>
    </animated.div>
  )
}

export default Sidebar
