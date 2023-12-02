import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class MerkleTreeStack extends cdk.Stack {
  private runtime = lambda.Runtime.NODEJS_18_X; // Used 18 just because it's how in my current production project :)

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * TODO: If we go production with it - highly recommended to split stateless and stateful resources into different stacks
     * By that, this MerkleTreeBucket bucket should be move to the stateful stack
     */
    const MerkleTreeBucket = new s3.Bucket(this, 'MerkleTreeBucket', {
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Since S3 is our master storage system, let's be explicit that it need to be retained no matter what
      autoDeleteObjects: false,
      bucketKeyEnabled: false, // Since data is public, we don't need to encrypt it
      versioned: false, // I believe only the latest version make sense, but we could consider that as improvement
      publicReadAccess: false, // Let's be explicit - only aws lambdas have access to the bucket
    });

    const api = new apigateway.RestApi(this, 'api');

    const environment = {
      MERKLE_TREE_BUCKET: MerkleTreeBucket.bucketName,
    };

    {
      const readMerkleTree = new nodejs.NodejsFunction(this, `${this.stackName}-readMerkleTree`, {
        functionName: `${this.stackName}-readMerkleTree`, // I like just by looking onto lambda name understand which stack it belongs to
        entry: 'src/functions/readMerkleTree.ts',
        runtime: this.runtime,
        environment,
        memorySize: 10240, // Just to stress out - current exercise allows read whole storage into memory - hence we use maximum allowed
      });

      MerkleTreeBucket.grantRead(readMerkleTree);
      api.root.addResource('merkle-tree').addMethod('GET', new apigateway.LambdaIntegration(readMerkleTree));
    }

    {
      const writeMerkleTree = new nodejs.NodejsFunction(this, `${this.stackName}-writeMerkleTree`, {
        functionName: `${this.stackName}-writeMerkleTree`,
        entry: 'src/functions/writeMerkleTree.ts',
        runtime: this.runtime,
        environment,
      });

      MerkleTreeBucket.grantWrite(writeMerkleTree);
    }
  }
}
