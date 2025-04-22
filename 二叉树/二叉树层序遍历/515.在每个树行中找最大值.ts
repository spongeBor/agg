/*
 * @lc app=leetcode.cn id=515 lang=typescript
 * @lcpr version=30104
 *
 * [515] 在每个树行中找最大值
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

function largestValues(root: TreeNode | null): number[] {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const length = queue.length;
    let max = -Infinity;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      max = Math.max(max, node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    result.push(max);
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,3,2,5,3,null,9]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

 */
