import { UnprocessableEntityException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { MediaObject } from './entities/media-object.entity';

interface UploadToBucketProps {
  file: Express.Multer.File;
  mediaType: string;
  type: string;
  typeId?: number;
  subtype?: string;
  key: string;
}

export class MediaObjectManager {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async deleteImage(key: string) {
    await this.deleteFile(key);
    await MediaObject.delete({ key });
  }

  protected async deleteFile(key: string) {
    if (!key) {
      throw new UnprocessableEntityException('Key is required');
    }

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        },
        (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(data);
        },
      );
    });
  }

  protected async uploadToS3bucket(props: UploadToBucketProps) {
    try {
      return new Promise((resolve, reject) => {
        this.s3.upload(
          {
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: props.file.buffer,
            Key: props.key,
            // ACL: 'public-read',
            ContentType: props.file.mimetype,
          },
          function (err, data) {
            if (err) {
              reject(new UnprocessableEntityException(err));
              return;
            }

            const resource = new MediaObject();
            resource.key = data.Key;
            resource.type = props.type;
            resource.typeId = props.typeId;
            resource.subtype = props.subtype;
            resource.originalFileName = props.file.originalname;
            resource.key = props.key;
            resource.storageDetails = data;
            resource.fileSize = props.file.size;
            resource.mimeType = props.file.mimetype;
            resource.mediaType = props.mediaType;
            resource
              .save()
              .then(() => {
                resolve({
                  key: data.Key,
                  url: data.Location,
                  mediaObject: resource,
                });
              })
              .catch((err) => {
                reject(err);
              });
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async updateTypeId(key: string, typeId: number) {
    const obj = await MediaObject.findOne({
      where: {
        key: key,
      },
    });
    if (!obj) {
      throw new UnprocessableEntityException('Media object not found');
    }
    obj.typeId = typeId;
    await obj.save();
    return obj;
  }

  public async updateTypeIdWithId(id: number, typeId: number) {
    const obj = await MediaObject.findOneBy({ id: id });
    if (!obj) {
      throw new UnprocessableEntityException('Media object not found');
    }
    obj.typeId = typeId;
    await obj.save();
    return obj;
  }

  protected getMediaType(mimeType: string) {
    if (mimeType.startsWith('image/')) {
      return 'image';
    } else if (mimeType == 'application/pdf') {
      return 'pdf';
    }
    return 'unknown';
  }
}
