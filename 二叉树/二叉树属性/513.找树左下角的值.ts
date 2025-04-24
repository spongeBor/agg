export default {};
/*
 * @lc app=leetcode.cn id=513 lang=typescript
 * @lcpr version=30104
 *
 * [513] 找树左下角的值
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

function findBottomLeftValue(root: TreeNode | null): number {
  // return recursive(root);
  return iterative(root);
}

function recursive(root: TreeNode | null): number {
  if (root === null) return 0;
  let maxDepth = -1;
  let result = 0;
  const traverse = (node: TreeNode | null, depth: number) => {
    if (node === null) return;
    if (depth > maxDepth) {
      maxDepth = depth;
      result = node.val;
    }
    traverse(node.left, depth + 1);
    traverse(node.right, depth + 1);
  };
  traverse(root, 0);
  return result;
}

function iterative(root: TreeNode | null): number {
  let result = 0;
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === 0) result = node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}

// @lc code=end

/*
// @lcpr case=start
// [2,1,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3,4,null,5,6,null,null,7]\n
// @lcpr case=end

 */
