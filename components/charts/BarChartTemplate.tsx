import React from 'react'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

interface BarChartTemplateProps {
  data: Array<{ [key: string]: any }>;
  config: ChartConfig;
  dataKey1: string;
  dataKey2: string;
}

const BarChartTemplate: React.FC<BarChartTemplateProps> = ({data, config, dataKey1, dataKey2}) => {
  return (
    <div className="mt-4 lg:h-100 w-full rounded-lg">
      <ChartContainer config={config}>
        <BarChart accessibilityLayer data={data} layout='vertical' margin={{right: 16}}>
          <CartesianGrid horizontal={false}/>
            <YAxis dataKey={dataKey1} type='category' tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} hide/>
            <XAxis dataKey={dataKey2} type='number' hide/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line'/>}/>

            <Bar dataKey={dataKey2} layout='vertical' fill="var(--color-categories)" radius={4}> 
              <LabelList dataKey={dataKey1} position="insideLeft" offset={8} style={{fill: 'white'}} className='fill-[color-label]' fontSize={12}/>
              <LabelList dataKey={dataKey2} position="right" offset={8} style={{fill: 'white'}} className='fill-foreground' fontSize={12}/>
            </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default BarChartTemplate;
