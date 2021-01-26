import logo from './logo.svg';
import Event from './Event.js';
import EventRouter from './EventRouter.js';
import Registration from './Registration.js';
import Login from './Login';
import LogSwitch from './LogSwitch'
import './App.css';
import {isLogged} from './Fetch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from 'react-router-dom';
import {
  Button,
  AppBar,
  Toolbar,
  Link,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: "1.25em"
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link className={classes.link} color="inherit" component={RouterLink} to="/events">Events</Link>
            <Link className={classes.link} color="inherit" component={RouterLink} to="/registration">Register</Link>
            <Link className={classes.link} color="inherit" component={RouterLink} to="/login">Login/Logout</Link>
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route path="/events">
            <EventRouter />
          </Route>
          <Route path="/registration">
            <Registration user_role="visitor" event="" />
          </Route>
          <Route path="/login">
            <LogSwitch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
