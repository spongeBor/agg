/*
 * @lc app=leetcode.cn id=257 lang=typescript
 * @lcpr version=30104
 *
 * [257] 二叉树的所有路径
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

function binaryTreePaths(root: TreeNode | null): string[] {
  //   return Recursive(root);
  return RecursiveSample(root);
}

/**
 * 前序遍历
 * 回溯
 * @param root
 */
function Recursive(root: TreeNode | null): string[] {
  const result: string[] = [];
  const path: number[] = [];
  if (!root) return result;
  const traversal = (node: TreeNode | null) => {
    path.push(node.val);
    if (!node.left && !node.right) {
      let sPath = "";
      for (let i = 0; i < path.length - 1; i++) {
        sPath += path[i] + "->";
      }
      sPath += path[path.length - 1];
      result.push(sPath);
      return;
    }
    if (node.left) {
      traversal(node.left);
      path.pop();
    }
    if (node.right) {
      traversal(node.right);
      path.pop();
    }
  };
  traversal(root);
  return result;
}

/**
 * 前序遍历
 * 回溯
 * 优化
 * 将回溯过程写入递归函数中
 * @param root
 */
function RecursiveSample(root: TreeNode | null): string[] {
  const result: string[] = [];
  if (!root) return result;
  const traversal = (node: TreeNode | null, path: string) => {
    path += node.val;
    if (!node.left && !node.right) {
      result.push(path);
      return;
    }
    if (node.left) {
      traversal(node.left, path + "->");
    }
    if (node.right) {
      traversal(node.right, path + "->");
    }
  };
  traversal(root, "");
  return result;
}

function Iterative(root: TreeNode | null): string[] {
  // TODO: 后面再补充
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,null,5]\n
// @lcpr case=end

// @lcpr case=start
// [1]\n
// @lcpr case=end

 */
