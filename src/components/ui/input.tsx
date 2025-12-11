import { Input as BaseInput } from "@base-ui-components/react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  className,
  leftIcon,
  rightIcon,
  ...rest
}) => {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon;

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="-translate-y-1/2 absolute top-1/2 left-3 transform text-gray-500">
          {leftIcon}
        </div>
      )}
      <BaseInput
        className={cn(
          "focus:-outline-offset-1 h-10 w-64 rounded-md border border-gray-200 text-base text-gray-900 focus:outline-1 focus:outline-gray-300",
          hasLeftIcon && "pl-11",
          hasRightIcon && "pr-11",
          !hasLeftIcon && "pl-3.5",
          !hasRightIcon && "pr-3.5",
          className,
        )}
        {...rest}
      />
      {rightIcon && (
        <div className="-translate-y-1/2 absolute top-1/2 right-3 transform text-gray-500">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Input;
