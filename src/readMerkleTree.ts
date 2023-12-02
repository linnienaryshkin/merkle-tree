import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const readMerkleTree: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify('body'),
  };
};

// I do this `handler = readMerkleTree` as a habit, because in most case we want to apply some middlewares to the handler before exporting
// And, I like to understand which method in front of me without looking onto file name.
export const handler = readMerkleTree;
