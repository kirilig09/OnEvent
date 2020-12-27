import React from 'react';
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

class Registration extends React.Component {
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
        const jsonResult = JSON.stringify(this.state);
        console.log(jsonResult);

        fetch('http://127.0.0.1:5000/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: jsonResult
        })
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Username" value={this.state.username} onChange={this.handleChangeU} />
                        <br></br>
                        <TextField id="standard-basic" label="Password" value={this.state.password} onChange={this.handleChangeP}/>
                    </form>
                    <br></br>
                    <div>
                        <Button color="primary" variant="contained" onClick={this.saveCredentials}>Register</Button>
                    </div>
                </div>
    }
}

export default Registration;