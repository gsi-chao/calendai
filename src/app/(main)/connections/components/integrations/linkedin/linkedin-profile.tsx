import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { LinkedinProfileType } from "@/lib/server/integrations/linkedin/type";
import Image from "next/image";

const LinkedinProfile = ({ profile }: { profile: LinkedinProfileType}) => {
  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle>LinkedIn Profile</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 flex justify-center items-start flex-col">
        <Image
        className="rounded-full"
          src={profile.picture}
          width={150}
          height={150}
          alt={profile.name}
        />
        <p className="text-xl text-gray-700 font-medium">{profile.name}</p>
        <p >{profile.email}</p>
      </CardContent>
      <CardFooter>
        <Button>Disconnect</Button>
      </CardFooter>
    </Card>
  );
};

export default LinkedinProfile;
