import { useState } from 'react';
import { Modal, Button, Form, Input, Select, Upload, message } from 'antd';
import ButtonCreateProduct from '../../../components/ButtonFilter/ButtonCreateProduct';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from "../../../config/FirebaseConfig/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useGetCategoriesQuery } from '../../../services/categoryAPI';
import { useGetAllCountersQuery } from '../../../services/counterAPI';
import { generateBarcode } from '../../../utils/utils';
const { Option } = Select;

const CreateProductModal = ({ onCancel, onCreate, }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    // const [imageUrl, setImageUrl] = useState(null);
    // const [pdfUrl, setPdfUrl] = useState(null);
    const [pdfFileList, setPdfFileList] = useState([]);
    const [valueStone, setValueStone] = useState('');
    const [valueProcessing, setValueProcessing] = useState('');
    const [form] = Form.useForm();

    const { data: categoryData } = useGetCategoriesQuery();
    const { data: counterData } = useGetAllCountersQuery();
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

            const imageUrl = await handleUpload(fileList[0]);
            const pdfUrl = await handleUpload(pdfFileList[0]);
            if (imageUrl && pdfUrl) {
                // Xử lý lấy ra giá thị trường
                const type = categoryData.find(category => (
                    category?.typeId === values?.typeId
                ));
                const barcode = generateBarcode(type);
                values = {
                    ...values,
                    img: imageUrl,
                    certificateUrl: pdfUrl,
                    barcode,
                    // price: +values.stonePrice + +values.manufactureCost + +values.weight * type?.sellPricePerGram,
                    price: 0,
                    weight: +values.weight,
                    quantity: +values.quantity,
                    counterId: +values.counterId,
                    stonePrice: +values.stonePrice,
                    weightUnit: +values.weightUnit,
                    manufactureCost: +values.manufactureCost,
                    markupRate: +values.markupRate,
                    status: 0, //active
                };
                await onCreate(values); // Thêm sản phẩm vào danh sách
                form.resetFields(); // Reset form sau khi tạo thành công
                setFileList([]); // Xoá danh sách file upload
                setPdfFileList([])
                // setImageUrl(null); // Xoá ảnh đã upload
                // setPdfUrl(null);
                setLoading(false);
                setIsModalOpen(false); // Đóng modal sau khi tạo thành công
                // console.log(productData);
            } else {
                message.error("Please upload an image and pdf");
                setLoading(false);
            }
        } catch (error) {
            console.log("Validation Failed:", error);
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                },
                (error) => {
                    // Handle unsuccessful uploads
                    message.error(error.message);
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );

        });
    };

    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: (file) => {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isImage) {
                message.error('You can only upload JPG/PNG file!');
                return false;
            }
            setFileList([file]);
            return false;
        },
        onRemove: () => {
            setFileList([]);
        }
    };

    const uploadRules = [
        {
            required: true,
            message: 'Please upload an image!'
        }
    ];

    const pdfUploadProps = {
        name: 'pdf',
        multiple: false,
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
            if (!isPDF) {
                message.error('You can only upload PDF files!');
            } else {
                setPdfFileList([file])

            }
            return isPDF || Upload.LIST_IGNORE;
        },
        onRemove: () => {
            setPdfFileList([]);
        }
    };

    const pdfUploadRules = [
        {
            required: true,
            message: 'Please upload a PDF!'
        }
    ];

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

    const handleValidateWeight = (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Please input Weight of product!"));
        }
        const parsedValue = parseFloat(value.replace(',', '.'));
        if (isNaN(parsedValue)) {
            return Promise.reject(new Error("Please input a valid Weight of product!"));
        }
        if (parsedValue < 0) {
            return Promise.reject(new Error("Please input a non-negative number!"));
        }
        return Promise.resolve();
    };

    const handlePriceChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
        inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy
        setValueStone(inputValue);
    };

    const handlePriceChangeProcessing = (e) => {
        let inputValuePriceProcessing = e.target.value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
        inputValuePriceProcessing = inputValuePriceProcessing.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy
        setValueProcessing(inputValuePriceProcessing);
    };

    const handleValidatePrice = (_, value) => {
        if (value < 1) {
            return Promise.reject(new Error("Please input a non-negative number or a number more than 1!"));
        }
        if (!value) {
            return Promise.reject(new Error("Please input price of product!"));
        }
        if (value === '@' || /[^0-9.,]/.test(value)) {
            return Promise.reject(new Error("Please input a valid price!"));
        }


        return Promise.resolve();
    };


    return (
        <>
            <ButtonCreateProduct contentBtn={"Add Product"} onClick={showModal} />
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
                        Create a new Product
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
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input />
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
                        label="Barcode"
                        name="barcode"
                    >
                        <Input disabled placeholder="Automatically generated" />
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ validator: handleValidateQuantity }]}
                    >
                        <Input />
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
                        <Input placeholder="Input the price..." />
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
                        <Select>

                            {counterData?.map((counter) => (<Option key={counter.counterId} value={counter.counterId}>{counter.counterName}</Option>))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Upload Image"
                        name="img"
                        rules={uploadRules}
                    >
                        <Upload {...uploadProps} fileList={fileList} onChange={() => {
                            console.log(fileList);
                        }}>
                            <Button icon={<UploadOutlined />} >Click to Upload</Button>
                        </Upload>

                    </Form.Item>

                    <Form.Item
                        label="Upload PDF"
                        name="certificateUrl"
                        rules={pdfUploadRules}
                    >
                        <Upload {...pdfUploadProps} fileList={pdfFileList}
                            onChange={() => {
                                console.log(pdfFileList);
                            }}>
                            <Button icon={<UploadOutlined />} >Click to Upload PDF</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateProductModal;
