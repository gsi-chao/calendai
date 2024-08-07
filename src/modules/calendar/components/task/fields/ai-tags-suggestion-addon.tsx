import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magic } from "@/components/ui/icons";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { generateTagsTextSuggestions } from "@/lib/server/ai/google/generative";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { useCallback, useState } from "react";

type Props = {
  className?: string;
  enabled?: boolean;
  content: string;
  selectedTags?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
};

const AiTagsSuggestionAddon: React.FC<Props> = ({
  className,
  enabled,
  onSelectSuggestion,
  content,
  selectedTags,
}) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSuggestions = async () => {
    setLoading(true);
    const response = await generateTagsTextSuggestions(content);
    if (response && response.length > 0) {
      setSuggestions(response);
    }
    setLoading(false);
  };

  const isActiveTag = useCallback(
    (tag: string) => {
      return selectedTags?.includes(tag);
    },
    [selectedTags]
  );

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
            <h4 className="font-medium leading-none">AI Tags Suggestion</h4>
            {suggestions.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Pick a tag from the suggestions below.
              </p>
            )}
            <Button variant="outline" onClick={generateSuggestions}>
              {loading ? "Generating..." : "Generate tags suggestions"}{" "}
              <Magic className={cn("w-6 h-6", "text-blue-700 animate-pulse")} />
            </Button>
          </div>
          <div className="flex flex-wrap justify-start items-start gap-2 max-w-[350px]">
            {suggestions.map((suggestion, index) => (
              <Badge
                className={cn(
                  "cursor-pointer hover:shadow-sm hover:border hover:border-gray-500",
                  isActiveTag(suggestion) && "bg-blue-100 cursor-auto"
                )}
                variant="outline"
                key={index}
                onClick={() => {
                  if (!isActiveTag(suggestion)) {
                    onSelectSuggestion && onSelectSuggestion(suggestion);
                  }
                }}
              >
                {suggestion}
                {isActiveTag(suggestion) && (
                  <Check className="pl-2 w-4 h-4 text-blue-700" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AiTagsSuggestionAddon;
