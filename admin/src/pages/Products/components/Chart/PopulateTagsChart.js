import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Spinner } from "../../../../components/UI/Spinner";
import { useSelector } from "react-redux";

const PopulateTagChart = () => {
  const { popTags, loadPopTags } = useSelector((state) => state.products);
  if (loadPopTags) {
    return <Spinner />;
  }
  return (
    <ResponsiveContainer width='100%' height='80%'>
      <ComposedChart
        layout='vertical'
        width={500}
        height={400}
        data={popTags}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke='#f5f5f5' />
        <XAxis type='number' />
        <YAxis dataKey='_id' type='category' scale='band' />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalCount' barSize={20} fill='#116466' />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default PopulateTagChart;
