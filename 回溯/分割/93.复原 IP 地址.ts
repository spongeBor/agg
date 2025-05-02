export default {};
/*
 * @lc app=leetcode.cn id=93 lang=typescript
 * @lcpr version=30200
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
function restoreIpAddresses(s: string): string[] {
  const result: string[] = [];
  const path: string[] = [];

  function backtracking(start: number) {
    // 要分割4段，且用完所有字符
    if (path.length === 4 && start === s.length) {
      result.push(path.join("."));
      return;
    }

    for (let i = start; i < s.length; i++) {
      const str = s.slice(start, i + 1);
      if (isValid(str)) {
        path.push(str);
        backtracking(i + 1);
        path.pop();
      }
    }
  }

  function isValid(str: string) {
    // 如果长度大于1，且第一个字符是0，则不合法
    // 如果长度大于3，则不合法
    // 如果数字大于255，则不合法
    if (str.length > 1 && str[0] === "0") {
      return false;
    }
    if (str.length > 3) {
      return false;
    }

    const num = parseInt(str);
    return num >= 0 && num <= 255;
  }

  backtracking(0);
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// "25525511135"\n
// @lcpr case=end

// @lcpr case=start
// "0000"\n
// @lcpr case=end

// @lcpr case=start
// "101023"\n
// @lcpr case=end

 */
