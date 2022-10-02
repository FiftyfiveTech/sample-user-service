import dotenv from "dotenv"

dotenv.config()

export default {
  development: {
    host: process.env.HOST,
    port: process.env.PORT || (8080 as number),
    databaseUri: process.env.DATABASE_URL as string,
    logger: { logLevel: "debug" },
    secret: process.env.SECRET,
    tokenExpiresIn: process.env.EXPIRESIN,
    graphqlPath: "/graphql",
    clientSecret: process.env.S3_CLIENT_SECRET as string,
    accessToken: process.env.S3_ACCESS_TOKEN as string,
    bucketRegion: process.env.S3_BUCKET_REGION as string,
    s3Bucket: process.env.S3_BUCKET_NAME as string
  },
};