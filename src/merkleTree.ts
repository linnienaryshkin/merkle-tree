import { createHash } from 'crypto';

export type MerkleTreeNode = {
  parent?: MerkleTreeNode;
  offset: number;
  value: string; // Basically, hash here
};

export interface MerkleTree {
  [index: number]: MerkleTreeNode | undefined;
}

/**
 * You will find a hardcoded MerkleTreePreset below. Basically, we are following the preset
 * 0 --> 1
 * 0 --> 2
 * 1 --> 3
 * 1 --> 4
 * 2 --> 5
 * 2 --> 6
 * 3 --> 7
 * 3 --> 8
 * 4 --> 9
 * 4 --> 10
 * 5 --> 11
 * 5 --> 12
 * 6 --> 13
 * 6 --> 14
 */

// Leaf nodes
const node7: MerkleTreeNode = {
  offset: 7,
  value: createHash('sha256').update('7').digest('hex'),
};
const node8: MerkleTreeNode = {
  offset: 6,
  value: createHash('sha256').update('8').digest('hex'),
};
const node9: MerkleTreeNode = {
  offset: 5,
  value: createHash('sha256').update('9').digest('hex'),
};
const node10: MerkleTreeNode = {
  offset: 4,
  value: createHash('sha256').update('10').digest('hex'),
};
const node11: MerkleTreeNode = {
  offset: 3,
  value: createHash('sha256').update('11').digest('hex'),
};
const node12: MerkleTreeNode = {
  offset: 2,
  value: createHash('sha256').update('12').digest('hex'),
};
const node13: MerkleTreeNode = {
  offset: 1,
  value: createHash('sha256').update('13').digest('hex'),
};
const node14: MerkleTreeNode = {
  offset: 0,
  value: createHash('sha256').update('14').digest('hex'),
};

// Intermediate nodes
const node6: MerkleTreeNode = {
  offset: 3,
  value: createHash('sha256').update(node13.value).update(node14.value).digest('hex'),
};
const node5: MerkleTreeNode = {
  offset: 2,
  value: createHash('sha256').update(node11.value).update(node12.value).digest('hex'),
};
const node4: MerkleTreeNode = {
  offset: 1,
  value: createHash('sha256').update(node9.value).update(node10.value).digest('hex'),
};
const node3: MerkleTreeNode = {
  offset: 0,
  value: createHash('sha256').update(node7.value).update(node8.value).digest('hex'),
};

const node2: MerkleTreeNode = {
  offset: 1,
  value: createHash('sha256').update(node5.value).update(node6.value).digest('hex'),
};
const node1: MerkleTreeNode = {
  offset: 0,
  value: createHash('sha256').update(node3.value).update(node4.value).digest('hex'),
};

// Root node
const node0: MerkleTreeNode = {
  parent: undefined,
  offset: 0,
  value: createHash('sha256').update(node1.value).update(node2.value).digest('hex'),
};

// Set parents
node1.parent = node0;
node2.parent = node0;
node3.parent = node1;
node4.parent = node1;
node5.parent = node2;
node6.parent = node2;
node7.parent = node3;
node8.parent = node3;
node9.parent = node4;
node10.parent = node4;
node11.parent = node5;
node12.parent = node5;
node13.parent = node6;
node14.parent = node6;

// The final preset
export const MerkleTreePreset: MerkleTree = {
  0: node0,
  1: node1,
  2: node2,
  3: node3,
  4: node4,
  5: node5,
  6: node6,
  7: node7,
  8: node8,
  9: node9,
  10: node10,
  11: node11,
  12: node12,
  13: node13,
  14: node14,
};
