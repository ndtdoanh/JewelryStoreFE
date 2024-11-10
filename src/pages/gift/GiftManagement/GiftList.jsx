import { Table, Button, Popover, ConfigProvider } from "antd";
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { convertTimeStampToDateString } from "../../../utils/utils";

export default function GiftList({ giftData = [] }) {
  const handlePopoverVisibleChange = (index, visible) => {
    setOpen({ ...open, [index]: visible });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: "1%",
      render: (text) => <a>{text}</a>,
    },
    // {
    //     title: 'Gift Id',
    //     dataIndex: 'giftId',
    //     key: 'giftId',
    // },
    {
      title: "Gift Name",
      dataIndex: "giftName",
      key: "giftName",
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Point Required",
      dataIndex: "pointRequired",
      key: "pointRequired",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <ConfigProvider
          theme={{
            components: {
              Popover: {
                zIndexPopup: "2000",
              },
              Table: {
                cellPaddingInline: "200px",
              },
            },
          }}
        >
          <Popover
            content={
              <div
                className="pop-up"
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              ></div>
            }
            trigger="click"
            open={open[index]}
            placement="bottomRight"
            onOpenChange={(visible) =>
              handlePopoverVisibleChange(index, visible)
            }
          >
            <Button type="text">
              <TfiMoreAlt />
            </Button>
          </Popover>
        </ConfigProvider>
      ),
    },
  ];
  // Ensure giftData is an array
  const data = giftData.map((item, index) => ({
    key: index + 1,
    giftName: item?.giftName,
    giftId: item?.giftId,
    pointRequired: item?.pointRequired,
    startDate: convertTimeStampToDateString(item?.startDate),
    endDate: convertTimeStampToDateString(item?.endDate),
  }));

  const [open, setOpen] = useState(Array(giftData.length).fill(false));
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
}
