export default {};
/*
 * @lc app=leetcode.cn id=530 lang=typescript
 * @lcpr version=30104
 *
 * [530] 二叉搜索树的最小绝对差
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

function getMinimumDifference(root: TreeNode | null): number {
  // return recursive(root);
  return iterative(root);
}

function recursive(root: TreeNode | null) {
  let min = Infinity;
  let pre = null;
  const traverse = (root: TreeNode | null) => {
    if (!root) return;
    traverse(root.left);
    if (pre !== null) {
      min = Math.min(min, root.val - pre.val);
    }
    pre = root;
    traverse(root.right);
  };
  traverse(root);
  return min;
}

function iterative(root: TreeNode | null) {
  let min = Infinity;
  let pre = null;
  const stk = [];
  let cur = root;
  while (cur || stk.length) {
    if (cur) {
      stk.push(cur);
      cur = cur.left;
    } else {
      cur = stk.pop();
      if (pre !== null) {
        min = Math.min(min, cur.val - pre.val);
      }
      pre = cur;
      cur = cur.right;
    }
  }
  return min;
}
// @lc code=end

/*
// @lcpr case=start
// [4,2,6,1,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,0,48,null,null,12,49]\n
// @lcpr case=end

 */
