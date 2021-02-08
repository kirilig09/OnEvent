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

    render() {
        return (
            <div>
                <div>
                    <p>Name: {this.props.event.name} | Participants: {this.props.event.participants} | Visitors: {this.props.event.visitors}</p>
                    <ListUsers event_id={this.props.event.id}/>
                    <ListCopmanies event_id={this.props.event.id}/>
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
                    <Link color="inherit" component={RouterLink} to="/participate">
                        <Button color="primary" variant="outlined">Participate</Button>
                    </Link>
                    
                    <userContext.Consumer>
                        {({user}) => {
                                if(user.role == "visitor") {
                                    return(
                                        <Link color="inherit" component={RouterLink} to="/register_company">
                                            <Button color="primary" variant="outlined">Register company</Button> 
                                        </Link>
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