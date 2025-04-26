export default {};
/*
 * @lc app=leetcode.cn id=700 lang=typescript
 * @lcpr version=30104
 *
 * [700] 二叉搜索树中的搜索
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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  // return recursiveSearch(root, val);
  return iterativeSearch(root, val);
}

function recursiveSearch(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;
  if (root.val === val) return root;
  if (root.val > val) return recursiveSearch(root.left, val);
  return recursiveSearch(root.right, val);
}

function iterativeSearch(root: TreeNode | null, val: number): TreeNode | null {
  while (root) {
    if (root.val === val) return root;
    if (root.val > val) root = root.left;
    else root = root.right;
  }
  return null;
}
// @lc code=end

/*
// @lcpr case=start
// [4,2,7,1,3]\n2\n
// @lcpr case=end

// @lcpr case=start
// [4,2,7,1,3]\n5\n
// @lcpr case=end

 */
