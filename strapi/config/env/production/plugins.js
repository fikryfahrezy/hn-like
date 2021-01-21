module.exports = ({ env }) => ({
  // https://strapi.io/documentation/v3.x/plugins/email.html#programmatic-usage
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST"),
      port: env("SMTP_PORT"),
      auth: {
        user: env("SMTP_USERNAME"),
        pass: env("SMTP_PASSWORD"),
      },
    },
    settings: {
      defaultFrom: env("DEFAULT_FROM"),
      defaultReplyTo: env("DEFAULT_REPLY_TO"),
    },
  },
  //   https://strapi.io/documentation/v3.x/plugins/graphql.html#configurations
  graphql: {
    endpoint: "/graphql",
    tracing: true,
    shadowCRUD: true,
    playgroundAlways: true,
    depthLimit: 7,
    amountLimit: 100,
  },
  // https://www.npmjs.com/package/strapi-provider-upload-cloudinary
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
