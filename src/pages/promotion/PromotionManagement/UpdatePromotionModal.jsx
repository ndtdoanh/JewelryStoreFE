import { useEffect, useState } from 'react';
import {
    Modal,
    DatePicker,
    Form,
    Input,
    theme,
    Select,
    notification,
    Switch,
} from 'antd';
import ButtonCreatePromotion from '../../../components/ButtonFilter/ButtonCreatePromotion';
import { Option } from 'antd/es/mentions';
// import { convertDateStringToTimeStamp, convertTimeStampToDateString } from '../../../utils/utils';
import { useGetPromotionByIdQuery } from '../../../services/promotionAPI';
import dayjs from 'dayjs';

export default function UpdatePromotionModal({ setIsModalOpen, isModalOpen, promotionSelected, setPromotionSelected, handleEditPromotion }) {

    const [loading, setLoading] = useState(false);
    const [discountUnit, setDiscountUnit] = useState('');
    const [datePicker, setDatePicker] = useState([]);
    const [datePickerDayjs, setDatePickerDayjs] = useState([]);
    const [form] = Form.useForm();

    const { token } = theme.useToken();
    const {
        data: promotionData,
        error: productError
    } = useGetPromotionByIdQuery(promotionSelected);

    useEffect(() => {
        if (promotionData) {
            form.setFieldsValue({
                PromotionCode: promotionData.PromotionCode,
                Discount: promotionData.DiscountPercentage ? promotionData.DiscountPercentage : promotionData.FixedDiscountAmount,
                Status: promotionData.PromotionStatuses === "Active" ? true : false
            });
            setDiscountUnit(promotionData.DiscountPercentage ? "2" : "1");
            setDatePickerDayjs([dayjs(promotionData.StartDate), dayjs(promotionData.EndDate)])
            // setDatePicker([convertTimeStampToDateString(promotionData.StartDate), convertTimeStampToDateString(promotionData.EndDate)])
        }

    }, [form, promotionData, promotionSelected])

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
    const handleCancelModal = () => {
        setIsModalOpen(false);
        setPromotionSelected(null);
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
                ...promotionData,
                ...values,
                DiscountPercentage: discountUnit === "2" ? values.Discount : 0,
                FixedDiscountAmount: discountUnit === "1" ? values.Discount : 0,
                // StartDate: convertDateStringToTimeStamp(datePicker[0]),
                // EndDate: convertDateStringToTimeStamp(datePicker[1]),
                PromotionStatuses: values.Status == true ? "Active" : "Inactive"
            }

            await handleEditPromotion(formatData); // Thêm sản phẩm vào danh sách
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
                        Update a Promotion
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
                        label="Code"
                        name="PromotionCode"
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
                        label="Date"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <RangePicker value={datePickerDayjs} format={"DD-MM-YYYY"} onChange={(date, dateString) => {
                            setDatePicker(dateString);
                            setDatePickerDayjs(date);


                        }} />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="Status"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
