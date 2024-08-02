"use client";

import AdvanceEditor from "@/components/rich_editor/advance-editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import AiTagsSuggestionAddon from "../fields/ai-tags-suggestion-addon";
import AiTitleSuggestionAddon from "../fields/ai-title-suggestion-addon";
import PostDateField from "../fields/post-date";
import TaskFormSubmitButton from "./task-form-submit-button";
import { TaskFormType } from "./task-schema";

type Props = {
  onSubmitTask: (values: TaskFormType) => void;
  isSubmitting: boolean;
};

const TaskForm: React.FC<Props> = ({ onSubmitTask, isSubmitting }) => {
  const form = useFormContext<TaskFormType>();
  const [content, tags, postDate] = form.watch(["content", "tags", "postDate"]);
  function onSubmit(values: TaskFormType) {
    onSubmitTask(values);
  }

  const addTagsSuggetions = async (suggestion: string) => {
    const tags = form.getValues("tags");
    const newTags = tags ? `${tags},${suggestion}` : suggestion;
    form.setValue("tags", newTags.toLowerCase());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-2"
        id="task-form"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <AdvanceEditor
                  onChange={field.onChange}
                  initialValue={field.value}
                />
              </FormControl>
              <FormDescription>You can use markdown format</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Write your title or use the AI generation tool"
                    {...field}
                  />
                  <AiTitleSuggestionAddon
                    className="absolute right-2 top-1"
                    enabled={content.length > 100}
                    content={content}
                    onSelectSuggestion={(suggestion) => {
                      form.setValue("title", suggestion);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter the title of the task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="tags" {...field} />
                  <AiTagsSuggestionAddon
                    className="absolute right-2 top-1"
                    enabled={content.length > 100}
                    content={content}
                    onSelectSuggestion={addTagsSuggetions}
                    selectedTags={tags?.split(",") ?? []}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter the tags separated by coma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="https://image.com" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PostDateField
          control={form.control}
          name="postDate"
          label="Post Date"
        />
        <TaskFormSubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default TaskForm;
