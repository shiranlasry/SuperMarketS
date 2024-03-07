import React from "react";
import { useNavigate } from "react-router-dom";
import "./rami-btn.scss";

interface RamiBtnProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  text?: string;
  children?: React.ReactNode; // Define children prop
  className?: string; // Add className prop
}

const RamiBtn: React.FC<RamiBtnProps> = ({
  onClick,
  type,
  to,
  text,
  children,
  className, // Include className in props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (to) {
      navigate(to);
    }
  };

  // Combine existing class name with "rami-btn"
  const combinedClassName = `rami-btn ${className || ""}`;

  return (
    <button
      type={type || "button"}
      onClick={handleClick}
      className={combinedClassName}
    >
      {children || text}
    </button>
  );
};

export default RamiBtn;
