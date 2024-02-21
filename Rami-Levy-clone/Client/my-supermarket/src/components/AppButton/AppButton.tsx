import React, { ReactNode, MouseEventHandler } from "react";
import "./app-button.scss"; // Import the SCSS file

interface AppButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode; // This represents the content within the button
}

const AppButton: React.FC<AppButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <button className="AppButton" onClick={onClick} {...props}>
      {children} {/* This is where the text or any other elements go */}
    </button>
  );
};

export default AppButton;
