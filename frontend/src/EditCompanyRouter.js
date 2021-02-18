import React from 'react';
import UpdateImage from './UpdateImage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
  } from 'react-router-dom';
  import {
    Button,
    AppBar,
    Toolbar,
    Link,
    makeStyles
} from '@material-ui/core';

class EditCompanyRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
                    <div>
                        <Link color="inherit" component={RouterLink} to="/update-image">
                            <Button color="primary" variant="outlined">Change Logo</Button>
                        </Link>
                        
                        <Switch>
                            <Route path="/update-image">
                                <UpdateImage company_id={this.props.company.id} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
    }
}

export default EditCompanyRouter;