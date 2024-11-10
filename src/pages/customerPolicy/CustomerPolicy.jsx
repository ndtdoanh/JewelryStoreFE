import { useState } from "react";
import "../customerPolicy/CustomerPolicy.css";
import { Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CustomerPolicyList from "./CustomerManagement/CustomerPolicyList";
import ButtonFilter from "../../components/ButtonFilter/ButtonFilter";
import {
  useGetAllCustomersPolicyQuery,
  useUpdateApproveCustomerMutation,
  useUpdateDenyCustomerMutation,
} from "../../services/customerPolicyAPI";

export default function CustomerPolicy() {
  const { data: customerPolicyData, refetch } = useGetAllCustomersPolicyQuery();
  const [customerSearchInput, setCustomerSearchInput] = useState("");
  const [approveCustomerPolicy] = useUpdateApproveCustomerMutation();
  const [denyCustomerPolicy] = useUpdateDenyCustomerMutation();
  const handleCustomerSearchInputChange = (e) => {
    setCustomerSearchInput(e.target.value);
  };

  const filteredCustomerPolicy = customerPolicyData
    ?.map((customer) => ({
      ...customer,
    }))
    ?.filter((customer) =>
      customer?.customerName
        ?.toLowerCase()
        .includes(customerSearchInput.toLowerCase())
    );

  const handelUpdateApproveCustomerPolicy = async (id) => {
    try {
      approveCustomerPolicy(id).unwrap();
      notification.success({
        message: "Change successfully !!!",
      });
      refetch();
    } catch (error) {
      console.log(error);
      notification.error({
        message: error?.data?.message,
      });
    }
  };
  const handelUpdateDenyCustomerPolicy = async (id) => {
    try {
      denyCustomerPolicy(id).unwrap();
      notification.success({
        message: "Change successfully !!!",
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
      <h1 className="h1">Customer Policy</h1>

      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Customer Name"
            prefix={<SearchOutlined />}
            value={customerSearchInput}
            onChange={handleCustomerSearchInputChange}
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
        <CustomerPolicyList
          customerPolicyData={filteredCustomerPolicy}
          handelUpdateApproveCustomerPolicy={handelUpdateApproveCustomerPolicy}
          handelUpdateDenyCustomerPolicy={handelUpdateDenyCustomerPolicy}
        />
      </div>
    </div>
  );
}
