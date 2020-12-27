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
        const response = await fetch('http://127.0.0.1:5000/events');
        const result = await response.json();
        console.log(result);
        this.setState({events: result});
    }

    render() {
        return (
            <div>
                <br></br>
                <Button color="primary" variant="contained" onClick={() => {this.loadEvents()}}>Current events</Button>
                <br></br>
                {this.state.events.map((event) => {
                    return <Event name={event.name} count={event.count}></Event>
                })}
            </div>
        );
    }
}

export default ListEvents;