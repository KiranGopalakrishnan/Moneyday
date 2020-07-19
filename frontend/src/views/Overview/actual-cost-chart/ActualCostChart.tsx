import * as React from 'react';
import styled from 'styled-components';
import {
    Line,
    ComposedChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { useCurrentBoard } from '../../../reducers/CurrentBoardReducer';
import { format ,differenceInDays, addDays} from 'date-fns';

const ActualCostChart: React.FC = () => {

    const [{costPerDay,currentBoard}] = useCurrentBoard();

    const data = costPerDay.filter(item=> item.cost!==0).map(costForOneDay=>{
        return {
            cost: costForOneDay.cost,
            time: new Date(costForOneDay.date).getTime(),
            budget: currentBoard?.budget
        }
    });
    data.sort((a,b)=> a.time - b.time);
    const startDate = new Date(data[0].time);
    const endDate = new Date(data[data.length-1].time);

    const numberOfDaysBetweenStartAndEnd = differenceInDays(startDate,endDate);

    const xAxisRange = [startDate.getTime(),addDays(endDate,30).getTime()];

    console.error({xAxisRange});

    return (
        <ResponsiveContainer width="100%">
            <ComposedChart
                width={1000}
                height={500}
                data={data}
                margin={{top: 25, right: 30, left: 20, bottom: 5}}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#3B3B98" stopOpacity={0.2} />
                        <stop offset="90%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="time"
                    tickFormatter={(tick) => format(new Date(tick), 'dd-MMM-yy')}
                    domain={xAxisRange}
                />
                <YAxis domain={[0, 20000]} />
                <Tooltip />
                <CartesianGrid vertical={false} stroke="#DDD" />

                <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="budget"
                    stroke="#f6ae2d"
                    dot={false}
                    legendType="none"
                    cornerRadius={0}
                />

                <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="cost"
                    stroke="#b8bedd"
                    dot={false}
                    legendType="none"
                    cornerRadius={0}
                />
                <Area
                    type="monotone"
                    dataKey="cost"
                    stroke={false}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );


}

export {ActualCostChart};