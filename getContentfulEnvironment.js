const { loadEnvConfig } = require("@next/env");
const contentful = require("contentful-management");

module.exports = function () {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);

  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  });

  return client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
};
