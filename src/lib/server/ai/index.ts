import {
    generateTagsSuggestions as googleGenerateTagsSuggestions,
    generateTitleSuggestions as googleGenerateTitleSuggestions,
} from "./google";

import {
    generateTagsSuggestions as llamaGenerateTagsSuggestions,
    generateTitleSuggestions as llamaGenerateTitleSuggestions,
} from "./groq";

export const models = {
  gemini: {
    generateTagSuggestion: googleGenerateTagsSuggestions,
    generateTitleSuggestion: googleGenerateTitleSuggestions,
  },
  llama: {
    generateTagSuggestion: llamaGenerateTagsSuggestions,
    generateTitleSuggestion: llamaGenerateTitleSuggestions,
  },
};
