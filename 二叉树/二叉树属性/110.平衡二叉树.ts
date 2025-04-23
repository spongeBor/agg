/*
 * @lc app=leetcode.cn id=110 lang=typescript
 * @lcpr version=30104
 *
 * [110] 平衡二叉树
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
/**
 * 二叉树节点的深度：指从根节点到该节点的最长简单路径边的条数。
 * 二叉树节点的高度：指从该节点到叶子节点的最长简单路径边的条数。
 * 高度与深度的计算中，leetcode是以节点为单位，而不是边。
 * @param root
 */
function isBalanced(root: TreeNode | null): boolean {}

// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,2,3,3,null,null,4,4]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
