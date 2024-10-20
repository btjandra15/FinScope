import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'
import { CartesianGrid, Line, XAxis, LineChart } from 'recharts'
import { Card } from '../ui/card'

interface LineChartTemplateProps {
  data: Array<{ [key: string]: any }>;
  config: ChartConfig;
  dataKey1: string;
  dataKey2: string;
}

const LineChartTemplate: React.FC<LineChartTemplateProps> = ({data, config, dataKey1, dataKey2}) => {
  return (
    <div className='mt-4 h-64 w-full rounded-lg'>
       <ChartContainer config={config} className='h-full w-full'>
            <LineChart accessibilityLayer data={data} margin={{left: 12, right: 12}}>
                <CartesianGrid vertical={false}/>
                <XAxis dataKey={dataKey1} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)}/>
                <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                <Line dataKey={dataKey2} type="natural" stroke={`var(--color-${dataKey2})`} strokeWidth={2} dot={false}/>
            </LineChart>
        </ChartContainer>
    </div>
  )
}

export default LineChartTemplate;
