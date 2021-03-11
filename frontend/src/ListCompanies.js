import React from 'react';
import ViewCompany from './ViewCompany';
import {list_companies, join_event} from './Fetch';
import {
    Button
} from '@material-ui/core'
import userContext from './userContext';

class ListCompanies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                companies:[]
        };
    }
    
    async loadCompanies(user) {
        const result = await list_companies(this.props.event.id);
        console.log(result);
        this.setState({companies: result});

        join_event(user.id, this.props.event.id);
    }

    render() {
        return (
            <div>
                <userContext.Consumer>
                    {({user}) => {
                        return (
                            <Button size="small" color="primary" variant="contained" onClick={() => {this.loadCompanies(user)}}>Take a look</Button>
                        );
                    }}
                </userContext.Consumer>
                <br></br>
                {this.state.companies.map((company) => {
                    console.log(company);
                    return <ViewCompany company={company} />
                })}
                <br></br>
            </div>
        );
    }
}

export default ListCompanies;