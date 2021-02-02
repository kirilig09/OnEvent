import React from 'react';
import LogForm from './LogForm';
import Main from './Main';
import Logout from './Logout';
import {login, logout, whoami} from './Fetch';
import './App.css';
import userContext from './userContext';
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

// const useStyles = makeStyles((theme) => ({
//   link: {
//     marginRight: "1.25em"
//   },
// }));

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };

    this.login_user = this.login_user.bind(this);
    this.logout_user=this.logout_user.bind(this);
  }

  async login_user(username, password) {
    await login(username, password);
    const user = await whoami();
    this.setState({user: user});
  }

  async logout_user() {
    await logout();
    this.setState({user: {}});
  }

  render () {
    const context_value = {
      user: this.state.user,
      login_user: this.login_user,
      logout_user: this.logout_user
    }

    return <userContext.Provider value={context_value}>
              <Router>
                <div>
                  <AppBar position="static">
                    <Toolbar>
                      <Link color="inherit" component={RouterLink} to="/log-form">LoginForm</Link>
                      <Link color="inherit" component={RouterLink} to="/main">Main</Link>
                      <Link color="inherit" component={RouterLink} to="/logout">Log out</Link>
                    </Toolbar>
                  </AppBar>
                  
                  <Switch>
                      <Route path="/log-form">
                          <LogForm />
                      </Route>
                      <Route path="/main">
                        <Main />
                      </Route>
                      <Route path="/logout">
                        <Logout />
                      </Route>
                  </Switch>
                </div>
              </Router>
            </userContext.Provider>
  }
}

export default App;
