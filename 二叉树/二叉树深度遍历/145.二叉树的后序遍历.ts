export default {};
/*
 * @lc app=leetcode.cn id=145 lang=typescript
 * @lcpr version=30104
 *
 * [145] 二叉树的后序遍历
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

function postorderTraversal(root: TreeNode | null): number[] {
  //   return postorderTraversalRecursive(root);
  return postorderTraversalIterative(root);
}
function postorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = [];
  const traverse = (node: TreeNode | null) => {
    if (node === null) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  };
  traverse(root);
  return result;
}

function postorderTraversalIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;

  const stk: TreeNode[] = [];
  stk.push(root);
  while (stk.length) {
    const node = stk.pop();

    // 将当前节点的值添加到结果数组的开头，而不是将值推入栈中
    result.unshift(node.val);
    // 或者使用 result.push(node.val) 然后最后 result.reverse()

    // 注意前序遍历是"根-左-右"，而后序遍历是"左-右-根"
    // 所以我们先压入左节点，再压入右节点，这样出栈顺序就是"右-左"
    // 再配合 unshift 操作，最终顺序就是"左-右-根"
    if (node.left) stk.push(node.left);
    if (node.right) stk.push(node.right);
  }

  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,null,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,5,null,8,null,null,6,7,9]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
