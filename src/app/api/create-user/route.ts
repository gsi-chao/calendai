import { createCalendar } from "@/lib/server/services/calendar";
import { ClerkCreateUserEventType } from "@/lib/server/types/clerk/user";

export async function POST(request: Request): Promise<Response> {
  const data: ClerkCreateUserEventType = await request.json();
  try {
    await createCalendar(data.data.id);
    return Response.json({ success: true });
  } catch (e) {
    return new Response("Failed to create calendar", { status: 500 });
  }
}
