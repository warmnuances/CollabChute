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
import FaceIcon from '@material-ui/icons/Face';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';

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

function SignIn() {
  const [input, setInput] = React.useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const classes = useStyles();

  const onInputChange = (e) =>{
    console.log(input)
    setInput({
      ...input,
      [e.target.name]:e.target.value
    })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log("dasdasd")
  }
  
  return (
    <form className={classes.root} onSubmit={onFormSubmit}>
       <TextField
        onChange={onInputChange}
        name="name"
        label="Name"
        id="outlined-margin-dense"
        className={classes.textField}
        margin="dense"
        variant="filled"
        value={input.name}
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            <FaceIcon />
          </InputAdornment>
        }}/>

      <TextField
        onChange={onInputChange}
        name="email"
        label="Email"
        id="outlined-margin-dense"
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

      <TextField
        onChange={onInputChange}
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        id="outlined-margin-dense"
        className={classes.textField}
        margin="dense"
        variant="filled"
        value={input.password}
        InputProps={{
          startAdornment: 
          <InputAdornment position="start">
            <EnhancedEncryptionIcon />
          </InputAdornment>
        }}/>


        <Button className={classes.forgetPass} color="primary">forget password?</Button>
        <Button className={classes.button} type="submit" color="primary" variant="contained">Log In</Button>
        <Typography
          className={classes.signUp} 
          variant="caption">
          Already have an account?
          <Link component={RouterLink} to="/auth/signin"> Sign In</Link>
        </Typography>
    </form>
  )
}

export default SignIn
