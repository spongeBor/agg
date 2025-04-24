export default {};
/*
 * @lc app=leetcode.cn id=404 lang=typescript
 * @lcpr version=30104
 *
 * [404] 左叶子之和
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
function sumOfLeftLeaves(root: TreeNode | null): number {
  // return recursive(root);
  return iterative(root);
}
// 这道题与遍历顺序无关
function recursive(root: TreeNode | null): number {
  // 左节点存在，并且左节点的左右子节点为空
  if (root === null) return 0;
  let sum = 0;
  if (
    root.left !== null &&
    root.left.left === null &&
    root.left.right === null
  ) {
    sum += root.left.val;
  }
  sum += recursive(root.left);
  sum += recursive(root.right);
  return sum;
}

function iterative(root: TreeNode | null): number {
  if (root === null) return 0;
  const stk = [];
  stk.push(root);
  let sum = 0;
  while (stk.length) {
    const node = stk.pop();
    if (
      node.left !== null &&
      node.left.left === null &&
      node.left.right === null
    ) {
      sum += node.left.val;
    }
    if (node.right !== null) stk.push(node.right);
    if (node.left !== null) stk.push(node.left);
  }
  return sum;
}
// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
