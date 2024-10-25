import React from 'react'
import { ChartConfig, ChartContainer, ChartLegendContent, ChartTooltip } from '../ui/chart';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

interface RadarChartTemplateProps {
    data: Array<{ [key: string]: any }>;
    config: ChartConfig;
    dataKey1: string;
    dataKey2: string;
  }

const RadarChartTemplate: React.FC<RadarChartTemplateProps> = ({data, config, dataKey1, dataKey2}) => {
  return (
    <div>
       <ChartContainer config={config} className='max-h-[400px]'>
            <RadarChart data={data}>
                <ChartTooltip cursor={false} content={<ChartLegendContent/>}/>
                <PolarAngleAxis dataKey={dataKey1}/>
                <PolarGrid/>
                <Radar dataKey={dataKey2} fill={`var(--color-${dataKey2})`} fillOpacity={0.6} dot={{r: 4, fillOpacity: 1,}}/>
            </RadarChart>
        </ChartContainer>
    </div>
  )
}

export default RadarChartTemplate;
