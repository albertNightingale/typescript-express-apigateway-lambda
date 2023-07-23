import { Construct } from 'constructs';

import * as cdk from 'aws-cdk-lib';
// import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class AwsExpressStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const bucket = new s3.Bucket(this, "store");

    // lambda
    const handler = new lambda.Function(this, "backend-test-lambda", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("./compiled_code/src"),
      handler: "handler.handler",
      environment: {
        // BUCKET: bucket.bucketName
      }
    });
    // bucket.grantReadWrite(handler);

    // api gateway
    const api = new apigateway.RestApi(this, "backend-test-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration); // GET /
  }
}
