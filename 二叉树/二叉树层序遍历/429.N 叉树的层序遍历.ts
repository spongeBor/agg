export default {};
/*
 * @lc app=leetcode.cn id=429 lang=typescript
 * @lcpr version=30104
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *
 *     constructor(v: number) {
 *         this.val = v;
 *         this.children = [];
 *     }
 * }
 */

function levelOrder(root: _Node | null): number[][] {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    const arr = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      arr.push(node.val);
      for (let j = 0; j < node.children.length; j++) {
        queue.push(node.children[j]);
      }
    }
    result.push(arr);
  }
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
