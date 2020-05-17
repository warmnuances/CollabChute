import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ChatMessage from '../ChatMessages';



function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabLabel: {
    fontFamily: theme.typography.alternative
  },
  groupTitle: {
    fontFamily: theme.typography.alternative,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  tabContent: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  input: {
    width: '100%',
    '& > div > input': {
      padding: '8px 14px'
    }
  },
  wrapper :{
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  groupTabs: {
    padding: '16px 8px',
    backgroundColor: '#253042',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  const [message, setMessage] = React.useState();

  const onSendMessage = (e) => {
    e.preventDefault();
    console.log("Clicked Send")
  }

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div
      className={classes.tabContent}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={classes.wrapper}>
        <ChatMessage />
        <FormControl className={classes.input} variant="outlined">

          <OutlinedInput
            size="small"
            id="outlined-adornment-password"
            onChange={handleMessage}
            value={message}
            labelWidth={0}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onSendMessage}
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />

        </FormControl>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.groupTabs}>
        <Typography className={classes.groupTitle} variant="h6" gutterBottom>
            Group Chats
        </Typography>

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {
            props.data.map((item, index) => {
              return(
                <Tab className={classes.tabLabel} key={index} label={item} {...a11yProps(index)} />
              )
            })
          }
        </Tabs>
      </div>
        {
          props.data.map((item, index) => {
            return(
              <TabPanel key={index} value={value} index={index}/>
            )
          })
        }
      
    </div>
  );
}
