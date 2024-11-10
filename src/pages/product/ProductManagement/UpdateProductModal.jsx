import { Form, Input, Modal, Select, Switch } from 'antd';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';
import { useGetProductsByIdQuery } from '../../../services/productAPI';
import { useGetAllCountersQuery } from '../../../services/counterAPI';
import { useGetCategoriesQuery } from '../../../services/categoryAPI';

export default function UpdateProductModal({ onCancel, onCreate, setIsModalOpen, isModalOpen, productSelected, setProductSelected, handleEditProduct }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); const [valueStone, setValueStone] = useState('');
  const [valueProcessing, setValueProcessing] = useState('');
  const {
    data: productData,
    error: productError
  } = useGetProductsByIdQuery(productSelected);
  const { data: counterData } = useGetAllCountersQuery();
  const { data: categoryData } = useGetCategoriesQuery();


  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        ...productData,
        weightUnit: productData.weightUnit + ''
      });
    }
  }, [productData, form]);

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setProductSelected(null);
    if (onCancel) onCancel();
  };

  const handleOk = async () => {
    try {
      setLoading(true);
      let values = await form.validateFields();
      const type = categoryData.find(category => (
        category?.typeId === values?.typeId
      ));
      const formatData = {
        productId: productSelected, // Nếu get by id mà trả về producid thì xóa dòng này đi
        ...productData,
        ...values,
        weight: +values.weight,
        quantity: +values.quantity,
        counterId: +values.counterId,
        stonePrice: +values.stonePrice,
        weightUnit: +values.weightUnit,
        manufactureCost: +values.manufactureCost,
        markupRate: +values.markupRate,
        price: +values.stonePrice + +values.manufactureCost + +values.weight * type?.sellPricePerGram,
      }

      await handleEditProduct(formatData)
      form.resetFields(); // Reset form sau khi tạo thành công
      setLoading(false);
      setIsModalOpen(false); // Đóng modal sau khi tạo thành công
    } catch {
      setLoading(false);
    }
  }

  const handleValidateQuantity = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    if (!value) {
      return Promise.reject(new Error("Please input quantity of product!"));
    }
    if (value === '@' || /[^0-9.,]/.test(value)) {
      return Promise.reject(new Error("Please input a valid quantity!"));
    }

    return Promise.resolve();
  };
  const handleValidatePrice = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    if (!value) {
      return Promise.reject(new Error("Please input price of product!"));
    }
    if (value === '@' || /[^0-9.,]/.test(value)) {
      return Promise.reject(new Error("Please input a valid price!"));
    }

    return Promise.resolve();
  }; const handlePriceChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy
    setValueStone(inputValue);
  };
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
  const handleValidateWeight = (_, value) => {

    if (!value) {
      return Promise.reject(new Error("Please input Weight of product!"));
    }
    const parsedValue = parseFloat(value.toString().replace(',', '.'));
    if (isNaN(parsedValue)) {
      return Promise.reject(new Error("Please input a valid Weight of product!"));
    }


    if (parsedValue < 0) {
      return Promise.reject(new Error("Please input a non-negative number!"));
    }
    return Promise.resolve();
  }; const handlePriceChangeProcessing = (e) => {
    let inputValuePriceProcessing = e.target.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
    inputValuePriceProcessing = inputValuePriceProcessing.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy
    setValueProcessing(inputValuePriceProcessing);
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
          Update a Product
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

        <p style={{ marginBottom: "20px" }}><span>Product Name: </span> <strong>{productData?.name}</strong></p>

        <Form.Item

          label="Quantity"
          name="quantity"
          rules={[{ validator: handleValidateQuantity }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{
            required: true, message: "Please input description"
          }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Counter"
          name="counterId"
          rules={[
            { required: true, message: "Please select a counter" }
          ]}
        >
          <Select >
            {counterData?.map((counter) => (<Option key={counter.counterId} value={counter.counterId}>{counter.counterName}</Option>))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Type"
          name="typeId"
          rules={[{ required: true, message: 'Please select type!' }]}
        >
          <Select>
            {
              categoryData?.map(category => <Option key={category?.typeId} value={category?.typeId}>{category?.typeName}</Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="Weight"
          name="weight"
          rules={[{ validator: handleValidateWeight }]}
        >
          <Input placeholder="Input the weight" addonAfter={
            <Form.Item
              name="weightUnit"
              noStyle
              rules={[{ required: true, message: "Please select weight unit!" }]}
            >
              <Select style={{ width: 80 }}>
                <Option value="0">Gram</Option>
                <Option value="1">Carat</Option>
              </Select>
            </Form.Item>
          } />
        </Form.Item>
        <Form.Item
          name="stonePrice"
          label="Price(Stone)"
          rules={[
            { validator: handleValidatePrice },
          ]}
        >
          <Input
            placeholder="Input the price..."
            addonAfter="VND"
            value={valueStone}
            onChange={handlePriceChange}
          />
        </Form.Item>
        <Form.Item
          name="manufactureCost"
          label="Price(Processing)"
          rules={[
            { validator: handleValidatePrice },
          ]}
        >
          <Input
            placeholder="Input the price..."
            addonAfter="VND"
            value={valueProcessing}
            onChange={handlePriceChangeProcessing}
          />
        </Form.Item>

        <Form.Item
          label="Markup Rate"
          name="markupRate"
          rules={[{ required: true, validator: handleValidatePrice }]}
        >
          <Input placeholder="Input the price..."
            addonAfter="VND" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
