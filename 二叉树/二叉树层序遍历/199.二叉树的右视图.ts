/*
 * @lc app=leetcode.cn id=199 lang=typescript
 * @lcpr version=30104
 *
 * [199] 二叉树的右视图
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

function rightSideView(root: TreeNode | null): number[] {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (i === length - 1) result.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,null,5,null,4]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,null,null,null,5]\n
// @lcpr case=end

// @lcpr case=start
// [1,null,3]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
