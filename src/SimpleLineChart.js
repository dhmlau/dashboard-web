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
      dates: []
    }

    const MONTHS_IN_TEXT = ['JAN', 'FEB', 'MAR','APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // FIXME supposedly it shouldn't be limited to the current year
    var currentYear = new Date().getFullYear();

    var i;
    var firstDayOfMonth;
    var lastDayOfMonth;
    var dateEntry = {};
    for (i=0; i<12; i++) {
      firstDayOfMonth = new Date(currentYear, i, 1).toISOString().slice(0, 10);
      lastDayOfMonth = new Date(currentYear, i+1, 0).toISOString().slice(0, 10);
      dateEntry = {
        label: MONTHS_IN_TEXT[i],
        firstDayOfMonth: firstDayOfMonth,
        lastDayOfMonth: lastDayOfMonth,
      }
      this.state.dates[i] = dateEntry;
     
    }
  }



  async componentDidMount() {
    let data = [];

    //will get data for the current month and before, but not after
    let index = new Date().getMonth(); 

    var i;
    var url;
    for (i=0 ; i<index; i++) {
      var firstDay = this.state.dates[i].firstDayOfMonth;
      var lastDay = this.state.dates[i].lastDayOfMonth;
      url = `http://localhost:3001/pr/strongloop%2Floopback-next/${firstDay}/${lastDay}`;
      data[i] = await (await fetch(url)).json();
      data[i].name = this.state.dates[i].label;
    }
    
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