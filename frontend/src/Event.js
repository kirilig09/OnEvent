import React from 'react';
import ListUsers from './ListUsers';
import ListCopmanies from './ListCompanies';
import ParticipantRegistration from './ParticRegistration';
import {get_my_role, whoami} from './Fetch';
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
    async get_role() {

    }

    render() {
        const user_role = "visitor";

        return (
            <div>
                <div>
                    <p>Name: {this.props.event.name} | Participants: {this.props.event.participants} | Visitors: {this.props.event.visitors}</p>
                    <ListUsers event_id={this.props.event.id}/>
                    <ListCopmanies event_id={this.props.event_id}/>
                </div>
                <Router>
                    <div>
                    {/* <Link color="inherit" component={RouterLink} to="/list">
                        <Button color="primary" variant="outlined">Take a look</Button>
                    </Link> */}
                    <Link color="inherit" component={RouterLink} to="/participate">
                        <Button color="primary" variant="outlined">Participate</Button>
                    </Link>
                    {user_role == "visitor" ? 
                        <Link color="inherit" component={RouterLink} to="/register_company">
                            <Button color="primary" variant="outlined">Register company</Button> 
                        </Link> : 
                        null
                    }
                    
                    <Switch>
                        {/* <Route path="/list">
                            <ListEvents />
                        </Route> */}
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