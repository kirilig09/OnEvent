import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Button,

} from '@material-ui/core'

class ViewCompany extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return  <Card>
                    <CardMedia 
                        image={this.props.company.image_link}
                        title="Company logo"
                    />
                    <CardContent>
                        <h1>{this.props.company.name}</h1>
                    </CardContent>
                </Card>
    }
}

export default ViewCompany;