import { FilterOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";
import { RiFilter3Line } from "@remixicon/react";

export default function ButtonFilter({
  contentBtn,

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
        // icon={<RiFile3Fill />}
        style={{ display: "flex" }}
      >
        <RiFilter3Line style={{marginRight:'5px'}} />
        {contentBtn}
      </Button>
    </ConfigProvider>
  );
}
