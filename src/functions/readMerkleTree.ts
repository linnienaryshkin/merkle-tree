import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Config } from '../config';
import { s3Client } from '../s3';
import { MerkleTree, MerkleTreeNode } from '../merkleTree';

const readMerkleTree: APIGatewayProxyHandlerV2 = async ({ pathParameters }) => {
  try {
    // TODO: Add validation for the pathParameters, and don't use  '' as default value :)
    const nodeIndex = Number(pathParameters?.nodeIndex);

    const tree = await readMerkleTreeS3();
    const node = tree[nodeIndex];

    if (!node) {
      return { statusCode: 404, body: 'Not Found' };
    }

    const response = {
      value: node.value,
      depth: calculateDepth(node),
      offset: node.offset, // TODO: Think on how to calculate offset, instead of hardcoding it into data
    };

    return { statusCode: 200, body: JSON.stringify(response) };
  } catch (error) {
    return { statusCode: 500, body: String(error) };
  }
};

const readMerkleTreeS3 = async (): Promise<MerkleTree> => {
  const command = new GetObjectCommand({ Bucket: Config.MERKLE_TREE_BUCKET, Key: Config.MERKLE_TREE_S3_KEY });
  const { Body } = await s3Client.send(command);
  const str = await Body?.transformToString();

  // TODO: Add validation for the MerkleTree
  return JSON.parse(str ?? '{}') as unknown as MerkleTree;
};

const calculateDepth = (node: MerkleTreeNode, depth = 0): number => {
  return node.parent ? calculateDepth(node.parent, depth + 1) : depth;
};

// I do this `handler = readMerkleTree` as a habit, because in most cases we want to apply some middlewares to the handler before exporting
export const handler = readMerkleTree;
