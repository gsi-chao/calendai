import { Button } from "@/components/ui/button";
import { Magic } from "@/components/ui/icons";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { generateTitleSuggestions } from "@/lib/server/ai/google/generative";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";

type Props = {
  className?: string;
  enabled?: boolean;
  content: string;
  onSelectSuggestion?: (suggestion: string) => void;
};

const AiSuggestionAddon: React.FC<Props> = ({
  className,
  enabled,
  onSelectSuggestion,
  content,
}) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = async () => {
    setLoading(true);
    const response = await generateTitleSuggestions(content);
    if (response && response.length > 0) {
      setSuggestions(response);
    }
    setLoading(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(className, "h-8 px-2")}
          tabIndex={1}
          disabled={!enabled}
          variant="ghost"
          onClick={() => setOpen(true)}
        >
          <Magic
            className={cn(
              "w-6 h-6",
              enabled ? "text-blue-700 animate-pulse" : "text-gray-500"
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-max min-w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">AI Title Suggestion</h4>
            {suggestions.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Select a title from the suggestions below.
              </p>
            )}
            <Button variant="outline" onClick={generateSuggestions}>
              {loading ? "Generating..." : "Generate 5 title suggestion"}{" "}
              <Magic className={cn("w-6 h-6", "text-blue-700 animate-pulse")} />
            </Button>
          </div>
          <div className="grid gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left"
                onClick={() => {
                  onSelectSuggestion && onSelectSuggestion(suggestion);
                  setOpen(false);
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiSuggestionAddon;
