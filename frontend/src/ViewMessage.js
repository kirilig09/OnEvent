import React from 'react';
import userContext from './userContext';
import {get_user} from './Fetch';
import {
    Box
} from '@material-ui/core';

class ViewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        const user = await get_user(this.props.message.sender_id);
        this.setState({user: user});
        console.log(this.state.user);
    }

    render() {
        return  <userContext.Consumer>
                    {({user}) => {
                        if(this.props.message.sender_id == user.id) {
                            return (
                                <Box bgcolor="info.main" color="info.contrastText">
                                    <h4> User: {this.state.user.name} </h4>
                                    <p> {this.props.message.content} </p>
                                </Box>
                            );
                        }
                        // else if(this.props.message.sender_id == "participant") {
                        //     return (
                        //         <Box bgcolor="text.disabled" color="background.paper">
                        //             <h4> User: {this.props.message.sender_id} </h4>
                        //             <p> {this.props.message.content} </p>
                        //         </Box>
                        //     );
                        // }
                        else {
                            return (
                                <Box bgcolor="text.disabled" color="background.paper">
                                    <h4> User: {this.props.message.sender_id} </h4>
                                    <p> {this.props.message.content} </p>
                                </Box>
                            );
                        }
                    }}
                </userContext.Consumer>
    }
}

export default ViewMessage;