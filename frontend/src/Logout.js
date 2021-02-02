import React from 'react';
import userContext from './userContext';
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

function Logout() {
    //const classes = useStyles();

    // handleButton() {
    //     logout()
    // }

    return  <div>
                <div>
                    <userContext.Consumer>
                        {({logout_user}) => {
                            <Button color="primary" variant="contained" onClick={() => {logout_user()}}>Logout</Button>
                        }
                        }
                    </userContext.Consumer>
                </div>
            </div>
}

export default Logout;