import { useState } from 'react';
import { Modal, Form, Input  } from 'antd';
import ButtonCreateCategory from '../../../components/ButtonFilter/ButtonCreateCategory';
import { getDateNow } from '../../../utils/utils';


export default function CreateCategoryModal({ onCancel, onCreate, }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
        if (onCancel) onCancel();
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();

            values = {
                ...values,
                dateUpdated: getDateNow(),
                buyPricePerGram: +values.buyPricePerGram,
                sellPricePerGram: +values.sellPricePerGram,
            }
            await onCreate(values); // Thêm sản phẩm vào danh sách
            form.resetFields(); // Reset form sau khi tạo thành công
            setLoading(false);
            setIsModalOpen(false); // Đóng modal sau khi tạo thành công

        } catch (error) {
            console.log("Validation Failed:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <ButtonCreateCategory contentBtn={"Add Category"} onClick={showModal} />
            <Modal
                open={isModalOpen}
                title={
                    <div
                        style={{
                            fontFamily: 'Playfair Display',
                            textAlign: "center",
                            fontSize: "25px",
                            fontWeight: "initial",
                            color: "#333333",
                        }}
                    >
                        Create a new Category
                    </div>
                }
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{ loading }}
                onCancel={handleCancelModal}
                onOk={handleOk}

            >
                <Form
                    {...formItemLayout}
                    form={form}
                    style={{ maxWidth: 600 }}
                >

                    <Form.Item
                        label="Category Name"
                        name="typeName"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Buy Price/Gam"
                        name="buyPricePerGram"

                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Sell Price/Gam"
                        name="sellPricePerGram"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 6, span: 16 }}
                    >
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
