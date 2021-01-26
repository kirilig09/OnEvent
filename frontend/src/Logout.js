import React from 'react';
import {logout} from './Fetch';
import { 
    makeStyles,
    Button,
    TextField
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     textBox: {
//         margin: "1.5em",
//         width: '25ch'
//     },
// }));

class Logout extends React.Component {
    //const classes = useStyles();

    // handleButton() {
    //     logout()
    // }

    render() {
        return  <div>
                    <div>
                        <Button color="primary" variant="contained" onClick={logout}>Logout</Button>
                    </div>
                </div>
    }
}

export default Logout;