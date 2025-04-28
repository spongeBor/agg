export default {};
/*
 * @lc app=leetcode.cn id=108 lang=typescript
 * @lcpr version=30104
 *
 * [108] 将有序数组转换为二叉搜索树
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

function sortedArrayToBST(nums: number[]): TreeNode | null {
  // return recursive(nums);
  return iterative(nums);
}

function recursive(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);
  root.left = recursive(nums.slice(0, mid));
  root.right = recursive(nums.slice(mid + 1));
  return root;
}

function iterative(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const root = new TreeNode(0); // 初始化根节点
  const nodeQue = [root]; // 初始化节点队列
  const leftQue = [0]; // 初始化左边界队列
  const rightQue = [nums.length - 1]; // 初始化右边界队列
  while (nodeQue.length > 0) {
    const node = nodeQue.shift();
    const left = leftQue.shift();
    const right = rightQue.shift();
    const mid = Math.floor((left + right) / 2);
    node.val = nums[mid];
    if (left <= mid - 1) {
      node.left = new TreeNode(0);
      nodeQue.push(node.left);
      leftQue.push(left);
      rightQue.push(mid - 1);
    }
    if (mid + 1 <= right) {
      node.right = new TreeNode(0);
      nodeQue.push(node.right);
      leftQue.push(mid + 1);
      rightQue.push(right);
    }
  }
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [-10,-3,0,5,9]\n
// @lcpr case=end

// @lcpr case=start
// [1,3]\n
// @lcpr case=end

 */
