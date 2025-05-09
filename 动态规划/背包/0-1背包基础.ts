export default {};
//题目： 有n件物品和一个最多能背重量为w 的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。每件物品只能用一次，求解将哪些物品装入背包里物品价值总和最大。

function bag01_1(weight: number[], value: number[], bagSize: number) {
  // dp[i][j] 表示前i个物品在容量为j的背包中的最大价值
  // 这是我们的状态定义，i表示考虑前i个物品，j表示背包容量为j时的最大价值

  // dp[i-1][j] 表示不选第i个物品
  // 这种情况下，最大价值等于前i-1个物品在容量为j的背包中的最大价值

  // dp[i-1][j-weight[i-1]] + value[i-1] 表示选第i个物品
  // 前提是j-weight[i-1]>=0，即背包剩余容量能放下第i个物品
  // 这种情况下，最大价值等于"前i-1个物品在剩余容量j-weight[i-1]的最大价值"加上"当前物品的价值value[i-1]"

  // 状态转移方程: dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i-1]] + value[i-1])
  // 这个方程表示我们要在"不选"和"选"两种情况中取最大值

  // 初始化: dp[0][j] = 0，表示没有物品时，背包价值为0
  // dp[i][0] = 0，表示背包容量为0时，无法放入任何物品，价值为0

  // 创建二维数组dp，大小为(weight.length+1)*(bagSize+1)，初始值都为0
  // +1是因为我们需要考虑"0个物品"和"容量为0"的情况
  let dp = new Array(weight.length + 1)
    .fill(0)
    .map(() => new Array(bagSize + 1).fill(0));

  // 开始填充dp数组，i从1开始，表示考虑第1个物品
  for (let i = 1; i <= weight.length; i++) {
    // j从0开始，表示背包容量从0开始考虑
    for (let j = 0; j <= bagSize; j++) {
      // 如果当前背包容量j小于第i个物品的重量，那么无法选择该物品
      // 注意：weight[i-1]表示第i个物品的重量，因为数组索引从0开始
      if (j < weight[i - 1]) {
        // 此时只能选择不放入第i个物品，所以dp[i][j]等于dp[i-1][j]
        dp[i][j] = dp[i - 1][j];
      } else {
        // 如果背包容量足够，我们可以选择放入或不放入第i个物品
        // 取两种情况的最大值：
        // 1. 不放入第i个物品：dp[i-1][j]
        // 2. 放入第i个物品：dp[i-1][j-weight[i-1]] + value[i-1]
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weight[i - 1]] + value[i - 1] // value 从0开始，dp从1开始，所以value[i-1]是第涂个物品
        );
      }
    }
  }

  return dp[weight.length][bagSize];
}

/**
 * 0-1背包问题的一维动态规划解法
 *
 * 原理解释：
 * 1. 一维数组dp[j]表示容量为j的背包能够装下的最大价值
 * 2. 这是对二维DP的空间优化，将dp[i][j]压缩为dp[j]
 * 3. 关键点在于遍历顺序：必须从后向前遍历背包容量
 *    - 如果从前向后遍历，会导致物品被重复使用（变成完全背包问题）
 *    - 从后向前确保每个物品只被考虑一次
 * 4. 状态转移方程：dp[j] = max(dp[j], dp[j-weight[i]] + value[i])
 *    - dp[j]：不选择当前物品i时的最大价值
 *    - dp[j-weight[i]] + value[i]：选择当前物品i时的最大价值
 * 5. 初始化dp数组全为0，表示背包容量为j时，不放入任何物品的价值
 *
 * 与二维方法相比，空间复杂度从O(n*m)降低到O(m)，其中n是物品数量，m是背包容量
 */
function bag01_2(weight: number[], value: number[], bagSize: number) {
  // 创建一维dp数组，表示不同容量背包的最大价值
  let dp = new Array(bagSize + 1).fill(0);

  // 遍历每个物品
  for (let i = 0; i < weight.length; i++) {
    // 从后向前遍历背包容量，确保每个物品只被使用一次
    for (let j = bagSize; j >= weight[i]; j--) {
      // 状态转移方程：选择不放物品i或放物品i的最大值
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }

  // 返回背包容量为bagSize时的最大价值
  return dp[bagSize];
}
// 测试用例
function testBag01() {
  console.log("测试0-1背包问题：");

  // 测试用例1：基本示例
  const weights1 = [1, 3, 4];
  const values1 = [15, 20, 30];
  const bagSize1 = 4;
  console.log("测试用例1:");
  console.log("物品重量:", weights1);
  console.log("物品价值:", values1);
  console.log("背包容量:", bagSize1);
  console.log("二维DP结果:", bag01_1(weights1, values1, bagSize1)); // 应该返回35
  console.log("一维DP结果:", bag01_2(weights1, values1, bagSize1)); // 应该返回35
  console.log("-------------------");

  // 测试用例2：更多物品
  const weights2 = [2, 3, 4, 5];
  const values2 = [3, 4, 5, 6];
  const bagSize2 = 8;
  console.log("测试用例2:");
  console.log("物品重量:", weights2);
  console.log("物品价值:", values2);
  console.log("背包容量:", bagSize2);
  console.log("二维DP结果:", bag01_1(weights2, values2, bagSize2)); // 应该返回10
  console.log("一维DP结果:", bag01_2(weights2, values2, bagSize2)); // 应该返回10
  console.log("-------------------");

  // 测试用例3：背包容量小于所有物品重量
  const weights3 = [10, 20, 30];
  const values3 = [60, 100, 120];
  const bagSize3 = 5;
  console.log("测试用例3:");
  console.log("物品重量:", weights3);
  console.log("物品价值:", values3);
  console.log("背包容量:", bagSize3);
  console.log("二维DP结果:", bag01_1(weights3, values3, bagSize3)); // 应该返回0
  console.log("一维DP结果:", bag01_2(weights3, values3, bagSize3)); // 应该返回0
  console.log("-------------------");
}

// 运行测试
testBag01();
