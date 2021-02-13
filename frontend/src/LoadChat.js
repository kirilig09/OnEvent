import React from 'react';
import {load_messages} from './Fetch';
import ViewMessage from './ViewMessage';
import SendMessage from './SendMessage';
import {
    Button
} from '@material-ui/core';

class LoadChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: []
        };
    }

    async load_chat() {
        const chat = await load_messages(this.props.company_id);
        this.setState({chat: chat});
    }

    async componentDidMount() {
        await this.load_chat();
    }

    render() {
        return  <div>
                    <Button size="small" color="primary" variant="contained" onClick={() => {this.load_chat()}}>Open chat</Button>
                    <br></br>
                    {this.state.chat.map((message) => {
                        return <ViewMessage message={message}/>
                    })}
                    <br></br>
                    <SendMessage company_id={this.props.company_id}/>
                </div>
    }
}

export default LoadChat;