import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderDetailTable from "./orderDetailTable";
import { useDispatch, useSelector } from "react-redux";
import { Steps, Select } from "antd";
import "./style.scss";
import "antd/dist/antd.css";
import {
  updateOrdresRequest,
  setSelectedOrderRequest,
} from "../../../../actions";
import Layout from "../../../../components/Layout";
import FormatDate from "../../../../components/UI/FormatDate";

const { Option } = Select;
const { Step } = Steps;

export default function OrderDetails() {
  let { orderId } = useParams();
  const { selectedOrder, loading } = useSelector((state) => state.orders);
  const [currentStep, setCurrentStep] = useState(1);

  const dispatch = useDispatch();
  const step = (status) => {
    if (status == "ordered") return 0;
    if (status == "in_progress") return 1;
    if (status == "completed") return 2;
  };

  useEffect(() => {
    dispatch(setSelectedOrderRequest(orderId));
  }, []);

  useEffect(() => {
    setCurrentStep(step(selectedOrder.status));
  }, [selectedOrder.status]);

  const handleChange = (value) => {
    dispatch(updateOrdresRequest({ orderId: selectedOrder._id, type: value }));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return (
        <div style={{ marginTop: "15px" }}>
          <div>{`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}</div>
          <div>{`${d.getHours()}:${d.getMinutes()}`}</div>
        </div>
      );
    }
    return "";
  };

  if (loading) {
    return (
      <Layout sidebar>
        <h3>Wait</h3>
      </Layout>
    );
  }

  return (
    <Layout sidebar>
      <div className='order-detail'>
        <h3 className='order-owner'>
          Order by :
          <span>
            <strong>{selectedOrder.user.userName}</strong>
          </span>
        </h3>
        <OrderDetailTable data={selectedOrder.items} />
        <h4>
          Total Price: <span>{selectedOrder.totalAmount}</span>
        </h4>

        <Steps current={currentStep}>
          {selectedOrder.orderStatus.map((status) => {
            return (
              <Step title={status.type} description={formatDate(status.date)} />
            );
          })}
        </Steps>

        <div className='order-updateStatus'>
          <Select
            defaultValue={
              selectedOrder.status == "completed" ? "Finished" : "Update"
            }
            disabled={selectedOrder.status == "completed" ? true : false}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            {selectedOrder.orderStatus.map((status) => {
              if (!status.isCompleted) {
                return <Option value={status.type}>{status.type}</Option>;
              }
            })}
          </Select>
        </div>
      </div>
    </Layout>
  );
}
