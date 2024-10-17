"use client"

import { useEffect, useRef } from "react"

const SankeyDiagram = () => {
    const createSankeyDiagram = () => {
        var data = {
            type: "sankey",
            orientation: "h",
            node: {
              pad: 15,
              thickness: 30,
              line: {
                color: "black",
                width: 0.5
              },
             label: ["A1", "A2", "B1", "B2", "C1", "C2"],
             color: ["blue", "blue", "blue", "blue", "blue", "blue"]
                },
          
            link: {
              source: [0,1,0,2,3,3],
              target: [2,3,3,4,4,5],
              value:  [8,4,2,8,4,2]
            }
        }
          
        var layout = {
            title: "Basic Sankey",
            font: {
              size: 10
            }
        }
          
        Plotly.react('myDiv', data, layout)
    }

    useEffect(() => {
    }, [])

    return (
        <div className="">
            
        </div>
    )
}

export default SankeyDiagram;