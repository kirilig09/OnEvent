import React from 'react';
import Event from './Event.js';
import EventRouter from './EventRouter.js';
import Registration from './Registration.js';
import Login from './Login';
import LogSwitch from './LogSwitch'
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

class Main extends React.Component {

    render() {
        return <Router>
                    <div>
                        <Link color="inherit" component={RouterLink} to="/events">
                            <Button color="primary" variant="contained">View events</Button>
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/registration">
                            <Button color="primary" variant="contained">Register</Button>
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/login">
                            <Button color="primary" variant="contained">Login/out</Button>
                        </Link>
                        
                        <Switch>
                            <Route path="/events">
                                <EventRouter />
                            </Route>
                            <Route path="/registration">
                                <Registration />
                            </Route>
                            <Route path="/login">
                                <LogSwitch />
                            </Route>
                        </Switch>
                    </div>
                </Router>
    }
}

export default Main;