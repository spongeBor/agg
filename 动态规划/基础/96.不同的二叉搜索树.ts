export default {};
/*
 * @lc app=leetcode.cn id=96 lang=typescript
 * @lcpr version=30200
 *
 * [96] 不同的二叉搜索树
 */

// @lc code=start
function numTrees(n: number): number {
  // dp[i] 表示i个节点的二叉搜索树的个数
  // 递推关系推导：
  // 对于含有n个节点（编号1到n）的二叉搜索树，可以选择任意节点j作为根节点（1 ≤ j ≤ n）
  // 当选择节点j作为根节点时：
  // - 左子树包含节点1到j-1，共有j-1个节点，对应dp[j-1]种不同结构
  // - 右子树包含节点j+1到n，共有n-j个节点，对应dp[n-j]种不同结构
  // 根据乘法原理，对于根节点j，总共有dp[j-1] * dp[n-j]种不同的二叉搜索树
  // 因此，总的二叉搜索树数量是所有可能根节点的情况总和：
  // dp[n] = dp[0]*dp[n-1] + dp[1]*dp[n-2] + ... + dp[n-1]*dp[0]
  // 基础情况：
  // dp[0] = 1（空树视为一种结构）
  // dp[1] = 1（只有一个节点的树只有一种结构）
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      // j表示左子树的节点个数，i-j-1表示右子树的节点个数
      // dp[j]表示左子树的不同结构数，dp[i-j-1]表示右子树的不同结构数
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}
// @lc code=end

/*
// @lcpr case=start
// 3\n
// @lcpr case=end

// @lcpr case=start
// 1\n
// @lcpr case=end

 */
