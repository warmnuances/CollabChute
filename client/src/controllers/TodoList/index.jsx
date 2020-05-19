import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { updateTodos, addTodos } from '../../redux/Project/project.actions';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: '100%',
  },
  btnAddTodo: {
    width: '100%',
    fontWeight: 700
  },
  todoInput: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
}));


function TodoList(props) {
  const classes = useStyles();

  const { todos, match, updateTodos, addTodos } = props;
  const [todoInput, setTodoInput] = React.useState('');

  const handleToggle = (id, value) => () => {
    let result = todos.find(item => item._id === id);
    updateTodos(match, result);
  };

  const onChangeTodo = (e) => {
    setTodoInput(e.target.value)
  }

  const onTodoAdd = (e) => {
    addTodos(match,todoInput);
    setTodoInput('');
  }

  return (
    <Paper className={classes.root} elevation={1}>
      <TextField id="standard-basic" 
        value={todoInput}
        className={classes.todoInput} 
        onChange={onChangeTodo}
        label="Add Todo" 
        color="secondary"/>
      <Button
        onClick={onTodoAdd}
        variant="outlined"
        color="secondary"
        className={classes.btnAddTodo}
        startIcon={<AddCircleOutlineIcon />}
      > Add Todo</Button>
      <Divider />
      <List dense className={classes.list}>
          {todos.map((todo,index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            return(
            <ListItem key={todo._id} button onClick={handleToggle(todo._id,index)}>
              <ListItemText id={labelId} primary={todo.todo} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(todo._id,index)}
                  checked={todo.done}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            )
          })}
        
      </List>
    </Paper>
  )
}


export default withRouter(connect(null, {updateTodos, addTodos})(TodoList));
