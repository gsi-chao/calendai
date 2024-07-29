import { InferSelectModel } from "drizzle-orm";
import SocialIntegrationTable from "../db/schemas/social-integration";

export type SocialIntegration = InferSelectModel<typeof SocialIntegrationTable>;
