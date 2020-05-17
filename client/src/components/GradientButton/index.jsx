import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  gradientButton: {
    ...theme.palette.gradient,
    margin: '0',
    flexGrow: 1,
    color: '#FFFFFF',
    fontWeight: 700,
    marginTop: theme.spacing(3)
  },
}));

function GradientButton(props) {
  const classes = useStyles();
  const {text, ...others}  = props;
  return (
    <Button {...others} className={classes.gradientButton} variant="contained">{props.text}</Button>
  )
}

export default GradientButton
