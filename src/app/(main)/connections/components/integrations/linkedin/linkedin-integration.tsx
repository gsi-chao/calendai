"use client";

import { Button } from "@/components/ui/button";
import { connectToLinkedIn } from "@/lib/server/integrations/linkedin/oauth";
import { getLinkedInProfile } from "@/lib/server/integrations/linkedin/profile";
import { LinkedinProfileType } from "@/lib/server/integrations/linkedin/type";
import { Linkedin } from "lucide-react";
import React, { useEffect, useState } from "react";
import LinkedinProfile from "./linkedin-profile";

type Props = {
  credential: string;
};

const LinkedinIntegration: React.FC<Props> = ({ credential }) => {
  const [profile, setProfile] = useState<LinkedinProfileType | null>(null);
  const linkLinkedinAccount = async () => {
    await connectToLinkedIn();
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getLinkedInProfile(credential);
      setProfile(response);
    };
    fetchProfile();
  }, [credential]);

  return (
    <>
      {profile ? (
        <LinkedinProfile profile={profile} />
      ) : (
        <Button className="bg-blue-600" onClick={linkLinkedinAccount}>
          Connect to LinkedIn <Linkedin className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default LinkedinIntegration;
