import { EyeOutlined  } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";


export default function ButtonViewCategory({
  contentBtn,
  width,
  height,
  onClick,
  icon,
  onChange,
  ...rest
}) {

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
        // style={{ fontFamily: "Inter" }}
        type="primary"
        onClick={onClick}
        icon={<EyeOutlined />}
      >
        {contentBtn}
      </Button>
    </ConfigProvider>
  );
}
