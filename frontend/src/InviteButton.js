import React from "react";
import { send_invite } from './Fetch';
import { Link } from "react-router-dom";
import {
    TextField,
} from "@material-ui/core";

class InviteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleClick(event) {
        window.location = this.props.mailto;
        event.preventDefault();
        send_invite(this.state.name, this.props.participant.email);
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Invite to" value={this.state.name} onChange={this.handleNameChange} />
                    </form>
                    <Link to='#' onClick={this.handleClick}>
                        Send invite
                    </Link>
                </div>
    }
}

export default InviteButton;