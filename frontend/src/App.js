import logo from './logo.svg';
import Event from './Event.js';
import EventList from './EventList.js';
import Registration from './Registration.js'
import './App.css';
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
          </Toolbar>
        </AppBar>
        
        <Switch>
          <Route path="/events">
            <EventList />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
