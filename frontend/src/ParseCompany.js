import React from 'react';
import {
    useParams
} from 'react-router-dom';
import {get_participant_company} from './Fetch';
import ViewCompany from './ViewCompany';

class ParseCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            flag: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.user_id);
        const company = await get_participant_company(this.props.user_id);
        this.setState({company: company});
        this.setState({flag: true});
    }
    
    render() {
        return  <div>
                    {this.state.flag ?
                        <ViewCompany company={this.state.company}/> :
                        null
                    }
                </div>
    }
}

export default ParseCompany;