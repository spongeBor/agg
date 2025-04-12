/*
 * @lc app=leetcode.cn id=35 lang=typescript
 * @lcpr version=30204
 *
 * [35] 搜索插入位置
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function searchInsert(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        const mid = left + ~~((right - left) / 2);
        if(nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return right + 1;
};
function searchInsert2(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length;
    while(left < right) {
        const mid = left + ~~((right - left) / 2);
        if(nums[mid] > target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return right;
};
// @lc code=end



/*
// @lcpr case=start
// [1,3,5,6]\n5\n
// @lcpr case=end

// @lcpr case=start
// [1,3,5,6]\n2\n
// @lcpr case=end

// @lcpr case=start
// [1,3,5,6]\n7\n
// @lcpr case=end

 */

