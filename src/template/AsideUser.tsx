import { LogIn } from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const AsideUser = () => {
  return (
    <>
      <SignedOut >
        <SignInButton >
          <div className="rounded-full border border-slate-100 p-2 cursor-pointer hover:shadow-sm hover:border-slate-200">
            <LogIn className="" width={16} height={16} />
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton signInUrl="/sign-in" />
      </SignedIn>
    </>
  );
};

export default AsideUser;
