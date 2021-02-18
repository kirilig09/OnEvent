import React from 'react';
import {update_image} from './Fetch';
import {
    TextField,
    Button
} from '@material-ui/core';

class UpdateImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image_link: ""
        };

        this.handleChangeI = this.handleChangeI.bind(this);
    }

    handleChangeI(event) {
        this.setState({image_link: event.target.value});
    }

    render() {
        return  <div>
                    <form noValidate autoComplete="off">
                        <TextField id="standard-basic" label="New image" value={this.state.image_link} onChange={this.handleChangeI} />
                    </form>
                    <br></br>
                    <Button color="primary" variant="contained" onClick={() => {update_image(this.props.company_id, this.state.image_link)}}>Update</Button>
                </div>
    }
}

export default UpdateImage;