import  { useState } from 'react';
import {
    Modal,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import ButtonCreatePromotion from '../../../components/ButtonFilter/ButtonCreatePromotion';
import { Option } from 'antd/es/mentions';
import { convertDateStringToDate } from '../../../utils/utils';

export default function CreatePromotionModal({ onCreate }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [discountUnit, setDiscountUnit] = useState("2");
    const [datePicker, setDatePicker] = useState([]);
    const [datePickerDayjs, setDatePickerDayjs] = useState([]);
    const [form] = Form.useForm();



    const { RangePicker } = DatePicker;
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
    };
    const handleValidateCode = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Please input!"));
        }
        if (/[A-Z]/.test(value)) {
            return Promise.reject(new Error("Please input lowercase!"));
        }
        if (/\s/.test(value)) {
            return Promise.reject(new Error("No spaces allowed!"));
        }
        if (/[^a-z0-9]/.test(value)) {
            return Promise.reject(new Error("No special characters allowed!"));
        }
        return Promise.resolve();
    };


    const handleValidateDiscount = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Please input!"));
        }
        else if (value < 0) {
            return Promise.reject(new Error("Please input a non-negative number!"));
        }
        else if (discountUnit === "2" && value >= 100) {
            return Promise.reject(new Error("Please input a disscount less than 100% !"));
        } else if (/[^0-9.,]/.test(value)) {
            return Promise.reject(new Error("Please input a number"));
        }
        return Promise.resolve();
    }

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();


            const formatData = {
                ...values,
                discountPercentage: discountUnit === "2" ? values.Discount : 0,
                fixedDiscountAmount: discountUnit === "1" ? values.Discount : 0,
                startDate: convertDateStringToDate(datePicker[0]),
                endDate: convertDateStringToDate(datePicker[1]),

            }
            // console.log(formatData);
            await onCreate(formatData); // Thêm sản phẩm vào danh sách
            form.resetFields(); // Reset form sau khi tạo thành công
            setLoading(false);
            setDatePicker([]);
            setDatePickerDayjs([]);
            setIsModalOpen(false); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.log("Validation Failed:", error);
            setLoading(false);
        }
    };


    return (
        <>
            <ButtonCreatePromotion contentBtn={"Add Promotion"} onClick={showModal} />
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
                        Create a new Promotion
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
                        label="Code"
                        name="promotionCode"
                        rules={[{ validator: handleValidateCode }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="Discount"
                        rules={[

                            { validator: handleValidateDiscount }

                        ]}
                    >
                        <Input
                            placeholder="Input the discount" addonAfter={
                                <Form.Item
                                    name="DiscountUnit"
                                    noStyle
                                >
                                    <Select
                                        defaultValue={discountUnit}
                                        style={{ width: 80 }}
                                        onChange={(value) => {
                                            setDiscountUnit(value);
                                        }}
                                    >
                                        <Option value="1">VND</Option>
                                        <Option value="2">%</Option>
                                    </Select>

                                </Form.Item>
                            }
                        />
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
                        label="Date"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <RangePicker value={datePickerDayjs} format={"DD-MM-YYYY"} onChange={(date, dateString) => {
                            setDatePicker(dateString);
                            setDatePickerDayjs(date);


                        }} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
}
