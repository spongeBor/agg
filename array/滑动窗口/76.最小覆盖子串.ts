export default {};
/*
 * @lc app=leetcode.cn id=76 lang=typescript
 *
 * [76] 最小覆盖子串
 *
 * https://leetcode.cn/problems/minimum-window-substring/description/
 *
 * algorithms
 * Hard (47.41%)
 * Likes:    3222
 * Dislikes: 0
 * Total Accepted:    769.9K
 * Total Submissions: 1.6M
 * Testcase Example:  '"ADOBECODEBANC"\n"ABC"'
 *
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
 * 。
 *
 *
 *
 * 注意：
 *
 *
 * 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a", t = "a"
 * 输出："a"
 * 解释：整个字符串 s 是最小覆盖子串。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 *
 *
 *
 * 提示：
 *
 *
 * ^m == s.length
 * ^n == t.length
 * 1 <= m, n <= 10^5
 * s 和 t 由英文字母组成
 *
 *
 *
 * 进阶：你能设计一个在 o(m+n) 时间内解决此问题的算法吗？
 */

// @lc code=start
function minWindow(s: string, t: string): string {
  // 如果t的长度大于s，直接返回空字符串
  if (t.length > s.length) return "";

  // 创建两个Map来存储字符频率
  const need: Map<string, number> = new Map();
  const window: Map<string, number> = new Map();

  // 统计t中每个字符的出现次数
  for (const c of t) {
    need.set(c, (need.get(c) || 0) + 1);
  }

  let left = 0,
    right = 0;
  let valid = 0; // 记录窗口中已经有多少字符满足条件

  // 记录最小覆盖子串的起始位置和长度
  let start = 0,
    len = Infinity;

  while (right < s.length) {
    // 即将移入窗口的字符
    const c = s[right];
    // 扩大窗口
    right++;

    // 更新窗口内数据
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++; // 当前字符的出现次数达到了要求
      }
    }

    // 当所有字符都满足条件时，尝试缩小窗口
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      // 即将移出窗口的字符
      const d = s[left];
      // 缩小窗口
      left++;

      // 更新窗口内数据
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--; // 当前字符的出现次数不再满足要求
        }
        window.set(d, (window.get(d) as number) - 1);
      }
    }
  }

  // 如果没有找到合适的子串，返回空字符串
  return len === Infinity ? "" : s.substring(start, start + len);
}
// @lc code=end
