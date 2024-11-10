import { Table,  Button, Popover, ConfigProvider, Badge, Popconfirm } from 'antd';
import  { useState } from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { DeleteOutlined } from '@ant-design/icons';
import { convertTimeStampToDateString } from '../../../utils/utils';


export default function PromotionList({ promotionData = [], handleDeletePromotion }) {
    const [open, setOpen] = useState(Array(promotionData.length).fill(false));
    // const [mode, setMode] = useState('');
    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible });
    };

   

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            width: '1%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Promotion Code',
            dataIndex: 'promotionCode',
            key: 'promotionCode',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (_, record, index) => (
                <>
                    {record.discountPercentage ? `${record?.discountPercentage} % `  : `${record?.fixedDiscountAmount} VND` }
                </>
            )
        },
        {
            title: 'Start date',
            dataIndex: 'startDate',
            key: 'startDate',
        }, {
            title: 'End date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'promotionStatus',
            key: 'promotionStatus',
            render: (_, record, index) => (
                <>
                    {!record.promotionStatus ? <Badge status="success" text="Active" />
                        : <Badge status="error" text="Inactive" />}
                </>
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
                        },
                    }}
                >
                    <Popover
                        content={
                            <div className="pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                
                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => { handlePopoverVisibleChange(index, false); }} >
                                        <Popconfirm
                                            title="Are you sure you want to delete this item?"
                                            onConfirm={() => handleDeletePromotion(record?.promotionCode)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <p className="">Delete Promotion</p>
                                        </Popconfirm>
                                    </Button>
                                </div>



                               
                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)}
                    >
                        <Button type="text"><TfiMoreAlt /></Button>
                    </Popover>
                </ConfigProvider>
            ),
        },
    ];

    
    const data = promotionData.map((item, index) => ({
        ...item,
        key: index + 1,
        id: item?.id,
        promotionCode: item?.promotionCode,
        startDate: convertTimeStampToDateString(item?.startDate),
        endDate: convertTimeStampToDateString(item?.endDate),
        promotionStatus: item?.promotionStatus,
        
    }));

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            
        </>
    );
}
