import { ButtonHTMLAttributes, forwardRef } from "react";
import { classNames } from "./utils";

type ButtonProps = {
  primary?: boolean;
  icon?: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

// NOTE: When using icons, add the "pointer-events-none" class to prevent it from
// becoming the target as it introduces issues with values not being serialized
// during formt submit.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ primary = false, disabled = false, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={classNames(
          icon && children ? "relative pl-10 pr-4" : "px-4",
          "py-2 rounded text-sm",
          primary ? "bg-teal-600 text-gray-100" : "bg-gray-200 text-gray-800",
          disabled
            ? "opacity-70 cursor-not-allowed"
            : `${
                primary
                  ? "hover:bg-teal-700 active:bg-teal-800"
                  : "hover:bg-gray-300 active:bg-gray-400"
              } transition ease-in-out duration-200`,
          "focus:outline-none"
        )}
        {...props}
      >
        {icon && children ? (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            {icon}
          </span>
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

export default Button;
