import React from 'react';
import InviteButton from './InviteButton';
import {
    Button
} from '@material-ui/core';
import userContext from './userContext';

class ViewParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite_flag: false,
        };
    }

    render() {
        return  <div>
                    <p>{this.props.participant.name}</p>
                    <userContext.Consumer>
                        {({user}) => {
                            if(user.role == "admin") {
                                return (
                                    <InviteButton mailto={"mailto:"+this.props.participant.email} />
                                );
                            }
                        }}
                    </userContext.Consumer>
                </div>
    }
}

export default ViewParticipant;