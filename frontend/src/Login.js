import React from 'react';
import {login} from './Fetch';
import { 
    makeStyles,
    Button,
    TextField
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     textBox: {
//         margin: "1.5em",
//         width: '25ch'
//     },
// }));

class Login extends React.Component {
    //const classes = useStyles();

    constructor(props) {
        super(props);
        this.state = {
                username: '',
                password: ''
        };

        this.handleChangeU = this.handleChangeU.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.saveCredentials = this.saveCredentials.bind(this);
    }

    handleChangeU(event) {
        this.setState({username: event.target.value});
    }
    
    handleChangeP(event) {
        this.setState({password: event.target.value});
    }
    
    saveCredentials() {
        login(this.state.username, this.state.password);
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Username" value={this.state.username} onChange={this.handleChangeU} />
                        <br></br>
                        <TextField id="standard-basic" label="Password" type="password" value={this.state.password} onChange={this.handleChangeP}/>
                    </form>
                    <br></br>
                    <div>
                        <Button color="primary" variant="contained" onClick={this.saveCredentials}>Log in</Button>
                    </div>
                </div>
    }
}

export default Login;