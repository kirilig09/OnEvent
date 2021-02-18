import React from 'react';
import {Chart} from 'react-charts';

export default function ParticipantsPerEventChart(props) {
    let dataArr = [];
    for(var i = 0; i < props.events.length; i++) {
        dataArr.push({ primary: props.events[i].name, secondary: props.events[i].participants});
    }
    
    // secondary: props.events[i].participants

    console.log(dataArr);

    const parseData = React.useMemo(
        () => [
            {
                label: "Participants",
                data: dataArr,
                dataType: "ordinal",
            },
        ],
        []
    )

    const series = React.useMemo(
        () => ({
            type: "bar"
        }),
        []
    )

    console.log(parseData);

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { type: 'linear', position: 'left', stacked: false, show: false },
        ],
        []
    )

    console.log(axes);

    return (
        <div
            style={{
                width: '400px',
                height: '300px',
            }}
        >
            <Chart data={parseData} series={series} axes={axes} />
        </div>
    );
}