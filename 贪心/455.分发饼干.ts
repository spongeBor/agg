export default {};
/*
 * @lc app=leetcode.cn id=455 lang=typescript
 * @lcpr version=30200
 *
 * [455] 分发饼干
 */

// @lc code=start
function findContentChildren(g: number[], s: number[]): number {
  // 将孩子的胃口值数组和饼干尺寸数组按升序排序
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let result = 0;
  let index = 0; // 饼干索引

  // 遍历每个孩子
  for (let i = 0; i < g.length; i++) {
    // 找到能满足当前孩子胃口的最小饼干
    while (index < s.length && s[index] < g[i]) {
      index++;
    }

    // 如果找到了满足条件的饼干
    if (index < s.length) {
      result++; // 满足一个孩子
      index++; // 使用这个饼干，继续查找下一个
    } else {
      // 没有更多饼干可用
      break;
    }
  }

  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3]\n[1,1]\n
// @lcpr case=end

// @lcpr case=start
// [1,2]\n[1,2,3]\n
// @lcpr case=end

 */
