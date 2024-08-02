import { inngest } from "@/lib/server/inngest/client";
import { createPost } from "@/lib/server/integrations/linkedin/post";

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
      data: { postDate, content, userId },
    } = event;
    if (!postDate || !content || !userId) {
      return { event, body: "Invalid Request!" };
    }
    await step.sleepUntil("wait-until-postDate", postDate);
    try {
      const post = await createPost(content, userId);
      return { event, body: "Published Now!", data: post };
    } catch (e) {
      return { event, body: "Failed to publish!" };
    }
  }
);
