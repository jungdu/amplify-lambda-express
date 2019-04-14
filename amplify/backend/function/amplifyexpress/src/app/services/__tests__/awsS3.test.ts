import { S3ctrl } from "../awsS3";

const s3ctrl = new S3ctrl();

describe("S3 Test", () => {
  it("Bucket exists", done => {
    s3ctrl.s3
      .listBuckets()
      .promise()
      .then(data => {
        expect(data.Buckets && data.Buckets.length > 0).toBe(true);
        done();
      });
  });

  it("Item exists", done => {
    s3ctrl.getImages().then(data => {
      done();
    });
  });
});
