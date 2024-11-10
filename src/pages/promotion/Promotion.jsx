import "../promotion/Promotion.css";
import { Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PromotionList from "../promotion/PromotionManagement/PromotionList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";

import CreatePomotionModal from "./PromotionManagement/CreatePromotionModal";
import {
  useDeletePromotionMutation,
  useGetPromotionsQuery,
} from "../../services/promotionAPI";
import { useAddPromotionsMutation } from "../../services/promotionAPI";
import { useState } from "react";

export default function Promotion() {
  const { data: promotionData, refetch } = useGetPromotionsQuery();
  const [addPromotionMutation] = useAddPromotionsMutation();
  const [promotionSearchInput, setPromotionSearchInput] = useState("");
  const [deletePromotionMutation] = useDeletePromotionMutation();

  const handleCreatePomotion = async (values) => {
    try {
      await addPromotionMutation(values).unwrap();
      notification.success({
        message: "Create promotion successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: error?.data?.message,
      });
    }
  };
  const handlePromotionSearchInputChange = (e) => {
    // Hàm xử lý thay đổi tìm kiếm theo category
    setPromotionSearchInput(e.target.value);
  };
  const filteredPromotion = promotionData
    ?.map((promotion) => ({
      ...promotion,
    }))
    ?.filter(
      (promotion) =>
        promotion?.promotionCode
          ?.toLowerCase()
          .includes(promotionSearchInput.toLowerCase()) // Lọc theo customer
    );
  const handleDeletePromotion = async (id) => {
    try {
      await deletePromotionMutation(id).unwrap();
      notification.success({
        message: "Delete promotion successfully !!!",
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
      <h1 className="h1">Promotion Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or barcode"
            prefix={<SearchOutlined />}
            value={promotionSearchInput}
            onChange={handlePromotionSearchInputChange}
          />
          {/* <ButtonFilter contentBtn={"Filter"} /> */}
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div>
              <CreatePomotionModal onCreate={handleCreatePomotion} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <PromotionList
          promotionData={filteredPromotion}
          handleDeletePromotion={handleDeletePromotion}
        />
      </div>
    </div>
  );
}
