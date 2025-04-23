export default {};
/*
 * @lc app=leetcode.cn id=589 lang=typescript
 * @lcpr version=30104
 *
 * [589] N 叉树的前序遍历
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *
 *     constructor(val?: number, children?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

function preorder(root: _Node | null): number[] {
  const result: number[] = [];
  function traverse(node: _Node | null) {
    if (!node) return;
    result.push(node.val);
    for (const child of node.children) {
      traverse(child);
    }
  }
  traverse(root);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,null,3,2,4,null,5,6]\n
// @lcpr case=end

// @lcpr case=start
// [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]\n
// @lcpr case=end

 */
