import { Table, Button, Popover, ConfigProvider, Badge, Popconfirm } from 'antd'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { convertTimeStampToDateString } from '../../../utils/utils';

export default function CustomerPolicyList({ customerPolicyData = [], handelUpdateApproveCustomerPolicy, handelUpdateDenyCustomerPolicy }) {
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
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },

        {
            title: 'Discount Rate',
            dataIndex: 'discountRate',
            key: 'discountRate',
            render: (text) => `${text} %`
        },
        {
            title: 'Valid From',
            dataIndex: 'validFrom',
            key: 'validFrom',
        },
        {
            title: 'Valid To',
            dataIndex: 'validTo',
            key: 'validTo',
        },
        {
            title: 'Approved By',
            dataIndex: 'approvedBy',
            key: 'approvedBy',
        },
        {
            title: 'Policy Status',
            dataIndex: 'policyStatus',
            key: 'policyStatus',
            render: (_, record) => (
                <div>
                    {
                        (record.publishingStatus !== 1) ? null : record.policyStatus == 0 ? <Badge status="success" text="Active" /> : <Badge status="warning" text="Used" />
                    }
                </div>

            )
        },
        {
            title: 'Status',
            dataIndex: 'publishingStatus',
            key: 'publishingStatus',
            render: (_, record) => (
                <div>
                    {!record.publishingStatus ? <Badge status="processing" text="Pending" />
                        : record.publishingStatus == '1' ? <Badge status="success" text="Approved" /> : <Badge status="warning" text="Denied" />
                    }
                </div>

            )
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
                                {!record?.publishingStatus && <><div>
                                    <CheckOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => { handlePopoverVisibleChange(index, false); }} >
                                        <Popconfirm
                                            title="Are you sure you want to Approve ?"
                                            onConfirm={() => handelUpdateApproveCustomerPolicy(record?.id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <p className="">Approve</p>
                                        </Popconfirm>
                                    </Button>
                                </div>

                                    <div>
                                        <CloseOutlined style={{ paddingRight: '8px' }} />
                                        <Button type="text" onClick={() => { handlePopoverVisibleChange(index, false); }} >
                                            <Popconfirm
                                                title="Are you sure you want to Deny ?"
                                                onConfirm={() => handelUpdateDenyCustomerPolicy(record?.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <p className="">Deny</p>
                                            </Popconfirm>
                                        </Button>
                                    </div></>}
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
    // Ensure customerPolicyData is an array
    const data = customerPolicyData.map((item, index) => ({
        key: index + 1,
        id: item?.cpId,
        customerName: item?.customerName,
        discountRate: item?.discountRate,
        validFrom: convertTimeStampToDateString(item?.validFrom),
        approvedBy: item?.approvedBy,
        publishingStatus: item?.publishingStatus,
        validTo: convertTimeStampToDateString(item?.validTo),
        policyStatus: item?.policyStatus
    }));
    const [open, setOpen] = useState(Array(customerPolicyData.length).fill(false));
    return (
        <div>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}
