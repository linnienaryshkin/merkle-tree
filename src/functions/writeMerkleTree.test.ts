import type { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { handler } from './writeMerkleTree';
import { s3Client } from '../s3';
import type { Context } from 'aws-lambda';

process.env.MERKLE_TREE_BUCKET = 'MERKLE_TREE_BUCKET';

describe('writeMerkleTree', () => {
  it('should write the merkle tree to S3 bucket', async () => {
    const output = {} as PutObjectCommandOutput;
    jest.spyOn(s3Client, 'send').mockResolvedValueOnce(output as never);
    const result = await handler(undefined, {} as Context, () => {});

    expect(result).toEqual(output);
  });
});
