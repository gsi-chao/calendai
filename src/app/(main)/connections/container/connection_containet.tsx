"use client";

import { SocialIntegration } from "@/lib/server/types/social-integration";
import React from "react";
import LinkedinIntegration from "../components/integrations/linkedin/linkedin-integration";

type Props = {
  integrations: SocialIntegration[];
};

const ConnectionContainer: React.FC<Props> = ({ integrations }) => {
  const getIntegerations = (integration: SocialIntegration) => {
    switch (integration.provider) {
      case "linkedin":
        return <LinkedinIntegration credential={integration.accessToken} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      {integrations.map((integration, index) => (
        <div key={index}>{getIntegerations(integration)}</div>
      ))}
    </div>
  );
};

export default ConnectionContainer;
