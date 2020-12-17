import React from 'react'
import Paper from '@material-ui/core/Paper'
import _ from 'lodash'
import { scaleBand } from '@devexpress/dx-chart-core'
import { Title } from '@devexpress/dx-react-chart-material-ui'
import { ArgumentScale } from '@devexpress/dx-react-chart'
import { ISessionData } from '../interfaces'

import {
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Chart,
} from '@devexpress/dx-react-chart-material-ui'
import { Container } from '@material-ui/core'

interface dayData {
    hour: string
    clicksCount: number
}

interface IChartProps {
    data: ISessionData[]
}
const TestChart: React.FC<IChartProps> = ({ data }: IChartProps) => {
    const dataForChart: dayData[] = _(data)
        .groupBy((session) => {
            return new Date(session.startTime).getHours()
        })
        // .filter((value, key) => key != 'NaN')
        .map((value, key) => ({ hour: key + ':00', clicksCount: value.length }))
        .value()

    return (
        <>
            <Container>
                <Paper>
                    {console.log(JSON.stringify(dataForChart, null, 2))}
                    <Chart
                        data={dataForChart.filter((s) => s.hour !== 'NaN:00')}
                    >
                        <Title text="Average daily clicks by hours" />
                        <ArgumentScale factory={scaleBand} />

                        <ArgumentAxis />
                        <ValueAxis />

                        <BarSeries
                            valueField="clicksCount"
                            argumentField="hour"
                            name="clicksCount"
                        />
                    </Chart>
                </Paper>
            </Container>
        </>
    )
}
export default TestChart
