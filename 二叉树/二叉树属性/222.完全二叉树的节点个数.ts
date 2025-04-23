/*
 * @lc app=leetcode.cn id=222 lang=typescript
 * @lcpr version=30104
 *
 * [222] 完全二叉树的节点个数
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

function countNodes(root: TreeNode | null): number {
  //   return countNodesCommonR(root);
  //   return countNodesCommonIterative(root);
  return countNodesCompleteR(root);
}
/**
 * 所有二叉树的节点求法
 * 递归 O(n) 空间 O(logn)
 * @param root
 * @returns
 */
function countNodesCommonR(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + countNodesCommonR(root.left) + countNodesCommonR(root.right);
}

/**
 * 所有二叉树的节点求法
 * 迭代 O(n) 空间 O(n)
 * @param root
 * @returns
 */
function countNodesCommonIterative(root: TreeNode | null): number {
  // 层序遍历
  if (!root) return 0;
  const queue: TreeNode[] = [root];
  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return count;
}

function countNodesCompleteR(root: TreeNode | null): number {
  if (root === null) return 0;
  let left = root.left;
  let right = root.right;
  let leftDepth = 0;
  let rightDepth = 0;
  while (left) {
    left = left.left;
    leftDepth++;
  }
  while (right) {
    right = right.right;
    rightDepth++;
  }
  if (leftDepth === rightDepth) {
    return (2 << leftDepth) - 1;
  }
  return 1 + countNodesCompleteR(root.left) + countNodesCompleteR(root.right);
}
// @lc code=end
/*
// @lcpr case=start
// [1,2,3,4,5,6]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
