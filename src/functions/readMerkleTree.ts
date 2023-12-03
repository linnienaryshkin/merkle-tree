import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Config } from '../config';
import { s3Client } from '../s3';
import { MerkleTree } from '../merkleTree';

const readMerkleTree: APIGatewayProxyHandlerV2 = async ({ pathParameters }) => {
  try {
    // TODO: Add validation for the pathParameters, and don't use  '' as default value :)
    const index = Number(pathParameters?.index);

    const tree = await readMerkleTreeS3();
    const node = tree[index];

    if (!node) {
      return { statusCode: 404, body: 'Not Found' };
    }

    const response = {
      value: node.value,
      depth: 2,
      offset: 2,
    };

    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: String(error) };
  }
};

const readMerkleTreeS3 = async () => {
  const command = new GetObjectCommand({ Bucket: Config.MERKLE_TREE_BUCKET, Key: Config.MERKLE_TREE_S3_KEY });
  const { Body } = await s3Client.send(command);
  const str = await Body?.transformToString();

  // TODO: Add validation for the MerkleTree
  return JSON.parse(str ?? '{}') as unknown as MerkleTree;
};

// I do this `handler = readMerkleTree` as a habit, because in most cases we want to apply some middlewares to the handler before exporting
export const handler = readMerkleTree;
