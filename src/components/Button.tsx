import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "large",
  className = "",
  disabled = false
}: ButtonProps) {
  const baseStyles = "rounded-full font-bold cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black inline-flex items-center justify-center";

  const variantStyles = {
    primary: "bg-[#000000] text-[#ffffff] hover:bg-[#222222]",
    secondary: "bg-[#ebebe8] text-[#000000] hover:bg-[#deded9]",
    success: "bg-[#bbf697] text-[#000000] hover:bg-[#a9eb82]",
    danger: "bg-[#d0106f] text-[#ffffff] hover:bg-[#b50d5e]"
  };

  const sizeStyles = {
    small: "text-sm py-2 px-4",
    medium: "text-base py-3 px-6",
    large: "text-lg py-4 px-8"
  };

  const disabledStyles = disabled ? "opacity-40 cursor-not-allowed hover:scale-100 active:scale-100" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}
