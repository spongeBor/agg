export default {};
/*
 * @lc app=leetcode.cn id=226 lang=typescript
 * @lcpr version=30104
 *
 * [226] 翻转二叉树
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

function invertTree(root: TreeNode | null): TreeNode | null {
  // return invertTreeRecursive(root);
  return invertTreeIterative(root);
}

function invertTreeRecursive(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTreeRecursive(root.left);
  invertTreeRecursive(root.right);
  return root;
}

function invertTreeIterative(root: TreeNode | null): TreeNode | null {
  if (root === null) return null;
  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    [node.left, node.right] = [node.right, node.left];
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [4,2,7,1,3,6,9]\n
// @lcpr case=end

// @lcpr case=start
// [2,1,3]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
