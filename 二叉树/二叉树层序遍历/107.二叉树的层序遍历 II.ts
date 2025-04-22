/*
 * @lc app=leetcode.cn id=107 lang=typescript
 * @lcpr version=30104
 *
 * [107] 二叉树的层序遍历 II
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

// 102 的变种，只需要将结果反转即可
function levelOrderBottom(root: TreeNode | null): number[][] {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const length = queue.length;
    const arr = [];
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      arr.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    result.unshift(arr);
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
