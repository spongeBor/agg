export default {};
/*
 * @lc app=leetcode.cn id=968 lang=typescript
 * @lcpr version=30200
 *
 * [968] 监控二叉树
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

function minCameraCover(root: TreeNode | null): number {
  // 局部最优：从下往上安装摄像头，保证叶子节点的父节点都被监控
  // 全局最优：所有节点都被监控
  let result = 0;

  // 节点状态：0 表示未被覆盖，1 表示有摄像头，2 表示被覆盖
  const traverse = (node: TreeNode | null): number => {
    // 空节点默认为已覆盖状态，避免在叶子节点上放置摄像头
    if (node === null) return 2;

    // 后序遍历，自底向上处理
    const left = traverse(node.left);
    const right = traverse(node.right);

    // 情况1：如果左右子节点都已被覆盖，则当前节点未被覆盖
    if (left === 2 && right === 2) {
      return 0;
    }

    // 情况2：如果左右子节点中至少有一个未被覆盖，则当前节点需要放置摄像头
    if (left === 0 || right === 0) {
      result++; // 放置摄像头
      return 1;
    }

    // 情况3：如果左右子节点中至少有一个有摄像头，则当前节点已被覆盖
    if (left === 1 || right === 1) {
      return 2;
    }

    // 默认返回未被覆盖状态（实际上代码不会走到这里）
    return 0;
  };

  // 如果根节点未被覆盖，需要额外放置一个摄像头
  if (traverse(root) === 0) {
    result++;
  }
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [0,0,null,0,0]\n
// @lcpr case=end

// @lcpr case=start
// [0,0,null,0,null,0,null,null,0]\n
// @lcpr case=end

 */
