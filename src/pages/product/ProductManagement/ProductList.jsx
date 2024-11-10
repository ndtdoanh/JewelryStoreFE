import { Table, Button, Popover, ConfigProvider, Badge, Switch, Popconfirm } from 'antd';
import React from 'react';
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UpdateProductModal from './UpdateProductModal';

export default function ProductList({ productData = [], handldeDeleteProduct, handleEditProduct, handleToggleStatusProduct }) { // Destructure props and set default value
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productSelected, setProductSelected] = useState(null);

    const handlePopoverVisibleChange = (index, visible) => {
        setOpen({ ...open, [index]: visible }); // Update Popover state
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
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'typeName',
            key: 'typeName',
            render: (_, record, index) => {
                return (
                    <span>
                        {record?.typeName ? record?.typeName : <span style={{ marginLeft: '7px' }}> Null </span>}
                    </span>
                )
            }
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Counter',
            dataIndex: 'counter',
            key: 'counter',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record, index) => (
                <div>
                    {!record.productStatus ? <Badge status="success" text="Active" />
                        : <Badge status="error" text="Inactive" />}
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
                        },
                    }}
                >
                    <Popover
                        content={
                            <div className="pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>



                                {record.productStatus === 0 && (<> <Link to=
                                    {{
                                        pathname: `/view-product-detail/${record?.id}`
                                    }}
                                >
                                    <div>
                                        <EyeOutlined style={{ paddingRight: '8px' }} />
                                        <Button type="text" >
                                            <p className="">View Product Detail</p></Button>
                                    </div>

                                </Link>
                                    <div>
                                        <DeleteOutlined style={{ paddingRight: '8px' }} />
                                        <Button type="text" onClick={() => { handlePopoverVisibleChange(index, false); }} >
                                            <Popconfirm
                                                title="Are you sure you want to delete this item?"
                                                onConfirm={() => handldeDeleteProduct(record?.id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <p className="">Delete Product</p>
                                            </Popconfirm>
                                        </Button>

                                    </div>

                                    <div>
                                        <EditOutlined style={{ paddingRight: '8px' }} />
                                        <Button type="text" onClick={() => {
                                            setIsModalOpen(true);
                                            handlePopoverVisibleChange(index, false);
                                            setProductSelected(record?.id);
                                        }}>
                                            <p className="">Edit Product</p></Button>
                                    </div></>)}

                                <Popconfirm
                                    title={`Are you sure you want to ${!record.productStatus ? 'Inactive' : 'Active'}  this item?`}
                                    onConfirm={() => handleToggleStatusProduct(record?.productId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="text" style={{ width: '100%' }} onClick={() => { handlePopoverVisibleChange(index, false); }}>
                                        <p className="">{!record.productStatus ? 'Inactive' : 'Active'}</p>
                                    </Button>
                                </Popconfirm>

                            </div>
                        }
                        trigger="click"
                        open={open[index]}
                        placement="bottomRight"
                        onOpenChange={(visible) => handlePopoverVisibleChange(index, visible)} // Handle Popover state change
                    >
                        <Button type="text"><TfiMoreAlt /></Button>

                    </Popover>


                </ConfigProvider>
            ),
        },
    ];

    // Ensure productData is an array
    const data = productData.map((item, index) => ({
        ...item,
        key: index + 1,
        id: item?.productId,
        name: item?.name,
        code: item?.barcode,
        typeName: item?.typePrice?.typeName,
        weight: item?.weight,
        price: item?.price,
        counter: item?.counterName,
        quantity: item?.quantity,
    }));
    const [open, setOpen] = useState(Array(productData.length).fill(false));

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5, showSizeChanger: false }} />
            <UpdateProductModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} productSelected={productSelected} setProductSelected={setProductSelected} handleEditProduct={handleEditProduct} />
        </>
    )
}
