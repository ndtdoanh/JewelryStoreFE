import React from "react";

const CustomButton = ({
  icon: Icon,
  text,
  iconSize = "24px",
  iconColor = "#000",
  textColor = "#000",
  containerStyle = {},
  iconPosition = "left",
  fontSize = "16px",
  padding = "10px 20px",
  onClick,
}) => {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        padding,
        ...containerStyle,
      }}
      onClick={onClick} 
    >
      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSize}
          style={{ marginRight: "8px", color: iconColor }}
        />
      )}
      <span style={{ fontSize, color: textColor }}>{text}</span>
      {Icon && iconPosition === "right" && (
        <Icon size={iconSize} style={{ marginLeft: "8px", color: iconColor }} />
      )}
    </button>
  );
};

export default CustomButton;

{
  /* Example
 <CustomButton
  icon={RiAddLine}
  text="Add Small"
  iconSize="16px"
  iconColor="red"
  textColor="blue"
  containerStyle={{
    backgroundColor: "lightgray",
    marginBottom: "10px",
    border: "none",
  }}
  iconPosition="left"
  fontSize="12px"
  padding="5px 10px"
/>;
 */
}
