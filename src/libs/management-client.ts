import { createClient } from "contentful-management";

const plainClient = createClient(
  {
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN || "",
  },
  { type: "plain" },
);

export default plainClient;
