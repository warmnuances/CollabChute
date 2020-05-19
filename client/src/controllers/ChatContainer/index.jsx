import React from 'react'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatRoom from '../../components/ChatRoom';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  }
}));

function ChatContainer() {
  const classes = useStyles();
  const [chat ,setChatOpen] = React.useState(false);

  const onFabClick = () => {
    setChatOpen(!chat)
  }
  return (
    <>
       <Fab className={classes.fab} onClick={onFabClick} color="primary" aria-label="add">
        <ChatBubbleIcon />
       </Fab>
       <ChatRoom open={chat}/>
    </>
  )
}

export default ChatContainer
