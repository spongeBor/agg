export default {};
/*
 * @lc app=leetcode.cn id=144 lang=typescript
 * @lcpr version=30104
 *
 * [144] 二叉树的前序遍历
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

function preorderTraversal(root: TreeNode | null): number[] {
  // return preorderTraversalRecursive(root);
  return preorderTraversalIterative(root);
}

function preorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

function preorderTraversalIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  const stk: (TreeNode | null)[] = [];
  stk.push(root);

  while (stk.length) {
    const node = stk.pop();
    result.push(node.val);
    if (node.right) stk.push(node.right);
    if (node.left) stk.push(node.left);
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,null,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5,null,8,null,null,6,7,9]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
