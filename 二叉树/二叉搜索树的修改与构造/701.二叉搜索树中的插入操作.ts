export default {};
/*
 * @lc app=leetcode.cn id=701 lang=typescript
 * @lcpr version=30104
 *
 * [701] 二叉搜索树中的插入操作
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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  // return recursiveInsertIntoBST(root, val);
  return iterativeInsertIntoBST(root, val);
}

function recursiveInsertIntoBST(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (root === null) {
    return new TreeNode(val);
  }
  if (root.val > val) {
    root.left = recursiveInsertIntoBST(root.left, val);
  } else {
    root.right = recursiveInsertIntoBST(root.right, val);
  }
  return root;
}

function iterativeInsertIntoBST(
  root: TreeNode | null,
  val: number
): TreeNode | null {
  if (root === null) {
    return new TreeNode(val);
  }
  let current = root;
  while (true) {
    if (current.val > val) {
      if (current.left === null) {
        current.left = new TreeNode(val);
        break;
      }
      current = current.left;
    } else {
      if (current.right === null) {
        current.right = new TreeNode(val);
        break;
      }
      current = current.right;
    }
  }
  return root;
}

// @lc code=end

/*
// @lcpr case=start
// [4,2,7,1,3]\n5\n
// @lcpr case=end

// @lcpr case=start
// [40,20,60,10,30,50,70]\n25\n
// @lcpr case=end

// @lcpr case=start
// [4,2,7,1,3,null,null,null,null,null,null]\n5\n
// @lcpr case=end

 */
