import React from 'react';
import {send_message} from './Fetch';
import {
    TextField,
    Button
} from '@material-ui/core';
import userContext from './userContext';

class SendMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg_content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        // this.handleSend = this.handleSend.bind(this);
    }

    handleChange(event) {
        this.setState({msg_content: event.target.value})
    }

    render() {
        return  <div>
                    <TextField id="standard-basic" label="Message" value={this.state.msg_content} onChange={this.handleChange} />
                     <userContext.Consumer>
                        {({user}) => {
                            return (
                                <Button color="primary" variant="contained" onClick={() => {send_message(this.state.msg_content, user.id, this.props.company_id)}}>Send</Button>
                            );
                        }}
                    </userContext.Consumer>
                </div>
    }
}

export default SendMessage;