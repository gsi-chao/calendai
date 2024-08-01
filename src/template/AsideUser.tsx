import { UserButton } from "@clerk/nextjs";

const AsideUser = () => {
  return <UserButton signInUrl="/sign-in" />;
};

export default AsideUser;
