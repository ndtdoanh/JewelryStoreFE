import React, { useState } from "react";

import "../gift/Gift.css";

import { Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import GiftList from "../gift/GiftManagement/GiftList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import CreateGiftModal from "../gift/GiftManagement/CreateGiftModal";

import {
  useGetAllGiftQuery,
  useCreateGiftMutation,
} from "../../services/giftAPI";
// import CreateCustomerModal from "./CustomerManagement/CreateCustomerModal"

export default function Gift() {
  const { data: giftData, refetch } = useGetAllGiftQuery();
  const [addGift, { isLoading: isLoadingAdd }] = useCreateGiftMutation();
  const [giftSearchInput, setGiftSearchInput] = useState("");

  const handleGiftSearchInputChange = (e) => {
    // Hàm xử lý thay đổi tìm kiếm theo gift
    setGiftSearchInput(e.target.value);
  };
  // Apply map and then filter on giftData
  const filteredGift = giftData
    ?.map((gift) => ({
      ...gift,
    }))
    ?.filter(
      (gift) =>
        gift?.giftName?.toLowerCase().includes(giftSearchInput.toLowerCase()) ||
        gift?.giftId?.toLowerCase().includes(giftSearchInput.toLowerCase()) // Lọc theo gift
    );
  // console.log(giftData);

  //handle add gift
  const handleAddGift = async (values) => {
    // console.log(values);
    try {
      addGift(values).unwrap();
      notification.success({
        message: "Create gift successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: error?.data?.message,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="h1">Gift Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Gift Name"
            prefix={<SearchOutlined />}
            value={giftSearchInput}
            onChange={handleGiftSearchInputChange}
          />
          {/* <ButtonFilter contentBtn={"Filter"} /> */}
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div>
              <CreateGiftModal
                onCreate={handleAddGift}
                loading={isLoadingAdd}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* <PromotionList productData={filteredWarranty} /> */}
        <GiftList giftData={filteredGift} />
      </div>
    </div>
  );
}
