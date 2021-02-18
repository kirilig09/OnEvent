import React from 'react';
import Login from './Login';
import Registration from './Registration';
import EventRouter from './EventRouter';
import ListEvents from  './ListEvents';
import Logout from './Logout';
import {
  login, 
  logout, 
  whoami, 
  get_participant_company,
  get_session
} from './Fetch';
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
      user: {},
      session: false
    };

    this.login_user = this.login_user.bind(this);
    this.logout_user=this.logout_user.bind(this);
    this.forceUpdateHandle = this.forceUpdateHandle.bind(this);
  }

  async login_user(username, password) {
    await login(username, password);
    const user = await whoami();
    this.setState({user: user});
    const session = await get_session();
    this.setState({session: session.login});
    console.log(this.state.session);
    console.log(this.state.user);
  }

  async logout_user() {
    await logout();
    this.setState({user: {}});
    const session = await get_session();
    this.setState({session: session.login});
    console.log(this.state.session);
    console.log(this.state.user);
  }

  async render_participant_company() {
    const company = await get_participant_company(this.state.user.id);
    return company;
  }

  forceUpdateHandle() {
    this.forceUpdate();
    console.log("At least I tried...");
  }

  async componentDidMount() {
    const session = await get_session();
    this.setState({session: session.login});
    console.log("Session: "+this.state.session);

    if(session.login == true) {
      const user = await whoami();
      
      this.setState({user: user});

      console.log("userState: "+this.state.user);
    } else {
      this.setState({user: {}});
      console.log(this.state.user);
    }
  }

  async componentDidUpdate() {

  }

  render () {
    const context_value = {
      user: this.state.user,
      login_user: this.login_user,
      logout_user: this.logout_user
    }

    return  <userContext.Provider value={context_value}>
              <div>
                <Router>
                  <AppBar position="static">
                    <Toolbar>
                      
                      {this.state.session == false ?
                        <div>
                          <Link color="inherit" component={RouterLink} to="/register">
                            Register as visitor
                          </Link>
                          <Link color="inherit" component={RouterLink} to="/login">
                            Login
                          </Link>
                        </div> :
                        <Link color="inherit" component={RouterLink} to="/logout">
                          Logout
                        </Link>
                      }

                      {/* <Link color="inherit" component={RouterLink} to="/register">
                        Register as visitor
                      </Link>
                      <Link color="inherit" component={RouterLink} to="/login">
                        Login
                      </Link>
                      <Link color="inherit" component={RouterLink} to="/logout">
                        Logout
                      </Link> */}

                      {this.state.user.role == "participant" ?
                        <Link color="inherit" component={RouterLink} to={"/view-company/"+this.state.user.id}>
                          My Company
                        </Link> :
                        null
                      }
                      {this.state.user.role == "visitor" || this.state.user.role == "admin" ?
                        <Link color="inherit" component={RouterLink} to="/list-events">
                          View events
                        </Link> :
                        null
                      }

                      {/* <Link color="inherit" component={RouterLink} to={"/view-company/"+this.state.user.id}>
                        My Company
                        </Link>
                        <Link color="inherit" component={RouterLink} to="/list-events">
                        View events
                      </Link> */}

                      <div>
                        <p>[Username: {this.state.user.name}]</p>
                      </div>
      
                    </Toolbar>
                  </AppBar>
                
                  
                  <Switch>

                    {this.state.session == false ?
                      <div>
                        <Route path="/register">
                          <Registration />
                        </Route>
                        <Route path="/login">
                          <Login />
                        </Route> 
                      </div> :
                      <Route path="/logout">
                        <Logout />
                      </Route>
                    }

                    {/* <Route to="/register">
                      <Registration />
                    </Route>
                    <Route to="/login">
                      <Login />
                    </Route>
                    <Route to="/logout">
                      <Logout />
                    </Route> */}

                    {this.state.user.role == "participant" ?
                      <Route path="/view-company/:user_id">
                        <ParseCompId />
                      </Route> :
                      null
                    }
                    {this.state.user.role == "visitor" || this.state.user.role == "admin" ?
                      <Route path="/list-events">
                        <EventRouter />
                      </Route> :
                      null
                    }

                    {/* <Route path="/view-company/:user_id">
                      <ParseCompId />
                    </Route>
                    <Route path="/list-events">
                      <EventRouter />
                    </Route> */}

                  </Switch>
                </Router>
              </div>
            </userContext.Provider>
  }
}

export default App;
