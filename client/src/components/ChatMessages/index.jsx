import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  LeftAlignText: {
    textAlign: 'left'
  },
  RightAlignText: {
    textAlign: 'right'
  }
}));


function LeftAlignText({text}){
  const { LeftAlignText } = useStyles();
  return(
    <Typography className={LeftAlignText} variant="body1" gutterBottom>
      {text}
    </Typography>
  )
}
function RightAlignText({text}){
  const { RightAlignText } = useStyles();
  return(
    <Typography className={RightAlignText} variant="body1" gutterBottom>
      {text}
    </Typography>
  )
}

function ChatMessages() {
  const classes = useStyles();

  const thisUser = "john";

  const messages = [{
    message: "asdsadasds",
    user: 'john'
  },{
    message: "CBBASHDH",
    user: 'bob'
  },{
    message: "HGUGUGUUA",
    user: 'peter'
  }]
  return (
    <div className={classes.root}>
      {
      messages.map((msg, index) => {
        return(
          <>
          {
            thisUser === msg.user? 
              <LeftAlignText text={msg.message}/>:
              <RightAlignText text={msg.message}/>
          }
          </>
        )
      })
      }
    </div>
  )
}

export default ChatMessages;
