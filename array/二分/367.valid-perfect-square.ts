/*
 * @lc app=leetcode.cn id=367 lang=typescript
 * @lcpr version=30204
 *
 * [367] 有效的完全平方数
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function isPerfectSquare(num: number): boolean {
    let left = 0
    let right = num;
    while(left <= right) {
        const mid = left + ~~((right - left) / 2);
        const sq = mid * mid;
        if(sq < num) {
            left = mid + 1;
        } else if(sq > num) {
            right = mid - 1;
        } else {
            return true;
        }
    }
    return false;
};
// @lc code=end



/*
// @lcpr case=start
// 16\n
// @lcpr case=end

// @lcpr case=start
// 14\n
// @lcpr case=end

 */

