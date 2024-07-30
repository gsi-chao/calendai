import { SocialIntegration } from "@/lib/server/types/social-integration";
import LinkedinIntegration from "./linkedin/linkedin-integration";

type Props = {
  integrations: SocialIntegration[];
};

const IntegrationList: React.FC<Props> = ({ integrations }) => {

  const getIntegerations = (integration: SocialIntegration) => {
    switch (integration.provider) {
      case "linkedin":
        return <LinkedinIntegration credential={integration.accessToken} />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <h3 className="text-lg text-gray-800 font-medium dark:text-white">Connected Networks</h3>
      {integrations.map((integration, index) => (
        <div key={index}>{getIntegerations(integration)}</div>
      ))}
    </div>
  );
};

export default IntegrationList;
