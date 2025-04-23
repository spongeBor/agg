export default {};
/*
 * @lc app=leetcode.cn id=117 lang=typescript
 * @lcpr version=30104
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 *
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function connect(root: _Node | null): _Node | null {
  if (!root) return null;
  const queue = [root];
  while (queue.length) {
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      const node = queue.shift();
      if (i === length - 1) {
        node.next = null;
      } else {
        node.next = queue[0];
      }
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
  return root;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4,5,null,7]\n
// @lcpr case=end

// @lcpr case=start
// []\n
// @lcpr case=end

 */
