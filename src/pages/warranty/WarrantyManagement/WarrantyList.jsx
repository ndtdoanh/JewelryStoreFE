import { Table, Button, Popover, ConfigProvider } from 'antd'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { convertTimeStampToDateString } from '../../../utils/utils';





export default function WarrantyList({ warrantyData = [] }) {
    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Cập nhật trạng thái của Popover
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width: '1%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Warranty Id',
            dataIndex: 'warrantyId',
            key: 'warrantyId',
        },

        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Order DetailId',
            dataIndex: 'orderDetailId',
            key: 'orderDetailId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <ConfigProvider
                    theme={{
                        components: {
                            Popover: {
                                zIndexPopup: '2000'
                            },
                            Table: {
                                cellPaddingInline: '200px'
                            }
                        },
                    }}
                >
                    <Popover
                        content={
                            <div className="pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)} // Xử lý sự kiện khi Popover thay đổi trạng thái
                    >
                        <Button type="text"><TfiMoreAlt /></Button>

                    </Popover>

                </ConfigProvider>
            ),
        },
    ];
    // Ensure warrantyData is an array
    const data = warrantyData.map((item, index) => ({
        key: index + 1,
        warrantyId: item?.warrantyId,
        orderDetailId: item?.orderDetailId,
        startDate: convertTimeStampToDateString(item?.startDate),
        endDate: convertTimeStampToDateString(item?.endDate),
    }));
   

    const [open, setOpen] = useState(Array(warrantyData.length).fill(false));
    return (
        <div>

            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

        </div>
    )
}
