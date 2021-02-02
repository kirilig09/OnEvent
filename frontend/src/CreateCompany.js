import React from 'react';
import {register_company} from './Fetch';
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

class CreateCompany extends React.Component {
    //const classes = useStyles();

    constructor(props) {
        super(props);
        this.state = {
                name: '',
                password: '',
                image_link: '',
                event: props.event_id
        };

        this.handleChangeN = this.handleChangeN.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
        this.handleChangeI = this.handleChangeI.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
    }

    handleChangeN(event) {
        this.setState({name: event.target.value});
    }
    
    handleChangeP(event) {
        this.setState({password: event.target.value});
    }

    handleChangeI(event) {
        this.setState({image_link: event.target.value});
    }

    saveInfo() {
        register_company(this.state.name, this.state.password, this.state.image_link, this.state.event);
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Company name" value={this.state.name} onChange={this.handleChangeN} />
                        <br></br>
                        <TextField id="standard-basic" label="Password" type="password" value={this.state.password} onChange={this.handleChangeP} />
                        <br></br>
                        <TextField id="standard-basic" label="Image link" value={this.state.image_link} onChange={this.handleChangeI} />
                    </form>
                    <br></br>
                    <div>
                        <Button color="primary" variant="contained" onClick={this.saveInfo}>Register</Button>
                    </div>
                </div>
    }
}

export default CreateCompany;