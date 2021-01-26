import React from 'react';
import {list_users} from './Fetch';
import {
    Button
} from '@material-ui/core'

class ListUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                users:[]
        };
    }
    
    async loadUsers() {
        const result = await list_users(this.props.event_id);
        console.log(result);
        this.setState({users: result});
    }

    render() {
        return (
            <div>
                <Button size="small" color="primary" variant="contained" onClick={() => {this.loadUsers()}}>View participants</Button>
                <br></br>
                {this.state.users.map((user) => {
                    return <p>{user}</p>
                })}
                <br></br>
            </div>
        );
    }
}

export default ListUsers;