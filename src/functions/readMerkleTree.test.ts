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
    const result = await handler({} as APIGatewayProxyEventV2, {} as Context, () => {});

    expect(result).toEqual({ statusCode: 200, body: '{"root":"root","leaves":["leaves"]}' });
  });

  it('should return 500 when error', async () => {
    jest.spyOn(s3Client, 'send').mockRejectedValueOnce(new Error('unexpected issue') as never);
    const result = await handler({} as APIGatewayProxyEventV2, {} as Context, () => {});

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
      { pathParameters: { index: '100' } } as unknown as APIGatewayProxyEventV2,
      {} as Context,
      () => {}
    );

    expect(result).toEqual({ statusCode: 404, body: 'Not Found' });
  });
});
