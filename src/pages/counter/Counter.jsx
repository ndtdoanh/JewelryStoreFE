import React, { useEffect, useState } from "react";
import "./Counter.css";
import { Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import CounterList from "./CounterManage/CounterList";
import {
  useGetAllCountersQuery,
  useCreateCounterMutation,
} from "../../services/counterAPI";
import CreateCounterModal from "./CounterManage/CreateCounterModal";

export default function Counter() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { data: counterData, refetch, isFetching } = useGetAllCountersQuery();
  const [createCounter] = useCreateCounterMutation();

  useEffect(() => {
    if (!isFetching && counterData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isFetching, counterData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter and sort counters
  const filteredCounter = counterData?.filter((counter) =>
    counter?.counterName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const counterWithIdZero =
    filteredCounter?.filter((counter) => counter.counterId === 0) || [];

  const otherCounters =
    filteredCounter
      ?.filter((counter) => counter.counterId !== 0)
      .sort((a, b) => a.counterName.localeCompare(b.counterName)) || [];

  const sortedCounters = [...counterWithIdZero, ...otherCounters];

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      const result = await createCounter(values);
      console.log(result);
      if (result.data.isSuccess === true) {
        message.success(result.data.message);
        refetch();
        setIsCreateModalVisible(false); // Hide modal on success
      } else {
        message.error(result.data.message);
      }
    } catch (error) {
      console.error("Failed to create counter:", error);
    }
    setLoading(false);
  };

  return (
    <div className="counter-manage-page">
      <div className="header">
        <h1 className="title">Counter Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="action-right">
          <div onClick={() => setIsCreateModalVisible(true)}>
            <ButtonCreateProduct contentBtn={"Create Counter"} />
          </div>
        </div>
      </div>
      <div className="counter-list">
        <CounterList counterData={sortedCounters} loading={loading} />
      </div>
      <CreateCounterModal
        visible={isCreateModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={loading}
        counterData={counterData}
      />
    </div>
  );
}
