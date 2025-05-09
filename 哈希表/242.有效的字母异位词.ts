export default {};
/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode.cn/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (67.31%)
 * Likes:    1006
 * Dislikes: 0
 * Total Accepted:    943.8K
 * Total Submissions: 1.4M
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "rat", t = "car"
 * 输出: false
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length, t.length <= 5 * 10^4
 * s 和 t 仅包含小写字母
 *
 *
 *
 *
 * 进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 *
 */

// @lc code=start
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const arr = new Array(26).fill(0);
  const pivot = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    arr[s[i].charCodeAt(0) - pivot]++;
    arr[t[i].charCodeAt(0) - pivot]--;
  }
  return arr.every((i) => i === 0);
}
// @lc code=end
