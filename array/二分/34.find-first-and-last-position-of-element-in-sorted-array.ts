/*
 * @lc app=leetcode.cn id=34 lang=typescript
 * @lcpr version=30204
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
function searchRange(nums: number[], target: number): number[] {
    function getLeftBoard() {
        let left = 0;
        let right = nums.length;
        let leftBoard = -2;
        while(left < right) {
            const middle = left + ~~((right - left)/2);
            if(nums[middle] >= target) {
                right = middle;
                leftBoard = middle;
            } else {
                left = middle + 1;
            }
        }
        return leftBoard;
    }

    function getRightBoard() {
        let left = 0;
        let right = nums.length;
        let rightBoard = -2;
        while(left < right) {
            const middle = left + ~~((right - left)/2);
            if(nums[middle] > target) {
                right = middle;
            } else {
                left = middle + 1;
                rightBoard = left;
            }
        }
        return rightBoard;
    }
        const leftBoard = getLeftBoard();
        const rightBoard = getRightBoard();
        if(leftBoard === -2 || rightBoard === -2) return [-1, -1];
        if(rightBoard - leftBoard >= 1) return [leftBoard, rightBoard - 1];
        return [-1,-1]
    
};

function searchRange2(nums: number[], target: number): number[] {
    function getLeftBoard() {
        let left = 0;
        let right = nums.length - 1;
        let leftBoard = -2;
        while(left <= right) {
            const middle = left + ~~((right - left)/2);
            if(nums[middle] >= target) {
                right = middle - 1;
                leftBoard = middle;
            } else {
                left = middle + 1;
            }
        }
        return leftBoard;
    }

    function getRightBoard() {
        let left = 0;
        let right = nums.length - 1;
        let rightBoard = -2;
        while(left <= right) {
            const middle = left + ~~((right - left)/2);
            if(nums[middle] > target) {
                right = middle - 1;
            } else {
                left = middle + 1;
                rightBoard = left;
            }
        }
        return rightBoard;
    }
        const leftBoard = getLeftBoard();
        const rightBoard = getRightBoard();
        if(leftBoard === -2 || rightBoard === -2) return [-1, -1];
        if(rightBoard - leftBoard > 1) return [leftBoard + 1, rightBoard - 1];
        return [-1,-1]
    
};
// @lc code=end



/*
// @lcpr case=start
// [5,7,7,8,8,10]\n8\n
// @lcpr case=end

// @lcpr case=start
// [5,7,7,8,8,10]\n6\n
// @lcpr case=end

// @lcpr case=start
// []\n0\n
// @lcpr case=end

 */

