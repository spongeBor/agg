export default {};
/*
 * @lc app=leetcode.cn id=102 lang=typescript
 * @lcpr version=30104
 *
 * [102] 二叉树的层序遍历
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

function levelOrder(root: TreeNode | null): number[][] {
  //   return levelOrderRecursive(root);
  return levelOrderIterative(root);
}
function levelOrderIterative(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;

  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length) {
    const levelSize = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

function levelOrderRecursive(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;

  const traverse = (node: TreeNode, level: number) => {
    if (!node) return;

    if (result.length === level) {
      result.push([]);
    }

    result[level].push(node.val);
    traverse(node.left, level + 1);
    traverse(node.right, level + 1);
  };

  traverse(root, 0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [3,9,20,null,null,15,7]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
