import React from 'react';
import ListEvents from './ListEvents.js';
import CreateEvent from './CreateEvent.js';
import userContext from './userContext';
import EventsArchive from './EventsArchive';
import {
    Button,
    Link
} from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
  } from 'react-router-dom';

class EventRouter extends React.Component {
        
    render() {
        return <Router>
                    <div>
                    <Link color="inherit" component={RouterLink} to="/list">
                        <Button color="primary" variant="contained">List events</Button>
                    </Link>
                    <userContext.Consumer>
                        {({user}) => {
                            if(user.role == "admin") {
                                return (
                                    <div>
                                        <Link color="inherit" component={RouterLink} to="/archive">
                                            <Button color="primary" variant="contained">Events archive</Button>
                                        </Link>
                                        <Link color="inherit" component={RouterLink} to="/create">
                                            <Button color="primary" variant="contained">Create event</Button>
                                        </Link>
                                    </div>
                                    );
                                }
                            }
                        }
                    </userContext.Consumer>
                        
                    <br></br>
                    
                    <Switch>
                        <Route path="/list">
                            <ListEvents />
                        </Route>
                        <Route path="/create">
                            <CreateEvent />
                        </Route>
                        <Route path="/archive">
                            <EventsArchive />
                        </Route>
                    </Switch>
                    </div>
                </Router>
    }

}

export default EventRouter;