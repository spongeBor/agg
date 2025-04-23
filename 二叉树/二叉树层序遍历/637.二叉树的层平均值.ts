export default {};
/*
 * @lc app=leetcode.cn id=637 lang=typescript
 * @lcpr version=30104
 *
 * [637] 二叉树的层平均值
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

function averageOfLevels(root: TreeNode | null): number[] {
  const result = [];
  const queue = [root];
  while (queue.length) {
    const length = queue.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      sum += node.val;
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(sum / length);
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [3,9,20,15,7]\n
// @lcpr case=end

 */
