/*
 * @lc app=leetcode.cn id=69 lang=typescript
 * @lcpr version=30204
 *
 * [69] x 的平方根 
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function mySqrt(x: number): number {
    let left = 0, right = x;
    let res = -1;
    while(left <= right) {
        const mid = left + ~~((right - left) / 2);
        if(mid * mid <= x) {
            res = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return res;
};
// @lc code=end



/*
// @lcpr case=start
// 4\n
// @lcpr case=end

// @lcpr case=start
// 8\n
// @lcpr case=end

 */

