"use client";

import { Button } from "@/components/ui/button";
import { connectToLinkedIn } from "@/lib/server/integrations/linkedin/oauth";
import { Linkedin } from "lucide-react";

const LinkedinButton = () => {
  const linkLinkedinAccount = async () => {
    await connectToLinkedIn();
  };
  return (
    <Button className="bg-blue-600" onClick={linkLinkedinAccount}>
      Connect to LinkedIn <Linkedin className="h-4 w-4 pl-2" />
    </Button>
  );
};

export default LinkedinButton;
