import React from 'react';
import Event from './Event.js';
import ParticipantsPerEventChart from './ParticipantsPerEventChart';
import {list_active_events} from './Fetch';
import {
    Button
} from '@material-ui/core'

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
                <br></br>
                <Button color="primary" variant="contained" onClick={() => {this.loadEvents()}}>Reload events</Button>
                <br></br>
                {this.state.events.map((event) => {
                    return <Event event={event}></Event>
                })}
                {this.state.events.length > 0 ?
                    <div>
                        <ParticipantsPerEventChart events={this.state.events} /> 
                    </div> :
                    null
                }
            </div>
        );
    }
}

export default ListEvents;