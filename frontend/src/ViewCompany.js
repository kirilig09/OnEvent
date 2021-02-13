import React from 'react';
import LoadChat from './LoadChat';
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
        return  <div>
                    <br></br>
                    <Card>
                        <CardMedia 
                            src={this.props.company.image_link}
                            title="Company logo"
                            style={
                                {height: 
                                    '200px'
                                }
                            }
                            component="img"
                        />
                        <CardContent>
                            <h1>{this.props.company.name}</h1>
                        </CardContent>
                    </Card>
                    <br></br>
                    <LoadChat company_id={this.props.company.id}/>
                </div>
    }
}

export default ViewCompany;