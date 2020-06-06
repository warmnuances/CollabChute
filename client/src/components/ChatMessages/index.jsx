import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    overflow: 'auto',
    marginBottom: theme.spacing(2),
    flexBasis: '100%'
  },
  LeftAlignText: {
    textAlign: 'left'
  },
  RightAlignText: {
    textAlign: 'right'
  }
}));


// function LeftAlignText({text}){
//   const { LeftAlignText } = useStyles();
//   return(
//     <Typography className={LeftAlignText} variant="body1" gutterBottom>
//       {text}
//     </Typography>
//   )
// }
// function RightAlignText({text}){
//   const { RightAlignText } = useStyles();
//   return(
//     <Typography className={RightAlignText} variant="body1" gutterBottom>
//       {text}
//     </Typography>
//   )
// }

function ChatMessages(props) {
  const classes = useStyles();

  // const thisUser = "john";

  // const messages = [{
  //   message: "asdsadasds",
  //   user: 'john'
  // },{
  //   message: "CBBASHDH",
  //   user: 'bob'
  // },{
  //   message: "HGUGUGUUA",
  //   user: 'peter'
  // }]


  const { messages } = props;
  return (
    <div className={classes.root}>
       <Paper elevation={0}>
        {
          messages.map((msg, index) => {
            return(
              <div key={index}>
              {/* {
                thisUser === msg.user? 
                  <LeftAlignText text={msg.message}/>:
                  <RightAlignText text={msg.message}/>
              } */}
                <Typography variant="body1" gutterBottom>
                  {msg}
                </Typography>
              </div>
            )
          })
        }
      </Paper>
    </div>
  )
}

export default ChatMessages;
