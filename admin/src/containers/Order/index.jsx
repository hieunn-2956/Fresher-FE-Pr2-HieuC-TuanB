import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getOrdresRequest, setSelectedOrderRequest } from "../../actions";
import DataTable from "./components/DataTable";

export default function Order() {
  const dispatch = useDispatch();
  const { orders, selectedOrder, loading, query } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getOrdresRequest());
  }, []);

  const handleOrderDetails = (order) => {
    dispatch(setSelectedOrderRequest(order._id));
    window.open(`/orders/${order._id}`);
  };

  if (loading) {
    return (
      <Layout sidebar>
        <h3>loading</h3>
      </Layout>
    );
  }
  return (
    <Layout sidebar>
      <DataTable data={orders} getDetails={handleOrderDetails} />
    </Layout>
  );
}
