import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateOrderCompleteMutation } from "../../../services/orderAPI";

export default function AcceptOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [completeOrder] = useUpdateOrderCompleteMutation();

  useEffect(() => {
    const handleCompleteOrder = async () => {
      try {
        // Gọi API để cập nhật trạng thái đơn hàng hoàn thành
        await completeOrder({ orderId: id }).unwrap();

        // Sau khi cập nhật thành công, điều hướng đến trang chi tiết đơn hàng
        navigate(`/order/${id}`);
      } catch (error) {
        console.error("Failed to complete order:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    handleCompleteOrder();
  }, [id, completeOrder, navigate]);

  return <div>Đang xử lý đơn hàng...</div>;
}
