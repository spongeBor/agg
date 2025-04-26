export default {};
/*
 * @lc app=leetcode.cn id=617 lang=typescript
 * @lcpr version=30104
 *
 * [617] 合并二叉树
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

function mergeTrees(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  //   return recursiveMerge(root1, root2);
  return iterativeMerge(root1, root2);
}
function recursiveMerge(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  if (!root1) return root2;
  if (!root2) return root1;
  root1.val += root2.val;
  root1.left = recursiveMerge(root1.left, root2.left);
  root1.right = recursiveMerge(root1.right, root2.right);
  return root1;
}

function iterativeMerge(
  root1: TreeNode | null,
  root2: TreeNode | null
): TreeNode | null {
  if (!root1) return root2;
  if (!root2) return root1;
  const queue: TreeNode[] = [];
  queue.push(root1);
  queue.push(root2);
  while (queue.length > 0) {
    const node1 = queue.shift();
    const node2 = queue.shift();
    node1.val += node2.val;
    if (node1.left && node2.left) {
      queue.push(node1.left);
      queue.push(node2.left);
    }
    if (node1.right && node2.right) {
      queue.push(node1.right);
      queue.push(node2.right);
    }
    if (!node1.left && node2.left) {
      node1.left = node2.left;
    }
    if (!node1.right && node2.right) {
      node1.right = node2.right;
    }
  }
  return root1;
}
// @lc code=end

/*
// @lcpr case=start
// [1,3,2,5]\n[2,1,3,null,4,null,7]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n[1,2]\n
// @lcpr case=end

 */
