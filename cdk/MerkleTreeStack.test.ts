import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MerkleTreeStack } from './MerkleTreeStack';

test('should check general overview of the stack', () => {
  const app = new cdk.App();
  const stack = new MerkleTreeStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1);
});
