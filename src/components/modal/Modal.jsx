import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  Radio,
  Row,
  Col,
  Select,
  Upload,
  Checkbox,
  Slider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CustomModal = ({
  visible,
  onCancel,
  title,
  content,
  onOk,
  okText = "Create",
  cancelText = "Cancel",
}) => {
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [radioValue, setRadioValue] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [fileList, setFileList] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [sliderValues, setSliderValues] = useState({});

  useEffect(() => {
    if (!visible) {
      setInputValues({});
      setInputErrors({});
      setRadioValue("");
      setSelectValue({});
      setFileList([]);
      setCheckboxValues({});
      setSliderValues({});
    }
  }, [visible]);

  const handleInputChange = (name, type) => (e) => {
    let value = e.target.value;
    if (type === "number") {
      value = value.replace(/[^0-9]/g, "");
    }
    setInputValues({ ...inputValues, [name]: value });
    setInputErrors({ ...inputErrors, [name]: "" });
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleSelectChange = (name) => (value) => {
    setSelectValue({ ...selectValue, [name]: value });
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCheckboxChange = (name, value) => {
    setCheckboxValues({ ...checkboxValues, [name]: value });
  };

  const handleSliderChange = (name, value) => {
    setSliderValues({ ...sliderValues, [name]: value });
  };

  const handleOk = (e) => {
    e.preventDefault();
    let hasError = false;
    const newInputErrors = {};

    content.forEach((item) => {
      if (item.type === "input" && !inputValues[item.name]?.trim()) {
        newInputErrors[item.name] = "This field is required";
        hasError = true;
      }
      if (item.type === "select" && !selectValue[item.name]) {
        newInputErrors[item.name] = "This field is required";
        hasError = true;
      }
    });

    setInputErrors(newInputErrors);
    if (hasError) return;

    onOk(inputValues, selectValue, fileList, checkboxValues, sliderValues);
    onCancel();
  };

  const uploadProps = {
    fileList,
    onChange: handleFileChange,
  };

  return (
    <Modal
      visible={visible}
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333333",
          }}
        >
          {title}
        </div>
      }
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleOk}>
        <Row gutter={[16, 16]}>
          {content.map((item, index) => (
            <Col key={index} span={24}>
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flex: "0 0 auto",
                    width: "100px",
                    marginRight: "15px",
                  }}
                >
                  {item.label}
                </div>
                <div style={{ flex: "1" }}>
                  {item.type === "title" && <h3>{item.text}</h3>}
                  {item.type === "input" && (
                    <>
                      <Input
                        type={item.inputType || "text"}
                        placeholder={item.placeholder}
                        value={inputValues[item.name] || ""}
                        onChange={handleInputChange(item.name, item.inputType)}
                      />
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        {inputErrors[item.name]}
                      </div>
                    </>
                  )}
                  {item.type === "radio" && (
                    <Radio.Group
                      options={item.options}
                      onChange={handleRadioChange}
                      value={radioValue}
                    />
                  )}
                  {item.type === "select" && (
                    <>
                      <Select
                        value={selectValue[item.name] || undefined}
                        onChange={handleSelectChange(item.name)}
                        style={{ width: "100%" }}
                      >
                        {item.options.map((option, index) => (
                          <Option key={index} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "5px",
                        }}
                      >
                        {inputErrors[item.name]}
                      </div>
                    </>
                  )}
                  {item.type === "file" && (
                    <Upload {...uploadProps}>
                      <Button
                        style={{ color: "white", backgroundColor: "#555555" }}
                        icon={<UploadOutlined />}
                      >
                        Import File
                      </Button>
                    </Upload>
                  )}
                  {item.type === "checkbox" && (
                    <Checkbox
                      onChange={(e) =>
                        handleCheckboxChange(item.name, e.target.checked)
                      }
                      checked={checkboxValues[item.name]}
                    >
                      {item.label}
                    </Checkbox>
                  )}
                  {item.type === "checkboxGroup" && (
                    <Checkbox.Group
                      options={item.options}
                      onChange={(checkedValues) =>
                        handleCheckboxChange(item.name, checkedValues)
                      }
                      value={checkboxValues[item.name]}
                      style={{ display: "flex", flexDirection: "row" }}
                    />
                  )}
                  {item.type === "slider" && (
                    <Slider
                      min={item.min}
                      max={item.max}
                      value={sliderValues[item.name]}
                      onChange={(value) => handleSliderChange(item.name, value)}
                    />
                  )}
                  {item.type === "link" && <a href={item.href}>{item.text}</a>}
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            key="cancel"
            onClick={onCancel}
            style={{ border: "none", color: "red", marginRight: "10px" }}
          >
            <u>{cancelText}</u>
          </Button>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#333333", padding: "5px 25px" }}
          >
            {okText}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CustomModal;
