export default {};
/*
 * @lc app=leetcode.cn id=113 lang=typescript
 * @lcpr version=30200
 *
 * [113] 路径总和 II
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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = []; // 用于存储所有满足条件的路径
  const path: number[] = []; // 用于记录当前遍历的路径

  function traverse(root: TreeNode | null, targetSum: number) {
    if (!root) return; // 如果节点为空，直接返回

    path.push(root.val); // 将当前节点值加入路径
    targetSum -= root.val; // 从目标和中减去当前节点值

    // 判断是否为叶子节点且路径和等于目标和
    if (!root.left && !root.right && targetSum === 0) {
      result.push([...path]); // 找到一条满足条件的路径，复制并添加到结果中
    }

    // 递归遍历左右子树
    traverse(root.left, targetSum);
    traverse(root.right, targetSum);

    // 回溯：移除当前节点，返回父节点继续搜索其他路径
    path.pop();
  }

  traverse(root, targetSum); // 从根节点开始遍历
  return result; // 返回所有满足条件的路径
}
// @lc code=end

/*
// @lcpr case=start
// [5,4,8,11,null,13,4,7,2,null,null,5,1]\n22\n
// @lcpr case=end

// @lcpr case=start
// [1,2,3]\n5\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n0\n
// @lcpr case=end

 */
