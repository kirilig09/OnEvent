import React from 'react';
import {register_participant} from './Fetch';
import { 
    Button,
    TextField
} from '@material-ui/core';

class ParticipantRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                username: '',
                password: '',
                email: '',
                c_name: '',
                c_password: '',
                event: props.event
        };

        this.handleChangeU = this.handleChangeU.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCNameChange = this.handleCNameChange.bind(this);
        this.handleCPassChange = this.handleCPassChange.bind(this);
        this.saveCredentials = this.saveCredentials.bind(this);
    }

    handleChangeU(event) {
        this.setState({username: event.target.value});
    }
    
    handleChangeP(event) {
        this.setState({password: event.target.value});
    }
    
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleCNameChange(event) {
        this.setState({c_name: event.target.value});
    }

    handleCPassChange(event) {
        this.setState({c_password: event.target.value});
    }

    saveCredentials() {
        register_participant(this.state.username, this.state.password, this.state.email, this.state.c_name, this.state.c_password, this.state.event);
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Username" value={this.state.username} onChange={this.handleChangeU} />
                        <br></br>
                        <TextField id="standard-basic" label="Password" type="password" value={this.state.password} onChange={this.handleChangeP} />
                        <br></br>
                        <TextField id="standard-basic" label="Email" value={this.state.email} onChange={this.handleEmailChange} />
                        <br></br>
                        <TextField id="standard-basic" label="Company name" value={this.state.c_name} onChange={this.handleCNameChange} />
                        <br></br>
                        <TextField id="standard-basic" label="Company password" type="password" value={this.state.c_password} onChange={this.handleCPassChange} />
                    </form>
                    <br></br>
                    <div>
                        <Button color="primary" variant="contained" onClick={this.saveCredentials}>Register</Button>
                    </div>
                </div>
    }
}

export default ParticipantRegistration;