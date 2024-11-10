import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUndoOrderMutation,
  useUpdateOrderCancelMutation,
} from "../../../services/orderAPI";

export default function CancelOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateCancel] = useUpdateOrderCancelMutation();
  const [undoOrder] = useUndoOrderMutation();

  useEffect(() => {
    const cancelOrder = async () => {
      try {
        // Gọi API để cập nhật trạng thái đơn hàng hủy
        await updateCancel({ orderId: id }).unwrap();

        // Gọi API để hoàn tác đơn hàng
        await undoOrder({ orderId: id }).unwrap();

        // Sau khi cập nhật thành công, điều hướng đến trang chi tiết đơn hàng
        navigate(`/order/${id}`);
      } catch (error) {
        console.error("Failed to cancel order:", error);
        // Xử lý lỗi nếu cần thiết
      }
    };

    cancelOrder();
  }, [id, updateCancel, undoOrder, navigate]);

  return <div>Đang xử lý hủy đơn hàng...</div>;
}
