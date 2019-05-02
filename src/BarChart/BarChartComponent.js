import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
const TABLE_LIST = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];
class BarChartComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({ list: [...TABLE_LIST] });
  }

  render() {
    const { list } = this.state;
    return (
      <div id="barchart">
        <BarChart
          width={600}
          height={300}
          data={list}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#66bb6a" />
          <Bar dataKey="uv" fill="#f9d631" />
        </BarChart>
      </div>
    );
  }
}

export default BarChartComponent;
