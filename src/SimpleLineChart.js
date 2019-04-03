import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

class SimpleLineChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  async componentDidMount() {
  // componentDidMount() {
    let resultJSON = await (await fetch('http://localhost:3001/pr/strongloop%2Floopback-next/2019-02-01/2019-02-28')).json();
    let result2JSON = await (await fetch('http://localhost:3001/pr/strongloop%2Floopback-next/2019-03-01/2019-03-31')).json();

    console.log('resultJSON', resultJSON);
    let data = [
      { name: 'Feb', total_count: resultJSON.total_count, count_maintainers: resultJSON.count_maintainers, count_community: result2JSON.count_community },
      { name: 'Mar', total_count: result2JSON.total_count, count_maintainers: result2JSON.count_maintainers, count_community: resultJSON.count_community },
    ];
    this.setState({data: data});
  }
  render() {
    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.state.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_count" stroke="#82ca9d" />
          <Line type="monotone" dataKey="count_maintainers" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="count_community" stroke="#d88884" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
export default SimpleLineChart;