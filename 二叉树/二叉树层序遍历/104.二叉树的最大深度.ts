export default {};
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
  // 定义一个内部函数，用于递归计算深度
  function getDepth(node: TreeNode, depth: number) {
    // 更新最大深度结果，如果当前深度大于已记录的最大深度
    result = depth > result ? depth : result;
    // 如果是叶子节点（没有左右子节点），则返回
    if (!node.left && !node.right) return;
    // 如果有左子节点，则递归处理左子树
    if (node.left) {
      // 深度加1
      depth++;
      // 递归遍历左子树
      getDepth(node.left, depth);
      // 回溯时深度减1
      depth--;
    }
    // 如果有右子节点，则递归处理右子树
    if (node.right) {
      // 深度加1
      depth++;
      // 递归遍历右子树
      getDepth(node.right, depth);
      // 回溯时深度减1
      depth--;
    }
    // 返回最终计算的最大深度
    return result;
  }
  // 初始化最大深度为0
  let result = 0;
  // 如果根节点为空，直接返回深度0
  if (!root) return result;
  // 从根节点开始递归，初始深度为1
  getDepth(root, 1);
  // 返回计算得到的最大深度
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
