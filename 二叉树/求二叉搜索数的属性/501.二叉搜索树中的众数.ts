export default {};
/*
 * @lc app=leetcode.cn id=501 lang=typescript
 * @lcpr version=30104
 *
 * [501] 二叉搜索树中的众数
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

function findMode(root: TreeNode | null): number[] {
  // return recursive(root);
  return iterative(root);
}

// 一次遍历
function recursive(root: TreeNode | null) {
  const result: number[] = [];
  let count = 0;
  let maxCount = 0;
  let pre = null;
  const traverse = (root: TreeNode | null) => {
    if (!root) return;
    traverse(root.left);
    if (pre === null) {
      count = 1;
    } else if (pre === root.val) {
      count++;
    } else {
      count = 1;
    }
    pre = root.val;
    if (count > maxCount) {
      maxCount = count;
      result.length = 0;
      result.push(root.val);
    } else if (count === maxCount) {
      result.push(root.val);
    }
    traverse(root.right);
  };
  traverse(root);
  return result;
}

function iterative(root: TreeNode | null) {
  const result: number[] = [];
  let count = 0;
  let maxCount = 0;
  let pre = null;
  const stk = [];
  let cur = root;
  while (cur || stk.length) {
    if (cur) {
      stk.push(cur);
      cur = cur.left;
    } else {
      cur = stk.pop();
      if (pre === null) {
        count = 1;
      } else if (pre === cur.val) {
        count++;
      } else {
        count = 1;
      }
      pre = cur.val;
      if (count > maxCount) {
        maxCount = count;
        result.length = 0;
        result.push(cur.val);
      } else if (count === maxCount) {
        result.push(cur.val);
      }
      cur = cur.right;
    }
  }
  return result;
}

// @lc code=end

/*
// @lcpr case=start
// [1,null,2,2]\n
// @lcpr case=end

// @lcpr case=start
// [0]\n
// @lcpr case=end

 */
