import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import { styles } from '@/assets/styles/home.styles';
import Svg, { Path, Rect, Text as SvgText } from "react-native-svg";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
import { PieChart } from 'react-native-gifted-charts';

const getPercentage = (firstNum: number, secondNum: number): number => {
  return Math.round((firstNum / secondNum) * 100);
}

// HARDCODED DATA FOR TESTING
const budget = 2940;
const housing = 1000
const utilites = 200
const food = 600
const other = 500
const savings = 500
const totalSpend = housing + utilites + food + other + savings
const leftover = budget - totalSpend;

const housingPercentage = getPercentage(housing, budget);
const utilitesPercentage = getPercentage(utilites, budget);
const foodPercentage = getPercentage(food, budget);
const otherPercentage = getPercentage(other, budget);
const savingsPercentage = getPercentage(savings, budget);

const Budget = () => {
  const [chartType, setChartType] = useState('pie');

  const SankeyChart = () => {
    const data = {
      nodes: [
          { name: "Wages" },              // 0
          { name: "Budget" },             // 1
          { name: "Taxes" },              // 2
          { name: "Housing" },            // 3
          { name: "Food" },               // 4
          { name: "Transportation" },     // 5
          { name: "Other Necessities" },  // 6
          { name: "Savings" },            // 7
      ],
      links: [
          { source: 0, target: 1, value: 4340.84 }, // Wages (0) → Budget (1)
          { source: 1, target: 2, value: 941.62 },  // Budget (1) → Taxes (2)
          { source: 1, target: 3, value: 0 },  // Budget (1) → Housing (3)
          { source: 1, target: 4, value: 600 },  // Budget (1) → Food (4)
          { source: 1, target: 5, value: 0 },  // Budget (1) → Transportation (5)
          { source: 1, target: 6, value: 500 },  // Budget (1) → Other Necessities (6)
          { source: 1, target: 7, value: 500 },  // Budget (1) → Savings (7)
      ],
    };

    const { nodes, links } = sankey().nodeWidth(20).nodePadding(18).extent([
        [1, 1],
        [340 - 1, 260 - 6],
    ])(data);

    const colorMap = {
      Wages: "#6a5acd",
      Budget: "#b0b0b0",
      Taxes: "#e63946",
      Housing: "#2a9d8f",
      Food: "#f1c40f",
      Transportation: "#1d3557",
      "Other Necessities": "#457b9d",
      Savings: "#2ecc71",
    };

    return (
      <Svg style={{marginTop: 15}} height={280} width={380}>
        {/* Links */}
        {links.map((link, i) => (
          <Path
            key={i}
            d={sankeyLinkHorizontal()(link)}
            stroke={colorMap[link.target.name] || "#999"}
            strokeWidth={Math.max(2, link.width)}
            fill="none"
            opacity={0.4}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const nodeColor = colorMap[node.name] || "#69b3a2";
          const nodeValue = Math.round(node.value * 100) / 100;
          const nodeHeight = Math.max(10, node.y1 - node.y0);

          return (
            <React.Fragment key={i}>
              <Rect
                x={node.x0}
                y={node.y0}
                width={node.x1 - node.x0}
                height={nodeHeight}
                fill={nodeColor}
                stroke="#333"
                strokeWidth={0.5}
                rx={3}
              />
              {/* Label */}
              <SvgText
                x={node.x0 < 50 ? node.x1 + 6 : node.x0 - 8}
                y={(node.y0 + node.y1) / 2 - 6}
                fontSize="10"
                textAnchor={node.x0 < 50 ? "start" : "end"}
                alignmentBaseline="middle"
                fill="black"
              >
                {node.name}
              </SvgText>
              {/* Value */}
              <SvgText
                x={node.x0 < 50 ? node.x1 + 6 : node.x0 - 8}
                y={(node.y0 + node.y1) / 2 + 8}
                fontSize="10"
                textAnchor={node.x0 < 50 ? "start" : "end"}
                alignmentBaseline="middle"
                fill="black"
              >
                {nodeValue}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    );
  };

  const BudgetPieChart = () => {
    const data = [
      { value: housing, label: 'Housing', color: '#2a9d8f', focused: true},
      { value: utilites, label: 'Utilites', color: '#f1c40f' },
      { value: food, label: 'Food', color: '#1d3557' },
      { value: other, label: 'Other', color: '#457b9d' },
      { value: savings, label: 'Savings', color: '#2ecc71' },
    ];

    return (
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
           Monthly Budget: ${budget}
        </Text>
        <PieChart
          data={data}
          donut
          showText
          showValuesAsLabels
          showValuesAsTooltipText	
          sectionAutoFocus
          centerLabelComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 22, color: 'black', fontWeight: 'bold'}}>
                  ${leftover}
                </Text>
                <Text style={{fontSize: 14, color: 'black'}}>leftover</Text>
              </View>
            );
          }}
        />

        {renderLegendComponent()}
      </View>
    );
  };

  const renderDot = color => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 90,
              marginRight: 20,
            }}>
            {renderDot('#2a9d8f')}
            <Text style={{color: 'black'}}>Housing: {housingPercentage}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 90}}>
            {renderDot('#f1c40f')}
            <Text style={{color: 'black'}}>Utilites: {utilitesPercentage}%</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 70,
              marginRight: 20,
            }}>
            {renderDot('#1d3557')}
            <Text style={{color: 'black'}}>Food: {foodPercentage}%</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 90}}>
            {renderDot('#457b9d')}
            <Text style={{color: 'black'}}>Other: {otherPercentage}%</Text>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', width: 90}}>
            {renderDot('#2ecc71')}
            <Text style={{color: 'black'}}>Savings: {savingsPercentage}%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />

        <View style={[styles.balanceCard, {}]}>
          <View style={styles.balanceRow}>
            <Text style={[styles.headerTitle]}>Budget</Text>

            <View style={styles.balanceRow}>
                <TouchableOpacity onPress={() => setChartType('pie')}>
                    <Text style={[styles.addButton]}>Pie</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setChartType('sankey')} style={{paddingLeft: 10}}>
                    <Text style={[styles.addButton]}>Sankey</Text>
                </TouchableOpacity>
            </View>
          </View>

          {chartType === 'pie' ? <BudgetPieChart /> : <SankeyChart />}
        </View>
      </View>
    </View>
  );
};

export default Budget;
