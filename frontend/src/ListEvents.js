import React from 'react';
import Event from './Event.js';
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
        const response = await fetch('/api/events');
        const result = await response.json();
        console.log(result);
        this.setState({events: result});
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