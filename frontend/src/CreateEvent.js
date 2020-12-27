import React from 'react';
import Event from './Event.js';
import {
    Button,
    TextField
} from '@material-ui/core'

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                name: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.saveName = this.saveName.bind(this);
    }
    
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    saveName() {
        const jsonResult = JSON.stringify(this.state);
        console.log(jsonResult);

        fetch('http://127.0.0.1:5000/create-event', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: jsonResult
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Event name" value={this.state.name} onChange={this.handleChangeName} />
                </form>
                <br></br>
                <div>
                    <Button color="primary" variant="contained" onClick={this.saveName}>Create</Button>
                </div>
            </div>
        );
    }
}

export default CreateEvent;