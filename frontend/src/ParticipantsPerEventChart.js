import React from 'react';
import {BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend,
} from 'recharts';

class UsersPerEventChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <BarChart
                    width={500}
                    height={300}
                    data={this.props.events}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="participants" fill="#8884d8" />
                    <Bar dataKey="visitors" fill="#82ca9d" />
                </BarChart>
    }
}

export default UsersPerEventChart;