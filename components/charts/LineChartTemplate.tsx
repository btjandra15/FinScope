import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { CartesianGrid, Line, XAxis, LineChart } from 'recharts'
import { Card } from '../ui/card'

const LineChartTemplate = ({data, config}) => {
  return (
    <div className='mt-4 h-64 w-full rounded-lg'>
       <ChartContainer config={config} className='h-full w-full'>
            <LineChart accessibilityLayer data={data} margin={{left: 12, right: 12}}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)}/>
                <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                <Line dataKey="net_worth" type="natural" stroke="var(--color-net_worth)" strokeWidth={2} dot={false}/>
            </LineChart>
        </ChartContainer>
    </div>
  )
}

export default LineChartTemplate;
