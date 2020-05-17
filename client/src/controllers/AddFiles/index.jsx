import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import { connect } from 'react-redux';
import { listFiles, addFile } from '../../redux/File/file.actions.js';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  files: {
    padding: theme.spacing(1),
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.divider
  },
  uploadBtn: {
    width: 'fit-content'
  }
}));

function AddFiles(props) {
  const classes = useStyles();
  const { match, listFiles, files, addFile } = props;

  const onFileUpload = (e) => {
    addFile(match, e.target.files);
  }

  React.useEffect(() => {
    listFiles(match);
  }, [listFiles, match])

  return (
    <Paper className={classes.root} elevation={1}>
      <Paper className={classes.files} elevation={0}>
          <Typography variant="h6" className={classes.title}>
            Files
          </Typography>
          <div className={classes.demo}>
            <List>
              {
                files.map((file,index) => {
                  return(
                    <ListItem key={index}>
                      <ListItemIcon>
                        <InsertDriveFileIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={file}
                      />
                    </ListItem>
                  )
                }) 
              }
            </List>
          </div>

          
          <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              name="file"
              onChange={onFileUpload}
            />
            <label htmlFor="raised-button-file">
              <Button component="span" color="primary" className={classes.uploadBtn}>
                Upload File
              </Button>
            </label> 
      </Paper>
    </Paper>
  )
}

const mapStateToProps = (state) => {
  return{
    files: state.files.files
  }
}

export default withRouter(connect(mapStateToProps, {listFiles, addFile} )(AddFiles));
