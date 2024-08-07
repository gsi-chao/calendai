import { inngest } from "@/lib/server/inngest/client";
import { serve } from "inngest/next";
import { publishNextPost, publishNow } from "./functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    publishNow, 
    publishNextPost
  ],
});