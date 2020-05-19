import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Transition } from 'react-spring/renderprops';
import Card from '@material-ui/core/Card';
import ChatContent from './content.jsx';
import io from 'socket.io-client';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 999,
    position: 'fixed',
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

let baseUrl ;
if(process.env.NODE_ENV === "development"){
  baseUrl = "http://localhost:5000";
}
else{
  baseUrl = "https://collabchute.herokuapp.com/";
}



function ChatRoom(props) {
  const classes = useStyles();
  const chatGroups = ['Main Chat'];

  const { match } = props;
 

  const [messages, setMessage] = useState([])
  const [isConnected, setConnect] = useState(false);
  const [_socket, setSocket] = useState(null);
  

  

  React.useEffect(() => {
    if(_socket){
      _socket.on("messages", (data) => {
        console.log(data)
        setMessage(arr => [...arr,data]);
      })
  
      return () => {
        _socket.emit("forceDisconnect")
      }
    }
  }, [_socket])


  const onConnect = (e) => {
    const projectName = match.params.projectname


    const socket = io.connect(baseUrl);
    setSocket(socket)
    setConnect(true);
    socket.emit("in:room",projectName);

    socket.on('list:message',data => {
      setMessage(data)
    })

  }

  const onMessageSent = (e,msg) =>{
    e.preventDefault();
    const projectName = match.params.projectname

    const data = Object.assign({});
    data.message = msg;
    data.roomName = projectName;
    _socket.emit("send:message", data);
  }

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
            {
              isConnected ? 
              <ChatContent data={chatGroups} messageList={messages} onMessage={onMessageSent}/>
              :
              <Button color="primary" onClick={onConnect}>Connect</Button>
            }
            </Card>
          </div>)
        }
      </Transition>
    </section>
  )
}

export default withRouter(ChatRoom)
