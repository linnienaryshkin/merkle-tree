import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const writeMerkleTree: APIGatewayProxyHandlerV2 = async () => {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify('body'),
  };
};

export const handler = writeMerkleTree;
