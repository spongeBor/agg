export default {};
/*
 * @lc app=leetcode.cn id=134 lang=typescript
 * @lcpr version=30200
 *
 * [134] 加油站
 */

// @lc code=start
function canCompleteCircuit2(gas: number[], cost: number[]): number {
  // 贪心算法
  // 局部最优：当前加油站的油量大于等于到下一个加油站的油量
  // 全局最优：从起点出发，能够绕一圈回到起点
  let totalSum = 0;
  let curSum = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalSum += gas[i] - cost[i];
    curSum += gas[i] - cost[i];
    if (curSum < 0) {
      start = i + 1;
      curSum = 0;
    }
  }

  if (totalSum < 0) return -1;
  return start;
}
function canCompleteCircuit(gas: number[], cost: number[]): number {
  // 逆推法解决加油站问题
  // 思路：如果总油量小于总消耗，则无解；否则，从最低剩余油量的下一个位置开始一定能跑完全程

  let sum = 0; // 记录总的剩余油量（总加油量 - 总消耗量）
  let min = Infinity; // 记录最小剩余油量

  // 第一次遍历：计算总剩余油量和找出最小剩余油量
  for (let i = 0; i < gas.length; i++) {
    sum += gas[i] - cost[i]; // 当前站点剩余油量 = 加油量 - 消耗量
    if (sum < min) {
      min = sum; // 更新最小剩余油量
    }
  }

  // 如果总剩余油量小于0，说明无论从哪个加油站出发都无法环绕一周
  if (sum < 0) return -1;

  // 如果最小剩余油量大于等于0，说明从起点(0号加油站)出发就能环绕一周
  if (min >= 0) return 0;

  // 从后往前找起点：
  // 我们需要找到一个位置，从该位置出发能够避开最小剩余油量的情况
  // 通过从后往前累加，找到第一个使累加和大于等于0的位置
  for (let i = gas.length - 1; i >= 0; i--) {
    min += gas[i] - cost[i]; // 逆推累加剩余油量
    if (min >= 0) return i; // 找到起点
  }

  return -1; // 理论上不会执行到这里，因为如果sum>=0，一定有解
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,4,5]\n[3,4,5,1,2]\n
// @lcpr case=end

// @lcpr case=start
// [2,3,4]\n[3,4,3]\n
// @lcpr case=end

 */
