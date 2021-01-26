import React from 'react';
import {isLogged} from './Fetch';
import Login from './Login';
import Logout from './Logout';

// const useStyles = makeStyles((theme) => ({
//     textBox: {
//         margin: "1.5em",
//         width: '25ch'
//     },
// }));

class LogSwitch extends React.Component {
    //const classes = useStyles();

    render() {
        let button;
        if(isLogged()) {
            button = <Logout />
        } else {
            button = <Login />
        }

        return  <div>
                    {button}
                </div>
    }
}

export default LogSwitch;