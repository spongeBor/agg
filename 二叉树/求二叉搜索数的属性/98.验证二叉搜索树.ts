export default {};
/*
 * @lc app=leetcode.cn id=98 lang=typescript
 * @lcpr version=30104
 *
 * [98] 验证二叉搜索树
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

function isValidBST(root: TreeNode | null): boolean {
  // return recursiveIsValidBST(root);
  return iterativeIsValidBST(root);
}
function recursiveIsValidBST(
  root: TreeNode | null,
  min: number = -Infinity,
  max: number = Infinity
): boolean {
  if (!root) return true;
  // 当前节点值必须在有效范围内
  if (root.val <= min || root.val >= max) return false;
  // 左子树的所有节点值必须小于当前节点值，右子树的所有节点值必须大于当前节点值
  return (
    recursiveIsValidBST(root.left, min, root.val) &&
    recursiveIsValidBST(root.right, root.val, max)
  );
}

function iterativeIsValidBST(root: TreeNode | null): boolean {
  if (!root) return true;

  const stack: TreeNode[] = [];
  let prev: number = -Infinity;
  let curr: TreeNode | null = root;

  // 中序遍历二叉搜索树应该得到一个递增序列
  while (curr || stack.length > 0) {
    // 遍历到最左节点
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    // 处理当前节点
    curr = stack.pop()!;

    // 如果当前节点值小于等于前一个值，则不是BST
    if (curr.val <= prev) {
      return false;
    }

    // 更新前一个值
    prev = curr.val;

    // 处理右子树
    curr = curr.right;
  }

  return true;
}
// @lc code=end

/*
// @lcpr case=start
// [2,1,3]\n
// @lcpr case=end

// @lcpr case=start
// [5,1,4,null,null,3,6]\n
// @lcpr case=end

 */
