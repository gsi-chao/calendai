import { inngest } from "@/lib/server/inngest/client";
import { createPost } from "@/lib/server/integrations/linkedin/post";
import { updateTaskStatus } from "@/lib/server/services/task";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");
    return { event, body: "Hello, World!" };
  }
);

export const publishNow = inngest.createFunction(
  { id: "publish-now" },
  { event: "calendai/publish.now" },
  async ({ event, step }) => {
    const {
      data: { postDate, content, userId, taskId },
    } = event;
    if (!postDate || !content || !userId || !taskId) {
      return { event, body: "Invalid Request!" };
    }
    await step.sleepUntil("wait-until-postDate", postDate);
    try {
      const post = await createPost(content, userId);
      // update task status
      await updateTaskStatus(taskId, "published");
      return { event, body: "Published Now!", data: post };
    } catch (e) {
      return { event, body: "Failed to publish!" };
    }
  }
);
