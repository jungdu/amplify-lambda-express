import AWS from "aws-sdk";
import * as config from "../../config.json";

export class S3ctrl {
  bucketName: string = config.bucketName;
  maxKeys: number = 100;
  s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3();
  }

  getImages(): Promise<(string | undefined)[]> {
    const params = {
      Bucket: this.bucketName,
      MaxKeys: this.maxKeys,
      Prefix: "img"
    };

    return new Promise((resolve, reject) => {
      this.s3
        .listObjects(params)
        .promise()
        .then(data => {
          if (data.Contents) {
            let imageKeys = data.Contents.filter(elem => {
              if (elem.Size && elem.Size > 0) {
                return true;
              } else {
                return false;
              }
            }).map(item => {
              return item.Key;
            });
            resolve(imageKeys);
          }
        });
    });
  }
}
