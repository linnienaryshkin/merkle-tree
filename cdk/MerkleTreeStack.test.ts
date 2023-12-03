import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MerkleTreeStack } from './MerkleTreeStack';

const context = {
  // Disable bundling functions, to speed up testing
  'aws:cdk:bundling-stacks': [],
  // But if you want check bundle size - use `cdk synth` command
};

test('should check general overview of the stack', () => {
  const app = new cdk.App({ context });
  const stack = new MerkleTreeStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 1); // TODO: Write a test that will ensure that bucket id isn't changed
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::ApiGateway::Method', 1);
  template.resourceCountIs('AWS::Lambda::Function', 2);
});
