import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // lambda function

    const demolambda = new lambda.Function(this,'demologicalid',{
      handler:'lambda_function.lambda_handler',
      runtime: lambda.Runtime.PYTHON_3_9,
      code:lambda.Code.fromAsset('../services'),
      functionName:'democdklambda'
    })
    // cloud watch alaram
    const cloudwatchdemo = new cloudwatch.Alarm(this,'cloudwatchlogicalid',{
      evaluationPeriods:1,
      threshold:1,
      metric: demolambda.metricErrors()
    })
  }
}
