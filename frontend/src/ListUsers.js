import React from 'react';
import {list_users} from './Fetch';
import ViewParticipant from './ViewParticipant';
import {
    Button
} from '@material-ui/core';

class ListUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                participants: [],
        };
    }
    
    async loadUsers() {
        const result = await list_users(this.props.event_id);
        console.log(result);
        this.setState({participants: result});
    }

    render() {
        return (
            <div>
                <Button size="small" color="primary" variant="contained" onClick={() => {this.loadUsers()}}>View participants</Button>
                <br></br>
                {this.state.participants.map((participant) => {
                    return  <div>
                                <ViewParticipant participant={participant} />
                            </div>
                })}
                <br></br>
            </div>
        );
    }
}

export default ListUsers;