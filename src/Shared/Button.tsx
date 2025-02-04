import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md bg-yellow-600 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
