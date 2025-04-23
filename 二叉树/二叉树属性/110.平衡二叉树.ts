export default {};
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
 * 要求高度，则需要从叶子节点开始计算，叶子节点的高度为0，然后向上计算，直到根节点。必然是后序遍历。
 * @param root
 */
function isBalanced(root: TreeNode | null): boolean {
  return Recursive(root);
}

function Recursive(root: TreeNode | null): boolean {
  function getHeight(node: TreeNode | null): number {
    if (!node) return 0;
    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1;
    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return Math.max(leftHeight, rightHeight) + 1;
  }
  return getHeight(root) !== -1;
}

/**
 * 迭代法
 * 没有很好的模拟回溯，效率低
 * 回溯法其实就是递归，但是很少人用迭代的方式去实现回溯算法
 * @param root
 */
function Iterative(root: TreeNode | null): boolean {
  // TODO: 等写熟练了深度遍历的迭代算法回来做
}
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
