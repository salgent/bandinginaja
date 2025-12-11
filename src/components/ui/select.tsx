import { Select as BaseSelect } from "@base-ui-components/react";
import { CheckIcon } from "lucide-react";

interface Option {
  label: string;
  value: string | number;
}
interface SelectProps {
  options: Option[];
  icon: React.ReactElement;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onValueChange?: (value: number) => void;
}

const Select: React.FC<SelectProps> = (props) => {
  const { options, icon, defaultValue, onValueChange } = props;

  return (
    <BaseSelect.Root
      items={options}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <BaseSelect.Trigger className="focus-visible:-outline-offset-1 flex h-10 min-w-20 select-none items-center justify-between gap-3 rounded-md border border-gray-200 bg-[canvas] pr-3 pl-3.5 text-base text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 data-[popup-open]:bg-gray-100">
        <BaseSelect.Value />
        <BaseSelect.Icon className="flex">{icon}</BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="z-10 select-none outline-none"
          sideOffset={8}
        >
          <BaseSelect.Popup className="group min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-md bg-[canvas] bg-clip-padding text-gray-900 shadow-gray-200 shadow-lg outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:transition-none data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none dark:outline-gray-300">
            <BaseSelect.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:top-[-100%]" />
            <BaseSelect.List className="relative max-h-[var(--available-height)] scroll-py-6 overflow-y-auto py-1">
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.label}
                  value={option.value}
                  className="grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 pointer-coarse:py-2.5 py-2 pr-4 pl-2.5 pointer-coarse:text-[0.925rem] text-sm leading-4 outline-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900 group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4"
                >
                  <BaseSelect.ItemIndicator className="col-start-1">
                    <CheckIcon className="size-3" />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText className="col-start-2">
                    {option.label}
                  </BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
            <BaseSelect.ScrollDownArrow className="bottom-0 bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]" />
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
};

export default Select;
