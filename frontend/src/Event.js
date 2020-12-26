import React from 'react';


class Event extends React.Component {
    render() {
        return (
            <div>
                <p>Name: {this.props.name} | Visitors: {this.props.count}</p>
            </div>
        );
    }
}

export default Event;