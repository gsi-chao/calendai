"use client";

import { getLinkedInProfile } from "@/lib/server/integrations/linkedin/profile";
import { LinkedinProfileType } from "@/lib/server/integrations/linkedin/type";
import React, { useEffect, useState } from "react";
import LinkedinProfile from "./linkedin-profile";
import LinkedinSkeleton from "./linkedin-skeleton";

type Props = {
  credential: string;
};

const LinkedinIntegration: React.FC<Props> = ({ credential }) => {
  const [profile, setProfile] = useState<LinkedinProfileType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getLinkedInProfile(credential);
      setProfile(response);
    };
    fetchProfile();
  }, [credential]);

  return (
    <>
      {profile ? <LinkedinProfile profile={profile} /> : <LinkedinSkeleton />}
    </>
  );
};

export default LinkedinIntegration;
