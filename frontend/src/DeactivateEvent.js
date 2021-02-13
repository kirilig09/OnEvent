import React from 'react';
import {deactivate_event} from './Fetch';
import {
    Button
} from '@material-ui/core';

class DeactivateEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <div>
                    <Button color="primary" variant="contained" onClick={() => {deactivate_event(this.props.event_id)}}>Deactivate</Button>
                    <br></br>
                </div>
    }
}

export default DeactivateEvent;