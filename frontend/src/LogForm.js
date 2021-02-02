import React from 'react';
import Login from './Login';
import Registration from './Registration';
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
    Link
  } from '@material-ui/core';

class LogForm extends React.Component {
    
    render() {
        return <Router>
                    <div>
                        <Link color="inherit" component={RouterLink} to="/registration">
                            <Button color="primary" variant="contained">Register</Button>
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/login">
                            <Button color="primary" variant="contained">Login</Button>
                        </Link>
                        
                        <Switch>
                            <Route path="/registration">
                                <Registration />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </div>
                </Router>
    }
}

export default LogForm;