import { JSX } from "react";

const Button = ({
  id,
  title,
  leftIcon,
  rightIcon,
  containerClass,
}: {
  id: string;
  title: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  containerClass?: string;
}) => {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon && leftIcon}{" "}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>{" "}
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
