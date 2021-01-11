import React from 'react';
import Registration from './Registration.js';
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

class Event extends React.Component {
    render() {
        return (
            <div>
                <p>Name: {this.props.name} | Visitors: {this.props.count}</p>
                <Router>
                    <div>
                    {/* <Link color="inherit" component={RouterLink} to="/list">
                        <Button color="primary" variant="outlined">Take a look</Button>
                    </Link> */}
                    <Link color="inherit" component={RouterLink} to="/participate">
                        <Button color="primary" variant="outlined">Participate</Button>
                    </Link>
                    
                    <Switch>
                        {/* <Route path="/list">
                            <ListEvents />
                        </Route> */}
                        <Route path="/participate">
                            <Registration user_role="participant" event={this.props.name.toString()} />
                        </Route>
                    </Switch>
                    </div>
                </Router>
             </div>
        );
    }
}

export default Event;