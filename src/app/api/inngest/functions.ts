import { inngest } from "@/lib/server/inngest/client";
import { createPost } from "@/lib/server/integrations/linkedin/post";
import {
  getNextTaskToPublish,
  updateTaskStatus,
} from "@/lib/server/services/task";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");
    return { event, body: "Hello, World!" };
  }
);

export const publishNow = inngest.createFunction(
  {
    id: "publish-now",
    cancelOn: [
      {
        event: "tasks/reminder.deleted", // The event name that cancels this function
        // Ensure the cancelation event (async) and the triggering event (event)'s reminderId are the same:
        if: "async.data.taskId == event.data.taskId",
      },
    ],
  },

  { event: "calendai/publish.now" },
  async ({ event, step }) => {
    const {
      data: { postDate, content, userId, taskId },
    } = event;
    if (!postDate || !content || !userId || !taskId) {
      return { event, body: "Invalid Request!" };
    }
    await updateTaskStatus(taskId, "scheduled");
    await step.sleepUntil("wait-until-postDate", postDate);
    try {
      if ((process.env.NEXT_PUBLIC_ACTIVE_PUBLICATIONS === "true")) {
        const post = await createPost(content, userId);
        // update task status
        await updateTaskStatus(taskId, "published");
        return { event, body: "Published Now!", data: post };
      }

      return { event, body: "Mock Published Now!" };
    } catch (e) {
      await updateTaskStatus(taskId, "failed");
      return { event, body: "Failed to publish!" };
    }
  }
);

export const publishNextPost = inngest.createFunction(
  {
    id: "publish-next-post",
  },
  {
    //run each 2 hours
    cron: "TZ=UTC */2 * * * *",
  },
  async ({ event, step }) => {
    // get the next post to publish, all post must be in pending status
    // and postDate must Be less than or equal to 3 hours from now
    const nextPost = await getNextTaskToPublish(3);
    if (!nextPost) {
      return { event, body: "No post to publish" };
    }

    const events = nextPost.map((post) => {
      return {
        name: "calendai/publish.now",
        data: {
          postDate: post.postDate,
          content: post.plainContent,
          userId: post.createdBy,
          taskId: post.id,
        },
      };
    });

    // 2️⃣ Now, we'll send all events in a single batch:
    await step.sendEvent("send-digest-events", events);
  }
);
