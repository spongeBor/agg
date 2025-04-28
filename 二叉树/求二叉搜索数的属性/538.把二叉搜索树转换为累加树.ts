export default {};
/*
 * @lc app=leetcode.cn id=538 lang=typescript
 * @lcpr version=30104
 *
 * [538] 把二叉搜索树转换为累加树
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

function convertBST(root: TreeNode | null): TreeNode | null {
  // return reverseInorder(root);
  return iterative(root);
}

function reverseInorder(root: TreeNode | null) {
  // 反中序遍历
  let pre = 0;
  const traversal = (root: TreeNode | null) => {
    if (!root) return;
    traversal(root.right);
    root.val += pre;
    pre = root.val;
    traversal(root.left);
  };
  traversal(root);
  return root;
}

function iterative(root: TreeNode | null) {
  // 迭代法
  let pre = 0;
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    if (cur) {
      stack.push(cur);
      cur = cur.right;
    } else {
      cur = stack.pop();
      cur.val += pre;
      pre = cur.val;
      cur = cur.left;
    }
  }
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]\n
// @lcpr case=end

// @lcpr case=start
// [0,null,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,0,2]\n
// @lcpr case=end

// @lcpr case=start
// [3,2,4,1]\n
// @lcpr case=end

 */
