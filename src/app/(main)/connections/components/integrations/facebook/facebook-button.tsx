"use client";

import { Button } from "@/components/ui/button";

const FacebookButton = () => {
  const linkFacebookAccount = async () => {
    console.log("Connect to Facebook");
  };
  return (
    <Button className="bg-blue-600" onClick={linkFacebookAccount}>
      Connect to Facebook
    </Button>
  );
};

export default FacebookButton;
