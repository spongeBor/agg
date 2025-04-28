export default {};
/*
 * @lc app=leetcode.cn id=669 lang=typescript
 * @lcpr version=30104
 *
 * [669] 修剪二叉搜索树
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

function trimBST(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  // return recursive(root, low, high);
  return iterative(root, low, high);
}

function recursive(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  if (root === null) return null;
  if (root.val < low) {
    return recursive(root.right, low, high); // 如果当前节点值小于low，则只保留右子树
  } else if (root.val > high) {
    return recursive(root.left, low, high); // 如果当前节点值大于high，则只保留左子树
  } else {
    root.left = recursive(root.left, low, high); // 接收左子树的返回值
    root.right = recursive(root.right, low, high); // 接收右子树的返回值
    return root;
  }
}

// 迭代法
function iterative(
  root: TreeNode | null,
  low: number,
  high: number
): TreeNode | null {
  if (!root) return null;
  // 处理头结点，让root移动到[L, R] 范围内，注意是左闭右开
  while (root !== null && (root.val < low || root.val > high)) {
    if (root.val < low) root = root.right;
    else root = root.left;
  }
  // 此时root已经在[L, R] 范围内，处理左孩子元素小于L的情况
  let cur = root;
  while (cur !== null) {
    while (cur.left !== null && cur.left.val < low) {
      cur.left = cur.left.right;
    }
    cur = cur.left;
  }
  // 此时root已经在[L, R] 范围内，处理右孩子元素大于R的情况
  cur = root;
  while (cur !== null) {
    while (cur.right !== null && cur.right.val > high) {
      cur.right = cur.right.left;
    }
    cur = cur.right;
  }
  return root;
}

// @lc code=end

/*
// @lcpr case=start
// [1,0,2]\n1\n2\n
// @lcpr case=end

// @lcpr case=start
// [3,0,4,null,2,null,null,1]\n1\n3\n
// @lcpr case=end

 */
