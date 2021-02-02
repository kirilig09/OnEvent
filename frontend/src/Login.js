import React from 'react';
import userContext from './userContext';
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
    }

    handleChangeU(event) {
        this.setState({username: event.target.value});
    }
    
    handleChangeP(event) {
        this.setState({password: event.target.value});
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
                        <userContext.Consumer>
                            {({login_user}) => {
                                    <Button color="primary" variant="contained" onClick={() => { login_user(this.state.username, this.state.password)}}>Log in</Button>
                                }
                            }
                        </userContext.Consumer>
                    </div>
                </div>
    }
}

export default Login;