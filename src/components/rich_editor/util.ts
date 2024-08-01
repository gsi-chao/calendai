import {
    generateHTML,
    generateJSON,
    generateText,
    JSONContent,
} from "@tiptap/core";
import {
    AIHighlight,
    CharacterCount,
    HorizontalRule,
    Placeholder,
    StarterKit,
    TaskItem,
    TaskList,
    TiptapImage,
    TiptapLink,
    Twitter,
    UpdatedImage,
    Youtube,
} from "novel/extensions";

export const generateHtmlFromJson = (jsonContent: JSONContent): string => {
  return generateHTML(jsonContent, [
    StarterKit,
    Placeholder,
    CharacterCount,
    HorizontalRule,
    TaskList,
    TaskItem,
    TiptapLink,
    TiptapImage,
    UpdatedImage,
    Youtube,
    Twitter,
    AIHighlight,
  ]);
};

export const generateJsonFromHtml = (jsonContent: string): JSONContent => {
  return generateJSON(jsonContent, [
    StarterKit,
    Placeholder,
    CharacterCount,
    HorizontalRule,
    TaskList,
    TaskItem,
    TiptapLink,
    TiptapImage,
    UpdatedImage,
    Youtube,
    Twitter,
    AIHighlight,
  ]);
};

export const generateTextFromJson = (jsonContent: JSONContent): string => {
  return generateText(jsonContent, [
    StarterKit,
    Placeholder,
    CharacterCount,
    HorizontalRule,
    TaskList,
    TaskItem,
    TiptapLink,
    TiptapImage,
    UpdatedImage,
    Youtube,
    Twitter,
    AIHighlight,
  ]);
};
