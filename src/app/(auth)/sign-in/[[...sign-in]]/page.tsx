import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen w-screen grid place-content-center bg-gradient-to-tl from-slate-300 to-white">
      <SignIn path="/sign-in" />
    </div>
  );
}
