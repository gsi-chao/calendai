import { Separator } from "@/components/ui/separator";
import { SocialIntegration } from "@/lib/server/types/social-integration";
import React from "react";
import IntegrationList from "../components/integrations/integration-list";
import SocialProvidersList from "../components/integrations/social-providers-list";

type Props = {
  integrations: SocialIntegration[];
};

const ConnectionContainer: React.FC<Props> = ({ integrations }) => {
  return (
    <div className="h-full w-full overflow-y-auto gap-4 flex flex-col ">
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-xl text-gray-800 font-medium dark:text-white">
          Social Network Connections
        </h2>
        <span className="text-md text-gray-700 dark:text-white">
          Connect your Social Networks to schedule your content publication
        </span>
        <Separator className="my-3" />
      </div>

      <IntegrationList integrations={integrations} />
      <Separator className="h-[1px] my-4" />
      <SocialProvidersList
        activeIntegrations={integrations.map(
          (integration) => integration.provider
        )}
      />
    </div>
  );
};

export default ConnectionContainer;
