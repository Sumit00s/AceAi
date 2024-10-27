import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts",
  dbCredentials: {
    url: "postgresql://aceai_owner:6GanPbOiYoM5@ep-red-silence-a5mweby8.us-east-2.aws.neon.tech/aceai?sslmode=require",
  },
});