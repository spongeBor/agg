export default {};
/*
 * @lc app=leetcode.cn id=106 lang=typescript
 * @lcpr version=30104
 *
 * [106] 从中序与后序遍历序列构造二叉树
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // 第一步：如果数组大小为零的话，说明是空节点了。
  // 第二步：如果不为空，那么取后序数组最后一个元素作为节点元素。
  // 第三步：找到后序数组最后一个元素在中序数组的位置，作为切割点
  // 第四步：切割中序数组，切成中序左数组和中序右数组 （顺序别搞反了，一定是先切中序数组）
  // 第五步：切割后序数组，切成后序左数组和后序右数组
  // 第六步：递归处理左区间和右区间
  if (postorder.length === 0) return null;
  const rootVal = postorder[postorder.length - 1];
  const root = new TreeNode(rootVal);
  const index = inorder.indexOf(rootVal);
  root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index));
  root.right = buildTree(inorder.slice(index + 1), postorder.slice(index, -1));
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [9,3,15,20,7]\n[9,15,7,20,3]\n
// @lcpr case=end

// @lcpr case=start
// [-1]\n[-1]\n
// @lcpr case=end

 */
