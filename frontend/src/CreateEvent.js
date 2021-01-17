import React from 'react';
import {create_event} from './Fetch';
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
        create_event(this.state.name);
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