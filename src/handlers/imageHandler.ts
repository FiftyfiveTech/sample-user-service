import config from "../../config";
import AWS from "aws-sdk";
import bluebird from "bluebird";
import { error, RegExHelper, RegExStrings } from "../core/utils";
import { Buffer } from "buffer";

class ImageHandler {
  // The access key for aws.
  private static _ACCESS_TOKEN = config.development.accessToken;
  // The client secret.
  private static _CLIENT_SECRET = config.development.clientSecret;
  // The aws region in which the bucket is kept.
  private static _AWS_REGION = config.development.bucketRegion;
  // The bucket name.
  private static _S3_BUCKET = config.development.s3Bucket;

  // The singleton S3 bucket instance.
  private s3Bucket: AWS.S3;

  constructor() {
    this.configureAWS();

    this.s3Bucket = new AWS.S3();
  }

  /**
   * Create a S3 instance for the image handler.
   */
  private configureAWS() {
    AWS.config.setPromisesDependency(bluebird);
    AWS.config.update({
      accessKeyId: ImageHandler._ACCESS_TOKEN,
      secretAccessKey: ImageHandler._CLIENT_SECRET,
      region: ImageHandler._AWS_REGION,
    });
  }

  /**
   * Upload an image data in `base64` to an `S3` bucket.
   * @param key A key to store the image against.
   * @param data Image data in `base64`.
   * @returns A key and location for the uploaded image.
   */
  uploadImage: (
    key: string,
    data: string
  ) => Promise<{ key: string; location: string }> = async (key, data) => {
    const base64Data = Buffer.from(
      data.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = this.getMimeType(data)?.extension;
    const params = {
      Bucket: ImageHandler._S3_BUCKET,
      Key: `profile-images/${key}.${type}`,
      Body: base64Data,
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    let response = { key: "", location: "" };
    try {
      const { Location, Key } = await this.s3Bucket.upload(params).promise();
      response.location = Location;
      response.key = Key;
    } catch {
      throw error.createError(error.ErrorCode.UNKNOWN);
    }

    return response;
  };

  /**
   * Upload multiple images to the server.
   * @param dataList A list of `id, image` pairs to upload.
   * @returns A `Promise` with a list of ids and paths of newly added images.
   */
  uploadImages: (
    dataList: { id: string; image: string }[]
  ) => Promise<{ id: string; uri: string }[]> = async (dataList) => {
    return await Promise.all(
      dataList.map(async (data) => ({
        id: data.id,
        uri: (await this.uploadImage(data.id, data.image)).location,
      }))
    );
  };

  /**
   * Check if the given string as an image is indeed a base64 image string.
   * @param image A given base64 image string.
   * @returns A boolean value indicating.
   */
  isBase64Image: (image: string) => boolean = (image) => {
    const regExHelper = new RegExHelper();
    const data = regExHelper.validateRegex(
      RegExStrings.BASE64_IMAGE_STRING_REGEX,
      image
    );
    return data;
  };

  /**
   * If the image is indeed base 64 encoded, the return `mimeType` for the image.
   * @param image The image to get mime type
   * @returns The mime type and extension of the image.
   */
  getMimeType: (image: string) => { type: string; extension: string } | null = (
    image
  ) => {
    if (!this.isBase64Image(image)) {
      return null;
    }

    try {
      const mimeType: string = image.split(",")[0].split(":")[1].split(";")[0];
      const extension: string = mimeType.split("/")[1];
      return { type: mimeType, extension: extension };
    } catch {
      return null;
    }
  };

  /**
   * Get the AWS 3S bucket URL for an image and a key.
   * @param key The key against which the image should be saved.
   * @param image The image for which we need to get a URL.
   * @returns A string url.
   */
  getImageURL: (key: string, image: string) => string = (key, image) => {
    const extension = this.getMimeType(image)?.extension;
    return `https://${ImageHandler._S3_BUCKET}.s3.${ImageHandler._AWS_REGION}.amazonaws.com/profile-images/${key}.${extension}`;
  };
}

export { ImageHandler };
