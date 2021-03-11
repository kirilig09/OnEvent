import React from 'react';
import LoadChat from './LoadChat';
import EditCompanyRouter from './EditCompanyRouter';
import CompanyEntranceCompany from './CompanyEntrancePayment';
import { payment_status } from './Fetch';
import {
    Card,
    CardMedia,
    CardContent,
    Button,
} from '@material-ui/core'
import userContext from './userContext';

class ViewCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribtion_flag: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        const subscribtion_flag = await payment_status(this.props.company.id);
        console.log(subscribtion_flag);
        this.setState({ subscribtion_flag: subscribtion_flag.payment });
    }

    render() {
        return  <div>
                    <br></br>
                    <Card>
                        <CardMedia 
                            src={this.props.company.image_link}
                            title="Company logo"
                            style={
                                {
                                    height: '200px',
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
                                                {this.state.subscribtion_flag ?
                                                    <h3> Subscribed! </h3> :
                                                    <CompanyEntranceCompany company={this.props.company} />
                                                }
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