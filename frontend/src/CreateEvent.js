import React from 'react';
import {create_event} from './Fetch';
import {
    Button,
    TextField,
    Switch,
    FormControlLabel
} from '@material-ui/core'

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                name: '',
                subscriptable: true,
                payment: 0
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.saveName = this.saveName.bind(this);
    }
    
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSwitchChange(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handleAmountChange(event) {
        this.setState({ payment: event.target.value });
    }

    saveName() {
        create_event(this.state.name, this.state.subscriptable, this.state.payment);
    }

    render() {
        return (
            <div>
                <br></br>
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Event name" value={this.state.name} onChange={this.handleChangeName} />
                </form>
                <FormControlLabel
                    control={
                        <Switch 
                            checked={this.state.subscriptable} 
                            onChange={this.handleSwitchChange}
                            name="subscriptable"
                        />
                    }
                    label="Subscriptable"
                />
                <br></br>
                {this.state.subscriptable ?
                    <TextField id="standard-basic" label="Payment amount" value={this.state.payment} onChange={this.handleAmountChange} /> :
                    null
                }   
                <div>
                    <Button color="primary" variant="contained" onClick={this.saveName}>Create</Button>
                </div>
            </div>
        );
    }
}

export default CreateEvent;