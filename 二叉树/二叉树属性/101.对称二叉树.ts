/*
 * @lc app=leetcode.cn id=101 lang=typescript
 * @lcpr version=30104
 *
 * [101] 对称二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSymmetric(root: TreeNode | null): boolean {
  return isSymmetricRecursive(root);
  // return isSymmetricIterative(root);
}

function isSymmetricRecursive(root: TreeNode | null): boolean {
  if (root === null) return true;
  function traverse(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left === null && right === null) return true;
    if (left === null || right === null) return false;
    return (
      left.val === right.val &&
      traverse(left.left, right.right) &&
      traverse(left.right, right.left)
    );
  }
  return traverse(root.left, root.right);
}

function isSymmetricIterative(root: TreeNode | null): boolean {
  if (root === null) return true;
  const queue: TreeNode[] = [root.left, root.right];
  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();
    if (left === null && right === null) continue;
    if (left === null || right === null) return false;
    if (left.val !== right.val) return false;
    queue.push(left.left, right.right);
    queue.push(left.right, right.left);
  }
  return true;
}

// @lc code=end

/*
// @lcpr case=start
// [1,2,2,3,4,4,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,2,null,3,null,3]\n
// @lcpr case=end

 */
