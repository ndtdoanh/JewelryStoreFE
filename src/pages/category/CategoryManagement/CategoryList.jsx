import { Table, Button, Popover, ConfigProvider, Popconfirm } from 'antd'
import { TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateCategoryModal from './UpdateCategoryModal';
import { formatPrice } from '../../../utils/utils';


export default function CategoryList({ categoryData = [], handleDeleteCategory, handleEditCategory }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState(null);
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Buy Price Per Gam',
            dataIndex: 'buyPricePerGram',
            key: 'buyPricePerGram',
            render: (buyPricePerGram) => (formatPrice(buyPricePerGram))
        }, {
            title: 'Sell Price Per Gam',
            dataIndex: 'sellPricePerGram',
            key: 'sellPricePerGram',
            render: (sellPricePerGram) => (formatPrice(sellPricePerGram))
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
                                <div>
                                    <DeleteOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => { handlePopoverVisibleChange(index, false); }} >
                                        <Popconfirm
                                            title="Are you sure you want to delete this item?"
                                            onConfirm={() => handleDeleteCategory(record?.typeId)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <p className="">Delete Category</p>
                                        </Popconfirm>
                                    </Button>
                                </div>

                                <div>
                                    <EditOutlined style={{ paddingRight: '8px' }} />
                                    <Button type="text" onClick={() => {
                                        setIsModalOpen(true);
                                        handlePopoverVisibleChange(index, false);
                                        setCategorySelected(record.typeId);
                                    }}>
                                        <p className="">Edit Category</p></Button>
                                </div>
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
    // Ensure productData is an array
    const data = categoryData.map((item, index) => ({
        ...item,
        key: index + 1,
        category: item?.typeName,
        buyPricePerGram: item?.buyPricePerGram,
        sellPricePerGram: item?.sellPricePerGram
    }));
    const [open, setOpen] = useState(Array(categoryData.length).fill(false));
    return (
        <div>

            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
            <UpdateCategoryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
                handleEditCategory={handleEditCategory}
            />
        </div>
    )
}
