import React from 'react';
import ListUsers from './ListUsers';
import ListCopmanies from './ListCompanies';
import DeactivateEvent from './DeactivateEvent';
import ParticipantRegistration from './ParticRegistration';
import userContext from './userContext';
import {
    Button,
    Link
} from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
  } from 'react-router-dom';
import CreateCompany from './CreateCompany.js';

class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.event.subscriptable ?
                        <h3>Entry fee: {this.props.event.payment} $</h3> :
                        <h3>Free entrance!</h3>
                    }
                    <p>Name: {this.props.event.name} | Participants: {this.props.event.participants} | Visitors: {this.props.event.visitors}</p>
                    <ListUsers event_id={this.props.event.id}/>
                    <userContext.Consumer>
                        {({session}) => {
                            if(session) {
                                return (
                                    <ListCopmanies event={this.props.event}/>
                                );
                            } else {
                                return (
                                    <div>
                                        <Button color="primary" variant="outlined" disabled> Log in to explore</Button>
                                        <br></br>
                                    </div>
                                );
                            }
                        }}
                    </userContext.Consumer>
                </div>

                <div>
                    <userContext.Consumer>
                        {({user}) => {
                                if(user.role == "admin") {
                                    return(
                                        <DeactivateEvent event_id={this.props.event.id} />
                                    );
                                }
                            }
                        }
                    </userContext.Consumer>
                </div>

                <Router>
                    <div>
                    <userContext.Consumer>
                        {({session}) => {
                                if(!session) {
                                    return(
                                        <div>
                                            <br></br>
                                            <Link color="inherit" component={RouterLink} to="/participate">
                                                <Button color="primary" variant="outlined">Participate</Button>
                                            </Link>
                                            <Link color="inherit" component={RouterLink} to="/register_company">
                                                <Button color="primary" variant="outlined">Register company</Button> 
                                            </Link>
                                        </div>
                                    );
                                }
                            }
                        }
                    </userContext.Consumer>
                    
                    <Switch>
                        <Route path="/participate">
                            <ParticipantRegistration event={this.props.event.id} />
                        </Route>
                        <Route path="/register_company">
                            <CreateCompany event_id={this.props.event.id}/>
                        </Route>
                    </Switch>
                    </div>
                </Router>
             </div>
        );
    }
}

export default Event;