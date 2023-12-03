import type { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { handler } from './readMerkleTree';
import { s3Client } from '../s3';
import type { Context, APIGatewayProxyEventV2 } from 'aws-lambda';
import { MerkleTreePreset } from '../merkleTree';

process.env.MERKLE_TREE_BUCKET = 'MERKLE_TREE_BUCKET';

describe('readMerkleTree', () => {
  it('should write the merkle tree to S3 bucket', async () => {
    const output = {
      Body: {
        transformToString: jest.fn().mockResolvedValueOnce(JSON.stringify(MerkleTreePreset)),
      },
    } as unknown as GetObjectCommandOutput;
    jest.spyOn(s3Client, 'send').mockResolvedValueOnce(output as never);
    const result = await handler(
      { pathParameters: { nodeIndex: '10' } } as unknown as APIGatewayProxyEventV2,
      {} as Context,
      () => {}
    );

    expect(result).toEqual({
      statusCode: 200,
      body: '{"value":"4a44dc15364204a80fe80e9039455cc1608281820fe2b24f1e5233ade6af1dd5","depth":3,"offset":4}',
    });
  });

  it('should return 500 when error', async () => {
    jest.spyOn(s3Client, 'send').mockRejectedValueOnce(new Error('unexpected issue') as never);
    const result = await handler(
      { pathParameters: { nodeIndex: '10' } } as unknown as APIGatewayProxyEventV2,
      {} as Context,
      () => {}
    );

    expect(result).toEqual({ statusCode: 500, body: 'Error: unexpected issue' });
  });

  it('should return 404 when no node found', async () => {
    const output = {
      Body: {
        transformToString: jest.fn().mockResolvedValueOnce(JSON.stringify(MerkleTreePreset)),
      },
    } as unknown as GetObjectCommandOutput;
    jest.spyOn(s3Client, 'send').mockResolvedValueOnce(output as never);
    const result = await handler(
      { pathParameters: { nodeIndex: '100' } } as unknown as APIGatewayProxyEventV2,
      {} as Context,
      () => {}
    );

    expect(result).toEqual({ statusCode: 404, body: 'Not Found' });
  });
});
