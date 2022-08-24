import { S3_ACCESS_KEY_ID, S3_ENDPOINT, S3_REGION, S3_SECRET_ACCESS_KEY } from "@/config";

const { S3Client } = require("@aws-sdk/client-s3");

export const s3Client = new S3Client({
    endpoint: S3_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: S3_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    // endpoint: "https://long-space.sgp1.digitaloceanspaces.com",

    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID, // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: S3_SECRET_ACCESS_KEY, // Secret access key defined through an environment variable.
    },
});