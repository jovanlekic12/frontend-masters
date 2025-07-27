import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";

type ButtonType =
  | "primary"
  | "secondary"
  | "small"
  | "round"
  | "login"
  | "upvote";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: ButtonType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}

function Button({
  children,
  disabled = false,
  to,
  type,
  onClick,
  isActive,
}: ButtonProps) {
  const base =
    " cursor-pointer text-md bg-purple-500 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:border-yellow-400";

  const styles: Record<ButtonType, string> = {
    primary: base + " flex items-center gap-1 px-3 py-1.5 rounded-xl",
    login: base + " w-full px-5 py-3",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " flex items-center justify-center w-9 h-9 rounded-[50%]",
    upvote: `flex flex-col items-center rounded-xl cursor-pointer duration-200 ${
      isActive ? "bg-blue-500" : "hover:bg-blue-200"
    }  px-2 py-2 min-w-12`,
    secondary: `flex items-center justify-center gap-2 capitalize ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-white text-blue-600 hover:bg-blue-200"
    }  rounded-xl py-1 px-4 text-lg font-semibold cursor-pointer duration-200`,
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
