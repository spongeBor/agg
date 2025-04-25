export default {};
/*
 * @lc app=leetcode.cn id=112 lang=typescript
 * @lcpr version=30104
 *
 * [112] 路径总和
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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // return recursiveSample(root, targetSum);
  if (!root) return false;
  return recursive(root, targetSum - root.val);
}

function recursive(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false; // 空节点
  if (!root.left && !root.right && targetSum === 0) return true; // 叶子节点且路径和为0
  if (!root.left && !root.right) return false; // 叶子节点且路径和不为0
  if (root.left) {
    targetSum -= root.left.val; // 减去左子节点的值
    if (recursive(root.left, targetSum)) return true; // 递归判断左子节点
    targetSum += root.left.val; // 回溯
  }
  if (root.right) {
    targetSum -= root.right.val; // 减去右子节点的值
    if (recursive(root.right, targetSum)) return true; // 递归判断右子节点
    targetSum += root.right.val; // 回溯
  }
  return false;
}

function recursiveSample(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return (
    recursiveSample(root.left, targetSum - root.val) ||
    recursiveSample(root.right, targetSum - root.val)
  );
}

function iterative(root: TreeNode | null, targetSum: number): boolean {
  // TODO:
  return false;
}
// @lc code=end

/*
// @lcpr case=start
// [5,4,8,11,null,13,4,7,2,null,null,null,1]\n22\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n5\n
// @lcpr case=end

// @lcpr case=start
// []\n0\n
// @lcpr case=end

 */
