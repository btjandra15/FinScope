import React from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

const BarChartTemplate = ({data, config, dataKey1, dataKey2}) => {
  return (
    <div className="mt-4 h-64 w-full rounded-lg">
      <ChartContainer config={config} className='mx-auto aspect-square max-h-[250px]'>
        <BarChart accessibilityLayer data={data} layout='vertical' margin={{right: 16}}>
          <CartesianGrid horizontal={false}/>
          <YAxis dataKey={dataKey1} type='category' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} hide/>
          <XAxis dataKey={dataKey2} type='number' hide/>
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line'/>}/>

          <Bar dataKey={dataKey2} layout='vertical' fill={`var(--color-${dataKey2}`} radius={4}>
            <LabelList data={dataKey1} position="insideLeft" offset={8} className='fill-[--color-label]' fontSize={12}/>
            <LabelList dataKey={dataKey2} position="right" offset={8} className='fill-foreground' fontSize={12}/>
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default BarChartTemplate;
