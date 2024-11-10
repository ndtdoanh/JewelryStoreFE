// import React from "react";
// import { Modal, List, Button, Descriptions, Tag } from "antd";
// import dayjs from "dayjs";

// const CustomerPolicySelector = ({
//   visible,
//   customerPolicies,
//   onApplyPolicy,
//   onCancel,
// }) => {
//   const statusMapping = {
//     0: "Pending",
//     1: "Approved",
//     2: "Denied",
//   };

//   const statusColorMapping = {
//     0: "	blue	",
//     1: "	green	",
//     2: "red		",
//   };
//   // Lọc danh sách customerPolicies theo policyStatus === 0 và sắp xếp theo publishingStatus
//   const filteredPolicies = customerPolicies
//     .filter((policy) => policy.policyStatus === 0)
//     .sort((a, b) => {
//       // Sắp xếp theo publishingStatus, nhưng đảm bảo các policy có publishingStatus === 1 (Approved) nằm trên đầu
//       if (a.publishingStatus === 1 && b.publishingStatus !== 1) {
//         return -1;
//       }
//       if (b.publishingStatus === 1 && a.publishingStatus !== 1) {
//         return 1;
//       }
//       return a.publishingStatus - b.publishingStatus;
//     });
//   const handleApplyPolicy = (policy) => {
//     // Kiểm tra nếu policy có trạng thái là Pending hoặc Denied thì không thực hiện apply
//     if (policy.publishingStatus === 0 || policy.publishingStatus === 2) {
//       return;
//     }
//     // Gọi hàm onApplyPolicy khi policy có trạng thái là Approved
//     onApplyPolicy(policy);
//   };

//   return (
//     <Modal
//       visible={visible}
//       title="Select Customer Policy"
//       onCancel={onCancel}
//       footer={null}
//     >
//       <List
//         dataSource={filteredPolicies}
//         renderItem={(policy) => (
//           <List.Item>
//             <div style={{ flex: 1 }}>
//               <Descriptions column={1}>
//                 <div>Discount: {policy.discountRate}%</div>
//                 <div>
//                   {dayjs(policy.validFrom).format("HH:mm DD/MM/YYYY")} -{" "}
//                   {dayjs(policy.validTo).format("HH:mm DD/MM/YYYY")}
//                 </div>
//                 <div>
//                   <Tag
//                     style={{ fontWeight: "bold" }}
//                     color={
//                       statusColorMapping[policy.publishingStatus] || "#333"
//                     }
//                   >
//                     {statusMapping[policy.publishingStatus] || "NaN"}
//                   </Tag>
//                 </div>
//               </Descriptions>
//             </div>
//             {/* Disable button nếu policy có trạng thái là Pending hoặc Denied */}
//             <Button
//               type="primary"
//               onClick={() => handleApplyPolicy(policy)}
//               disabled={
//                 policy.publishingStatus === 0 || policy.publishingStatus === 2
//               }
//             >
//               Apply
//             </Button>
//           </List.Item>
//         )}
//       />
//     </Modal>
//   );
// };

// export default CustomerPolicySelector;

import React from "react";
import { Modal, List, Button, Descriptions, Tag } from "antd";
import dayjs from "dayjs";

const CustomerPolicySelector = ({
  visible,
  customerPolicies,
  onApplyPolicy,
  onCancel,
}) => {
  const statusMapping = {
    0: "Pending",
    1: "Approved",
    2: "Denied",
  };

  const statusColorMapping = {
    0: "blue",
    1: "green",
    2: "red",
  };

  // Lọc danh sách customerPolicies theo policyStatus === 0 và sắp xếp theo publishingStatus
  const filteredPolicies = customerPolicies
    .filter((policy) => policy.policyStatus === 0)
    .sort((a, b) => {
      // Sắp xếp theo publishingStatus, nhưng đảm bảo các policy có publishingStatus === 1 (Approved) nằm trên đầu
      if (a.publishingStatus === 1 && b.publishingStatus !== 1) {
        return -1;
      }
      if (b.publishingStatus === 1 && a.publishingStatus !== 1) {
        return 1;
      }
      return a.publishingStatus - b.publishingStatus;
    });

  const handleApplyPolicy = (policy) => {
    // Kiểm tra nếu policy có trạng thái là Pending hoặc Denied thì không thực hiện apply
    if (policy.publishingStatus === 0 || policy.publishingStatus === 2) {
      return;
    }
    // Kiểm tra nếu không còn trong khoảng thời gian hợp lệ thì không thực hiện apply
    const currentTime = dayjs();
    if (
      currentTime.isBefore(policy.validFrom) ||
      currentTime.isAfter(policy.validTo)
    ) {
      return;
    }
    // Gọi hàm onApplyPolicy khi policy có trạng thái là Approved và còn trong khoảng thời gian hợp lệ
    onApplyPolicy(policy);
  };

  return (
    <Modal
      visible={visible}
      title="Select Customer Policy"
      onCancel={onCancel}
      footer={null}
    >
      <List
        dataSource={filteredPolicies}
        renderItem={(policy) => (
          <List.Item>
            <div style={{ flex: 1 }}>
              <Descriptions column={1}>
                <div>Discount: {policy.discountRate}%</div>
                <div>
                  {dayjs(policy.validFrom).format("HH:mm DD/MM/YYYY")} -{" "}
                  {dayjs(policy.validTo).format("HH:mm DD/MM/YYYY")}
                </div>
                <div>
                  <Tag
                    style={{ fontWeight: "bold" }}
                    color={
                      statusColorMapping[policy.publishingStatus] || "#333"
                    }
                  >
                    {statusMapping[policy.publishingStatus] || "NaN"}
                  </Tag>
                </div>
              </Descriptions>
            </div>
            {/* Disable button nếu policy có trạng thái là Pending hoặc Denied hoặc không còn trong khoảng thời gian hợp lệ */}
            <Button
              type="primary"
              onClick={() => handleApplyPolicy(policy)}
              disabled={
                policy.publishingStatus === 0 ||
                policy.publishingStatus === 2 ||
                dayjs().isBefore(policy.validFrom) ||
                dayjs().isAfter(policy.validTo)
              }
            >
              Apply
            </Button>
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default CustomerPolicySelector;
