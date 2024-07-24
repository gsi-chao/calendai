import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (!isPublicRoute(req)) auth().protect();
  },
  { signInUrl: "/sign-in", signUpUrl: "/sign-up" }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
