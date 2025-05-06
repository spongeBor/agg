export default {};
/*
 * @lc app=leetcode.cn id=332 lang=typescript
 * @lcpr version=30200
 *
 * [332] 重新安排行程
 */

// @lc code=start
function findItinerary(tickets: string[][]): string[] {
  // 构建邻接表
  const graph: Map<string, string[]> = new Map();

  // 初始化邻接表
  for (const [from, to] of tickets) {
    if (!graph.has(from)) {
      graph.set(from, []);
    }
    graph.get(from)!.push(to);
  }

  // 对每个节点的邻居进行字典序排序
  for (const [from, destinations] of graph.entries()) {
    destinations.sort();
  }

  const result: string[] = [];

  function dfs(current: string): void {
    // 获取当前机场的所有可能目的地
    const destinations = graph.get(current);

    // 如果当前节点存在出边，继续递归
    while (destinations && destinations.length > 0) {
      const next = destinations.shift()!;
      dfs(next);
    }

    // 递归完成后，将当前节点添加到结果中（注意这里是前插）
    result.unshift(current);
  }

  dfs("JFK");
  return result;
}
// @lc code=end

/*
// @lcpr case=start
// [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]\n
// @lcpr case=end

// @lcpr case=start
// [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\n
// @lcpr case=end

 */
