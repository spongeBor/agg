export default {};
/*
 * @lc app=leetcode.cn id=654 lang=typescript
 * @lcpr version=30104
 *
 * [654] 最大二叉树
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

function constructMaximumBinaryTree(nums: number[]): TreeNode | null {
  // 最大二叉树定义
  // 1. 根节点是数组中最大的数
  // 2. 左子树是通过数组中最大值左边部分构造出的最大二叉树。
  // 3. 右子树是通过数组中最大值右边部分构造出的最大二叉树。
}
// @lc code=end

/*
// @lcpr case=start
// [3,2,1,6,0,5]\n
// @lcpr case=end

// @lcpr case=start
// [3,2,1]\n
// @lcpr case=end

 */
