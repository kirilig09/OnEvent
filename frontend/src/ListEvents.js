import React from 'react';
import Event from './Event.js';
import UsersPerEventChart from './ParticipantsPerEventChart';
import {list_active_events} from './Fetch';
import {
    Button
} from '@material-ui/core';
import userContext from './userContext.js';

class ListEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                events: []
        };
    }
    
    async loadEvents() {
        const events_list = await list_active_events();
        console.log(events_list);
        this.setState({events: events_list});
    }

    async componentDidMount() {
        await this.loadEvents();
    }

    render() {
        return (
            <div>
                <Button color="primary" variant="contained" onClick={() => {this.loadEvents()}}>Reload events</Button>
                <userContext.Consumer>
                    {({user}) => {
                        if(user.role == "admin") {
                            if(this.state.events.length > 0) {
                                return(
                                    <div>
                                        <UsersPerEventChart events={this.state.events} /> 
                                    </div>
                                );
                            }
                        }
                    }}
                </userContext.Consumer>
                <br></br>
                {this.state.events.map((event) => {
                    return <Event event={event}></Event>
                })}
            </div>
        );
    }
}

export default ListEvents;