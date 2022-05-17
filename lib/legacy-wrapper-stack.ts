import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import composeApiGateway from './functions/composeApiGateway'
import config from '../src/config'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LegacyWrapperStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "WidgetStore");

    const handler = new lambda.NodejsFunction(this, "RoutesHandler", {
      entry: './src/handler.ts',
      handler: "handler",
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler);

    const lambdaIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: {"application/json": '{ "statusCode": "200" }'}
    });

    const api = new apigateway.RestApi(this, "legacy-wrapper-api", {
      restApiName: "Legacy Wrapper Service  (LWS)",
      description: "This service transforms legacy requests to the cloud API."
    });

    // add routes to API Gateway
    composeApiGateway(config[0], api.root, lambdaIntegration)

    // example resource
    // const queue = new sqs.Queue(this, 'LegacyWrapperQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
