import React from 'react';
import {list_companies} from './Fetch';
import {
    Button
} from '@material-ui/core'

class ListCompanies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
                companies:[]
        };
    }
    
    async loadCompanies() {
        const result = await list_companies(this.props.event_id);
        console.log(result);
        this.setState({companies: result});
    }

    render() {
        return (
            <div>
                <Button size="small" color="primary" variant="contained" onClick={() => {this.loadCompanies()}}>Take a look</Button>
                <br></br>
                {this.state.companies.map((company) => {
                    return <p>{company.name}</p>
                })}
                <br></br>
            </div>
        );
    }
}

export default ListCompanies;