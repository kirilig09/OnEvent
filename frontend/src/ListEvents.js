import React from 'react';
import Event from './Event.js';
import {list_active_events} from './Fetch';
import {
    Button
} from '@material-ui/core'

class ListEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                events:[]
        };
    }
    
    async loadEvents() {
        const events_list = await list_active_events();
        console.log(events_list);
        this.setState({events: events_list});
    }

    render() {
        return (
            <div>
                <br></br>
                <Button color="primary" variant="contained" onClick={() => {this.loadEvents()}}>Reload events</Button>
                <br></br>
                {this.state.events.map((event) => {
                    return <Event event={event}></Event>
                })}
            </div>
        );
    }
}

export default ListEvents;