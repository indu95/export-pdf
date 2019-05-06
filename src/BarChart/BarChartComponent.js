import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
const TABLE_LIST = [
  { name: "Share Amongst Best Seller", Scarlett: 35, "Dr Susan Cream": 15 }
];
class BarChartComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({ list: [...TABLE_LIST] });
  }
  formatXAxis(tickItem) {
    return `${tickItem}%`;
  }
  render() {
    const { list } = this.state;
    return (
      <ResponsiveContainer height={"auto"}>
        <div id="barchart">
          <BarChart
            title="Share Amongst Best Seller"
            barSize={50}
            width={700}
            height={300}
            data={list}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis
              type="number"
              axisLine={false}
              tick={{
                fontSize: 15,
                fontWeight: 300,
                color: "black",
                stroke: "black"
              }}
              tickFormatter={this.formatXAxis}
            />
            <YAxis dataKey="name" type="category" tick={false} />
            <Tooltip />
            <Legend
              verticalAlign="middle"
              layout="vertical"
              align="right"
              wrapperStyle={{ padding: "10px", fontWeight: 600 }}
            />

            <Bar dataKey="Scarlett" fill="#234c10" />
            <Bar dataKey="Dr Susan Cream" fill="#666666" />
          </BarChart>
        </div>
      </ResponsiveContainer>
    );
  }
}

export default BarChartComponent;
