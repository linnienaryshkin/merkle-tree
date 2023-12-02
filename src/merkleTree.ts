export interface MerkleTree {
  root: string;
  leaves: string[];
}

export const MerkleTreePreset: MerkleTree = {
  root: 'root',
  leaves: ['leaves'],
};
