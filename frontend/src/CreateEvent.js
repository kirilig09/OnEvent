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
                payment: 0,
                is_private: false
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSubSwitch = this.handleSubSwitch.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlePrivateSwitch = this.handlePrivateSwitch.bind(this);
        this.saveName = this.saveName.bind(this);
    }
    
    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleSubSwitch(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }

    handleAmountChange(event) {
        this.setState({ payment: event.target.value });
    }

    handlePrivateSwitch(event) {
        this.setState({ [event.target.name]: event.target.checked });
    }

    saveName() {
        create_event(this.state.name, this.state.subscriptable, this.state.payment, this.state.is_private);
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
                            checked={this.state.is_private} 
                            onChange={this.handlePrivateSwitch}
                            name="is_private"
                        />
                    }
                    label="Private"
                />
                <FormControlLabel
                    control={
                        <Switch 
                            checked={this.state.subscriptable} 
                            onChange={this.handleSubSwitch}
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