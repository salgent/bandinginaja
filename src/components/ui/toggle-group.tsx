import { cn } from "@/utils/cn";

interface Options {
  label: string | React.ReactNode;
  value: string;
}

interface ToggleGroupProps {
  value: string;
  options: Options[];
  onChange: (value: string) => void;
}

const ToggleGroup: React.FC<ToggleGroupProps> = (props) => {
  const { options, value, onChange } = props;

  return (
    <div className="flex gap-px rounded-md border border-gray-200 bg-gray-100 p-0.5">
      {options.map((item) => (
        <div
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "focus-visible:-outline-offset-1 flex size-8 cursor-pointer select-none items-center justify-center rounded-sm text-gray-500 hover:bg-gray-200 focus-visible:bg-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 active:bg-gray-200 data-[pressed]:bg-gray-100 data-[pressed]:text-gray-900",
            {
              "bg-white text-black hover:bg-white": value === item.value,
            },
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ToggleGroup;
