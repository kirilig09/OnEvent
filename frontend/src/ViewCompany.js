import React from 'react';
import LoadChat from './LoadChat';
import EditCompanyRouter from './EditCompanyRouter';
import {
    Card,
    CardMedia,
    CardContent,
    Button,

} from '@material-ui/core'
import userContext from './userContext';

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
                    <div>
                        <LoadChat company_id={this.props.company.id}/>
                        <br></br>
                        <userContext.Consumer>
                            {({user}) => {
                                if(user.company == this.props.company.id) {
                                    return  <div>
                                                <h2>Edit company:</h2>
                                                <EditCompanyRouter company={this.props.company} />
                                            </div>
                                }
                            }
                            }
                        </userContext.Consumer>
                    </div>
                </div>
    }
}

export default ViewCompany;