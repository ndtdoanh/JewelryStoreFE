import React from 'react';
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";

const ButtonCreateProduct = ({
  contentBtn,
  width,
  height,
  onClick,
  icon,
  ...rest
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            /* here is your component tokens */
            fontWeight: "600",
          },
        },
        token: {
          /* here is your global tokens */
          colorPrimary: "#333333",
        },
      }}
    >
      <Button
        type="primary"
        icon={icon || <PlusOutlined />}
        onClick={onClick}
        {...rest}
      >
        {contentBtn}
      </Button>
    </ConfigProvider>
  );
};

export default ButtonCreateProduct;
