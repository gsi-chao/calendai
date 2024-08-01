import { SocialProviders } from "@/lib/server/db/schemas/social-integration";
import FacebookButton from "./facebook/facebook-button";
import LinkedinButton from "./linkedin/linkendin-button";

type Props = {
  activeIntegrations: SocialProviders[];
};

const integrations: SocialProviders[] = ["linkedin", "facebook"];

const SocialProvidersList: React.FC<Props> = ({ activeIntegrations }) => {
  const getSocialButtons = (provider: SocialProviders) => {
    switch (provider) {
      case "linkedin":
        return <LinkedinButton />;
      case "facebook":
        return <FacebookButton />;
      default:
        return null;
    }
  };

  if (activeIntegrations.length === integrations.length) {
    return null;
  }

  return (
    <div className="flex justify-start items-start gap-2 flex-col">
      <h3 className="text-lg text-gray-800 font-medium dark:text-white">
        Available Connections
      </h3>
      {integrations
        .filter((integration) => !activeIntegrations.includes(integration))
        .map((key, index) => (
          <div
            key={`${key}-${index}`}
            className="h-24 w-auto rounded-md border bg-card text-card-foreground shadow-sm p-4 flex justify-center items-center"
          >
            {getSocialButtons(key)}
          </div>
        ))}
    </div>
  );
};

export default SocialProvidersList;
