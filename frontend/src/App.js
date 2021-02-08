import React from 'react';
import LogForm from './LogForm';
import ViewCompany from './ViewCompany';
import EventRouter from './EventRouter';
import Logout from './Logout';
import {login, logout, whoami, get_participant_company} from './Fetch';
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
import ParseCompId from './ParseCompId';

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
    console.log(this.state.user);
  }

  async logout_user() {
    await logout();
    this.setState({user: {}});
    console.log(this.state.user);
  }

  async render_participant_company() {
    const company = await get_participant_company(this.state.user.id);
    return company;
  }

  render () {
    const context_value = {
      user: this.state.user,
      login_user: this.login_user,
      logout_user: this.logout_user
    }

    return  <userContext.Provider value={context_value}>
              <Router>
                <div>
                  <AppBar position="static">
                    <Toolbar>
                      <Link color="inherit" component={RouterLink} to="/log-form">LoginForm</Link>
                      {this.state.user.role == "participant" ?
                        <Link color="inherit" component={RouterLink} to={"view-company/"+this.state.user.id}>My Company</Link> :
                        <Link color="inherit" component={RouterLink} to="/list-events">View events</Link>
                      }
                      
                      <Link color="inherit" component={RouterLink} to="/logout">Log out</Link>
                      <div>
                        <p>[Username: {this.state.user.name}]</p>
                      </div>
                    </Toolbar>
                  </AppBar>
                  
                  <Switch>
                      <Route path="/log-form">
                          <LogForm />
                      </Route>
                      {this.state.user.role == "participant" ?
                        <Route path="/view-company/:user_id">
                          <ParseCompId />
                        </Route> :
                        <Route path="/list-events">
                          <EventRouter />
                        </Route>
                      }
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
