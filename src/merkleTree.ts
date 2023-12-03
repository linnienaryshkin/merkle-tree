import { createHash } from 'crypto';

const hash = createHash('sha256');
console.log(hash.digest('hex'));

export type MerkleTreeNode = {
  parent?: MerkleTreeNode;
  left?: MerkleTreeNode;
  right?: MerkleTreeNode;

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
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('7').digest('hex'),
};
const node8: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('8').digest('hex'),
};
const node9: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('9').digest('hex'),
};
const node10: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('10').digest('hex'),
};
const node11: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('11').digest('hex'),
};
const node12: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('12').digest('hex'),
};
const node13: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('13').digest('hex'),
};
const node14: MerkleTreeNode = {
  parent: undefined,
  left: undefined,
  right: undefined,
  value: createHash('sha256').update('14').digest('hex'),
};

// Intermediate nodes
const node6: MerkleTreeNode = {
  parent: undefined,
  left: node13,
  right: node14,
  value: createHash('sha256').update(node13.value).update(node14.value).digest('hex'),
};
const node5: MerkleTreeNode = {
  parent: undefined,
  left: node11,
  right: node12,
  value: createHash('sha256').update(node11.value).update(node12.value).digest('hex'),
};
const node4: MerkleTreeNode = {
  parent: undefined,
  left: node9,
  right: node10,
  value: createHash('sha256').update(node9.value).update(node10.value).digest('hex'),
};
const node3: MerkleTreeNode = {
  parent: undefined,
  left: node7,
  right: node8,
  value: createHash('sha256').update(node7.value).update(node8.value).digest('hex'),
};
const node2: MerkleTreeNode = {
  parent: undefined,
  left: node5,
  right: node6,
  value: createHash('sha256').update(node5.value).update(node6.value).digest('hex'),
};
const node1: MerkleTreeNode = {
  parent: undefined,
  left: node3,
  right: node4,
  value: createHash('sha256').update(node3.value).update(node4.value).digest('hex'),
};

// Root node
const node0: MerkleTreeNode = {
  parent: undefined,
  left: node1,
  right: node2,
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
