import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({chartData}) => {
    const myData ={
    date: "13/05/2025",
    camp: 4000,
    fees: 2400,
    participant: 2400
    }
    return (
       <ComposedChart width={730} height={250} data={chartData}>
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="participant" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="fees" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="camp" stroke="#ff7300" />
</ComposedChart>
    );
};

export default Chart;