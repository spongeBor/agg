export default {};
/*
 * @lc app=leetcode.cn id=450 lang=typescript
 * @lcpr version=30104
 *
 * [450] 删除二叉搜索树中的节点
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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return root; // 情况一：没找到删除的节点
  if (root.val === key) {
    if (root.left === null && root.right === null) {
      return null; // 情况二：删除的节点是叶子节点
    } else if (root.left === null) {
      return root.right; // 情况三：删除的节点只有右子树
    } else if (root.right === null) {
      return root.left; // 情况四：删除的节点只有左子树
    } else {
      // 情况五：左右孩子节点都不为空，则将删除节点的左子树头结点（左孩子）放到删除节点的右子树的最左面节点的左孩子上，返回删除节点右孩子为新的根节点。
      let cur = root.right;
      while (cur.left) {
        cur = cur.left;
      }

      cur.left = root.left;
      return root.right;
    }
  }
  if (root.val > key) {
    root.left = deleteNode(root.left, key);
  } else {
    root.right = deleteNode(root.right, key);
  }
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [5,3,6,2,4,null,7]\n3\n
// @lcpr case=end

// @lcpr case=start
// [5,3,6,2,4,null,7]\n0\n
// @lcpr case=end

// @lcpr case=start
// []\n0\n
// @lcpr case=end

 */
