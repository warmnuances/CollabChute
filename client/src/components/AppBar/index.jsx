import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

/** Menu **/
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.fontDefault,
    textTransform: 'capitalize',
    fontWeight: 700
  },
  appBar: {
    backgroundColor: theme.palette.backgroundWhite,
  },
  avatarBadge: {
    '& > span': {
      marginTop: '6px',
      marginRight: '2px'
    },
  },
  avatar: {
    background: theme.palette.secondary.main
  }
}));

function AppBarComponent() {
  const classes = useStyles();
  let location = useLocation();

  const [user, setUser] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {lastPath}

          </Typography>
          {
            user? 
              <Badge
                className={classes.avatarBadge} 
                badgeContent={4} 
                onClick={handleClick}
                color="primary">
                <Avatar 
                  className={classes.avatar}
                  onClick={handleClick}
                  aria-controls="simple-menu" 
                  aria-haspopup="true"> OP   
                </Avatar>
              </Badge>: 
               <Link component={RouterLink} to="/auth/signin">
                <Button variant="outlined" color="primary" underline="none">Login</Button>
              </Link>
          }
          
        </Toolbar>
      </AppBar>
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>


    </div>
  )
}


export default AppBarComponent
