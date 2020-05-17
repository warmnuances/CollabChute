import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Transition } from 'react-spring/renderprops';
import Card from '@material-ui/core/Card';
import ChatContent from './content.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 88,
    right: 24,
  },
  content:{
    width: 700,
    height: 450,
  },
  chatGroups: {
    borderRight: '1px solid #CACACA',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(2),
  },
}));

function ChatRoom(props) {
  const classes = useStyles();
  const chatGroups = ['Group1','Group2','Group3']

  return (
    <section className={classes.root}>
      <Transition 
        items={props.open}
        from={{ opacity: 0 , config: { tension: 350, friction: 40}}}
        enter={{  opacity: 1 , config: { tension: 350, friction: 40}}}
        leave={{  opacity: 0 , config: { tension: 350, friction: 40}}}>

        {open => open && (props => 
        
          <div style={props}>
            <Card className={classes.content} elevation={3}>
              <ChatContent data={chatGroups}/>
            </Card>
          </div>)
        
        }
      </Transition>
    </section>
  )
}

export default ChatRoom
