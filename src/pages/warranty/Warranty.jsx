import { useState } from "react";
import "../warranty/Warranty.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import WarrantyList from "../warranty/WarrantyManagement/WarrantyList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import { useGetAllWarrantyQuery } from "../../services/warrantyAPI";

export default function Warranty() {
  const { data: warrantyData } = useGetAllWarrantyQuery();
  const [warrantySearchInput, setWarrantySearchInput] = useState("");

  const handleWarrantySearchInputChange = (e) => {
    // Hàm xử lý thay đổi tìm kiếm theo category
    setWarrantySearchInput(e.target.value);
  };

  // Apply map and then filter on warrantyData
  const filteredWarranty = warrantyData
    ?.map((warranty) => ({
      ...warranty,
    }))
    ?.filter(
      (warranty) =>
        warranty?.warrantyId
          ?.toLowerCase()
          .includes(warrantySearchInput.toLowerCase()) ||
        warranty?.orderDetailId
          ?.toLowerCase()
          .includes(warrantySearchInput.toLowerCase()) // Lọc theo warranty
    );

  return (
    <div className="container">
      <h1 className="h1">Warranty Page</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Warranty Name"
            prefix={<SearchOutlined />}
            value={warrantySearchInput}
            onChange={handleWarrantySearchInputChange}
          />
          {/* <ButtonFilter contentBtn={"Filter"} /> */}
        </div>
        <div className="edit-header-button">
          <div className="action-right">
            <div></div>
          </div>
        </div>
      </div>

      <div>
        <WarrantyList warrantyData={filteredWarranty} />
      </div>
    </div>
  );
}
