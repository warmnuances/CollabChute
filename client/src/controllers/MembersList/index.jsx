import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import { addMember } from '../../redux/Project/project.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  listText: {
    textTransform: 'Capitalize'
  },
  membersList: {
    maxHeight: 240,
    overflow: 'auto'
  },
  listTitle:{
    fontWeight: 700
  },
  addBtn: {
    marginTop:theme.spacing(3),
    width: '100%'
  },
  modalStyle: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    margin:'auto',
    marginTop: 240,
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    height: 240,
    padding: theme.spacing(2, 4, 3),
  },
  memberInput: {
    width: '100%'
  }
}));

function MembersList(props) {
  const classes = useStyles();

  const { addMember, members, createdBy, match } = props;

  const [open, setOpen] = React.useState(false);
  const [add,setAdd] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onAddMember = (e) => {
    addMember(match,add)
    setAdd("")
  }

  const onAddInputChange = (e) => {
    setAdd(e.target.value);
  }

  return (
    <>
    <Paper elevation={1} className={classes.root}>
      <Typography className={classes.listTitle} variant="h6" gutterBottom>
          Members
      </Typography>
      <List className={classes.membersList}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.listText}
            primary={createdBy}
            secondary={"Project Owner"}
          />
        </ListItem>
        
      {
        members.map((item, index) => {
          return(
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.listText}
                primary={item}
                secondary={"Member"}
              />
            </ListItem>
          )
        })
        
      }
      </List>
      <Button className={classes.addBtn} onClick={handleOpen} color="primary">
        Add Member
      </Button>
    </Paper>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className={classes.modalContent} elevation={3}>
          <TextField 
            className={classes.memberInput} 
            name="member"
            value={add}
            onChange={onAddInputChange}
            id="outlined-basic" 
            label="Member" 
            helperText="Add Member by Email" 
            variant="outlined" />

          <Button 
            type="submit"
            variant="contained"
            className={classes.addBtn} 
            onClick={onAddMember} 
            color="primary">
            Add Member
          </Button>
        </Paper>
    </Modal>
    </>
  )
}
const mapStateToProps = state => {
  return{
    members: state.project.members || [],
    createdBy: state.project.createdBy || ""
  }
}

export default withRouter(connect(mapStateToProps, { addMember })(MembersList))
