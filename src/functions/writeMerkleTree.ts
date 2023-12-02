import type { Handler } from 'aws-lambda';
import { Config } from '../config';
import { s3Client } from '../s3';
import { PutObjectCommand, type PutObjectCommandOutput } from '@aws-sdk/client-s3';

import { MerkleTreePreset } from '../merkleTree';

const writeMerkleTree: Handler<unknown, PutObjectCommandOutput> = async () => {
  const command = new PutObjectCommand({
    Bucket: Config.MERKLE_TREE_BUCKET,
    Key: Config.MERKLE_TREE_S3_KEY,
    Body: JSON.stringify(MerkleTreePreset),
  });

  return s3Client.send(command);
};

export const handler = writeMerkleTree;
