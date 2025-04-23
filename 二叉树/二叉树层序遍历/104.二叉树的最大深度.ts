/*
 * @lc app=leetcode.cn id=104 lang=typescript
 * @lcpr version=30104
 *
 * [104] 二叉树的最大深度
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

function maxDepth(root: TreeNode | null): number {
  //   return maxDepthCommon(root);
  return maxDepthinorder(root);
}

function maxDepthCommon(root: TreeNode | null): number {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length) {
    const length = queue.length;
    depth++;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return depth;
}

function maxDepthinorder(root: TreeNode | null): number {
  function getDepth(node: TreeNode, depth: number) {
    result = depth > result ? depth : result;
    if (!node.left && !node.right) return;
    if (node.left) {
      depth++;
      getDepth(node.left, depth);
      depth--;
    }
    if (node.right) {
      depth++;
      getDepth(node.right, depth);
      depth--;
    }
    return result;
  }
  let result = 0;
  if (!root) return result;
  getDepth(root, 1);
  return result;
}

// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [1,null,2]\n
// @lcpr case=end

 */
