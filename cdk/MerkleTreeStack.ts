import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export class MerkleTreeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const MerkleTreeBucket = new s3.Bucket(this, 'MerkleTreeBucket', {
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Since S3 is our master storage system, let's be explicit that it need to be retained no matter what
      autoDeleteObjects: false,
      bucketKeyEnabled: false, // Since data is public, we don't need to encrypt it
      versioned: false, // I believe only the latest version make sense, but we could consider that as improvement
      publicReadAccess: false, // Let's be explicit - only aws lambdas have access to the bucket
    });

    // TODO: Lambda for initial write merkle-tree into MerkleTreeBucket
    MerkleTreeBucket;
    // TODO: Lambda for reading merkle-tree from MerkleTreeBucket
    // TODO: API endpoint to read index of merkle-tree
  }
}
