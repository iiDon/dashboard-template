import Icon, { IconProps } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export const renderIcon = (name: string, color?: string, hover?: string) => {
  try {
    // check if the icon name is valid
    if (!Object.keys(dynamicIconImports).includes(name)) {
      throw new Error("Invalid icon name");
    }
    return (
      <Icon
        name={name as IconProps["name"]}
        className={cn(
          "h-8 w-8 text-primary",
          color && `text-${color}`,
          hover && `hover:text-${hover}`,
        )}
      />
    );
  } catch (error) {
    return (
      <Icon
        name="car"
        className={cn(
          "h-8 w-8 text-primary",
          color && `text-${color}`,
          hover && `hover:text-${hover}`,
        )}
      />
    );
  }
};
