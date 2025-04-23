export default {};
/*
 * @lc app=leetcode.cn id=111 lang=typescript
 * @lcpr version=30104
 *
 * [111] 二叉树的最小深度
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

function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length) {
    const length = queue.length;
    depth++;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (!node.left && !node.right) return depth; // 叶子节点 才是最小深度
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
}
// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [2,null,3,null,4,null,5,null,6]\n
// @lcpr case=end

 */
