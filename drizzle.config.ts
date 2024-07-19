import { defineConfig } from "drizzle-kit";
import "./drizzle/envConfig";

export default defineConfig({
    schema: "./src/server/db/schemas",
    out: "./src/server/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.POSTGRES_URL!,
    },
  });
