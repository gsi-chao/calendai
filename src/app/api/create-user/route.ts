import { createCalendar } from "@/lib/server/services/calendar";
import { ClerkCreateUserEventType } from "@/lib/server/types/clerk/user";

export async function POST(request: Request): Promise<Response> {
  
  try {
    const data: ClerkCreateUserEventType = await request.json();
    console.log('clerk data', data);
    const response = await createCalendar(data.data.id);
    console.log('calendar data', response);
    return Response.json({ success: true });
  } catch (e) {
    return new Response("Failed to create calendar", { status: 500 });
  }
}
