import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { userSignIn } from '../../redux/Auth/auth.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 320,
  },
  button: {
    marginTop: theme.spacing(5)
  },
  forgetPass: {
    alignSelf: 'flex-end',
    width: 'fit-content'
  },
  signUp: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
}));

function SignIn(props) {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

  const classes = useStyles();

  const onInputChange = (e) =>{
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log(input)

    const { userSignIn, history } = props;
    userSignIn(history,input);
    
  }
  
  return (
    <form className={classes.root} onSubmit={onFormSubmit}>
      <TextField
        onChange={onInputChange}
        name="email"
        label="Email"
        id="outlined-dense-email"
        className={classes.textField}
        margin="dense"
        variant="filled"
        value={input.name}
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            <AccountCircleIcon />
          </InputAdornment>
        }}/>

      <TextField
        onChange={onInputChange}
        name="password"
        type="password"
        label="Password"
        id="outlined-margin-dense"
        className={classes.textField}
        margin="dense"
        variant="filled"
        value={input.password}
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            <VpnKeyIcon />
          </InputAdornment>
        }}/>
        <Button className={classes.forgetPass} color="primary">forget password?</Button>
        <Button className={classes.button} type="submit" color="primary" variant="contained">Log In</Button>
        <Typography
          className={classes.signUp} 
          variant="caption">
          Don't have an account?
          <Link component={RouterLink} to="/auth/signup"> Sign Up</Link>
        </Typography>
    </form>
  )
}

export default withRouter(connect(null,{userSignIn})(SignIn));
