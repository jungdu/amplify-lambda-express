import express = require("express");
import { S3ctrl } from "./services/awsS3";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";

const s3ctrl = new S3ctrl();

// Create a new express application instance
const app: express.Application = express();

app.use(awsServerlessExpressMiddleware.eventContext());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/images", function(req, res) {
  s3ctrl.getImages().then(data => {
    res.send({
      images: data
    });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

export default app;
