import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "@/components/ui/date-time-picker/time-picker-demo";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValue, FieldValues } from "react-hook-form";

type Props = {
  control: Control<FieldValue<FieldValues>>;
  name: string;
  label: string;
  description?: string;
};

const PostDateField: React.FC<Props> = ({
  control,
  name,
  label,
  description,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP HH:mm:ss")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
              <div className="p-3 border-t border-border">
                <TimePickerDemo setDate={field.onChange} date={field.value} />
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PostDateField;
