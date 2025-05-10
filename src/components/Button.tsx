import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "px-4 py-2 rounded font-medium focus:outline-none transition-colors duration-200";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledClasses = disabled ? "disabled:opacity-50 disabled:cursor-not-allowed": "";

  // Use the variant class or fallback to an empty string if variant is undefined
  const variantClasses = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;