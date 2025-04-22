/*
 * @lc app=leetcode.cn id=94 lang=typescript
 * @lcpr version=30104
 *
 * [94] 二叉树的中序遍历
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

function inorderTraversal(root: TreeNode | null): number[] {
  //   return inorderTraversalRecursive(root);
  return inorderTraversalIterative(root);
}
function inorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = [];
  function traverse(node: TreeNode | null) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

function inorderTraversalIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stk = [];
  let cur = root;
  while (cur || stk.length) {
    if (cur) {
      stk.push(cur);
      cur = cur.left;
    } else {
      cur = stk.pop();
      result.push(cur.val);
      cur = cur.right;
    }
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,null,2,3]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
