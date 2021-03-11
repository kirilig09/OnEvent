import React from 'react';
import {register} from './Fetch';
import { 
    makeStyles,
    Button,
    TextField
} from '@material-ui/core';

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                username: '',
                password: '',
                email: ''
        };

        this.handleChangeU = this.handleChangeU.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
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

    saveCredentials() {
        register(this.state.username, this.state.password, this.state.email);
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Username" value={this.state.username} onChange={this.handleChangeU} />
                        <br></br>
                        <TextField id="standard-basic" label="Password" type="password" value={this.state.password} onChange={this.handleChangeP}/>
                        <br></br>
                        <TextField id="standard-basic" label="Email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </form>
                    <br></br>
                    <div>
                        <Button color="primary" variant="contained" onClick={this.saveCredentials}>Register</Button>
                    </div>
                </div>
    }
}

export default Registration;