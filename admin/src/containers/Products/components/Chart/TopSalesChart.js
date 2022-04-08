import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const TopSalesChart = (props) => {
  const { topSales, loadTopSales } = useSelector((state) => state.products);

  if (loadTopSales) {
    return <h3>Loading</h3>;
  }
  const modData = topSales.map((dat) => {
    return {
      name: dat._id[0],
      quantity: dat.totalQuantity,
      totalSale: dat.totalSale / 10000,
    };
  });

  let returnChart;
  if (props.quantity) {
    returnChart = (
      <ResponsiveContainer width='100%' height='80%'>
        <ComposedChart
          width={500}
          height={400}
          data={modData}
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='quantity' barSize={15} fill='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    );
  } else if (props.totalSale) {
    returnChart = (
      <ResponsiveContainer width='100%' height='80%'>
        <ComposedChart
          width={500}
          height={400}
          data={modData}
          margin={{
            top: 0,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis dataKey='name' scale='band' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSale' barSize={15} fill='#413ea0' />
          <Line type='monotone' dataKey='quantity' stroke='#ff7300' />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return returnChart;
};

export default TopSalesChart;
