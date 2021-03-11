import React from "react";
import { Link } from "react-router-dom";

class InviteButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        window.location = this.props.mailto;
        event.preventDefault();
    }

    render() {
        return  <Link to='#' onClick={this.handleClick}>
                    Invite
                </Link>
    }
}

export default InviteButton;