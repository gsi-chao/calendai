import { Button } from "@/components/ui/button";
import { LinkedinProfileType } from "@/lib/server/integrations/linkedin/type";
import { Unplug } from "lucide-react";
import Image from "next/image";

const LinkedinProfile = ({ profile }: { profile: LinkedinProfileType }) => {
  return (
    <div className="flex gap-x-4 w-auto h-44  rounded-md border bg-card text-card-foreground shadow-sm">
      <Image
        className="h-full w-auto rounded-l-md"
        src={profile.picture}
        width={150}
        height={150}
        alt={profile.name}
      />

      <div className="flex flex-col justify-between p-4">
        <h4 className="text-xl font-medium">LinkedIn Profile</h4>
        <span className="text-lg">{profile.name}</span>
        <span className="text-base">{profile.email}</span>
        <Button>
          Disconnect <Unplug className="w-6 h-6 pl-2" />
        </Button>
      </div>
    </div>
  );
};

export default LinkedinProfile;
