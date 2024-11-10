import { Form, Input, Modal  } from 'antd';
import { useEffect, useState } from 'react';
import { useGetCategoryByIdQuery } from '../../../services/categoryAPI';
import { getDateNow } from '../../../utils/utils';

export default function UpdateCategoryModal({ onCancel, setIsModalOpen, isModalOpen, categorySelected, setCategorySelected, handleEditCategory }) {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {
    data: categoryData,
  } = useGetCategoryByIdQuery(categorySelected);
  useEffect(() => {
    if (categoryData) {
      form.setFieldsValue({
        buyPricePerGram: categoryData.buyPricePerGram,
        sellPricePerGram: categoryData.sellPricePerGram
      });
    }
  }, [categoryData, form]);
  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCategorySelected(null);
    if (onCancel) onCancel();
  };

  const handleOk = async () => {
    setLoading(true);
    let values = await form.validateFields();
    values = {
      typeId: categorySelected,
      dateUpdated: getDateNow(),
      buyPricePerGram: +values.buyPricePerGram,
      sellPricePerGram: +values.sellPricePerGram,
    }

    await handleEditCategory(values);
    form.resetFields(); // Reset form sau khi tạo thành công
    setLoading(false);
    setIsModalOpen(false); // Đóng modal sau khi tạo thành công
  }

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
  return (
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
          Update a Category
        </div>
      }
      okText="Update"
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
      </Form>
    </Modal>
  )
}
