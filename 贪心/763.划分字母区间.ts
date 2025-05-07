export default {};
/*
 * @lc app=leetcode.cn id=763 lang=typescript
 * @lcpr version=30200
 *
 * [763] 划分字母区间
 */

// @lc code=start
function partitionLabels(s: string): number[] {
  // 这道题目的核心思想是贪心算法
  // 我们需要用最少的划分来保证每个字母只在一个区间内

  // 首先，我们需要记录每个字母最后一次出现的位置
  const lastIndex = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    // 记录每个字母最后一次出现的位置
    lastIndex[s[i].charCodeAt(0) - "a".charCodeAt(0)] = i;
  }

  const result: number[] = [];
  let start = 0;
  let end = 0;

  // 遍历字符串
  for (let i = 0; i < s.length; i++) {
    // 更新当前区间的结束位置
    end = Math.max(end, lastIndex[s[i].charCodeAt(0) - "a".charCodeAt(0)]);

    // 如果当前位置是区间的结束位置
    if (i === end) {
      // 记录当前区间的长度
      result.push(end - start + 1);
      // 更新下一个区间的起始位置
      start = i + 1;
    }
  }

  // 返回所有区间的长度
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// "ababcbacadefegdehijhklij"\n
// @lcpr case=end

// @lcpr case=start
// "eccbbbbdec"\n
// @lcpr case=end

 */
