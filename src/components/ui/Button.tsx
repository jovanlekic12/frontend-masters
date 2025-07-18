import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";

type ButtonType = "primary" | "secondary" | "small" | "round";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  disabled = false,
  to,
  type,
  onClick,
}: ButtonProps) {
  const base =
    "cursor-pointer inline-block text-md rounded-xl bg-purple-500 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:border-yellow-400";

  const styles: Record<ButtonType, string> = {
    primary: base + "px-3 py-2 md:px-5 md:py-3",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "capitalize bg-white text-blue-600 rounded-xl py-1 px-4 font-semibold hover:bg-blue-200 cursor-pointer duration-200",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button onClick={onClick} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
