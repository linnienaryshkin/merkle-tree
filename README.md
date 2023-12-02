# Merkle tree

This is an exercise done for an interview process. Read more about it in [TASK.md](./TASK.md)

> 💡 Merkle Trees are a very useful data storage tool which makes data verification and integrity checking efficient. They are widely used in the blockchain space. A binary Merkle tree is a specific case of a Merkle tree in which nodes have to 2 children.

## Deployment

1. [Authorization](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_auth) - follow guide, you need an active AWS access portal session for the AWS CDK.
2. [Bootstrapping](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_bootstrap) - Deploying stacks with the AWS CDK requires dedicated Amazon S3 buckets and other containers to be available to AWS CloudFormation during deployment.

After, you should be available to deploy.

- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with the current state
- `npx cdk synth` emits the synthesized CloudFormation template
