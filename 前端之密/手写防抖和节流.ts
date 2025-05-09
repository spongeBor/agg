export default {};
/**
 * 防抖函数选项
 */
interface DebounceOptions {
  /** 是否立即执行 */
  leading?: boolean;
  /** 最大等待时间 (ms) */
  maxWait?: number;
}

/**
 * 防抖函数返回值类型
 */
interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  /** 取消延迟的函数调用 */
  cancel: () => void;
  /** 立即执行函数 */
  flush: () => ReturnType<T> | undefined;
}

/**
 * 防抖函数 - 在一定时间内，多次触发，只执行最后一次
 * @param fn 需要防抖的函数
 * @param wait 等待时间，单位毫秒
 * @param options 配置选项
 * @returns 返回一个包装后的防抖函数
 */
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: DebounceOptions = {}
): DebouncedFunction<T> {
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any = null;
  let maxWait: number | undefined = options.maxWait;
  let result: ReturnType<T> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let leading = !!options.leading;

  // 获取当前时间戳
  const now = () => Date.now();

  // 计算是否应该调用函数
  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;

    // 第一次调用或已等待足够时间
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }

  // 实际调用函数
  function invokeFunc(time: number) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    lastInvokeTime = time;

    if (args && thisArg) {
      result = fn.apply(thisArg, args);
    }
    return result;
  }

  // 启动定时器
  function startTimer(pendingFunc: () => void, waitTime: number) {
    timerId = setTimeout(pendingFunc, waitTime);
  }

  // 取消定时器
  function cancelTimer() {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  // 执行函数的核心逻辑
  function trailingEdge(time: number) {
    timerId = null;

    // 只有在有参数的情况下才执行
    if (lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = null;
    lastThis = null;
    return result;
  }

  // 计算剩余等待时间
  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    // 如果设置了maxWait，则取两个时间的最小值
    return maxWait !== undefined
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  // 前沿执行判断
  function leadingEdge(time: number) {
    lastInvokeTime = time;
    // 为后沿执行设置定时器
    startTimer(timerExpired, wait);
    // 如果启用了前沿执行，则立即执行
    return leading ? invokeFunc(time) : result;
  }

  // 定时器到期后的回调
  function timerExpired() {
    const time = now();
    // 检查是否应该执行函数
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // 重新计算等待时间并重启定时器
    startTimer(timerExpired, remainingWait(time));
    return undefined;
  }

  // 取消方法
  function cancel() {
    if (timerId !== null) {
      cancelTimer();
    }
    lastInvokeTime = 0;
    lastArgs = null;
    lastCallTime = undefined;
    lastThis = null;
    timerId = null;
  }

  // 立即执行方法
  function flush() {
    return timerId === null ? result : trailingEdge(now());
  }

  // 核心的debounced函数
  function debounced(this: any, ...args: Parameters<T>) {
    const time = now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === null) {
        return leadingEdge(time);
      }
      if (maxWait !== undefined) {
        // 处理最大等待时间情况
        startTimer(timerExpired, wait);
        return invokeFunc(time);
      }
    }
    if (timerId === null) {
      startTimer(timerExpired, wait);
    }
    return result;
  }

  // 添加额外方法
  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}

/**
 * 节流函数选项
 */
interface ThrottleOptions {
  /** 是否在延迟开始前调用函数 */
  leading?: boolean;
  /** 是否在延迟结束后调用函数 */
  trailing?: boolean;
}

/**
 * 节流函数返回值类型
 */
interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  /** 取消延迟的函数调用 */
  cancel: () => void;
  /** 立即执行函数 */
  flush: () => ReturnType<T> | undefined;
}

/**
 * 节流函数 - 在一定时间内，只执行一次函数
 * @param fn 需要节流的函数
 * @param wait 间隔时间，单位毫秒
 * @param options 配置选项
 * @returns 返回一个包装后的节流函数
 */
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: ThrottleOptions = {}
): ThrottledFunction<T> {
  // 使用防抖实现节流，但默认情况下设置 maxWait 等于 wait
  return debounce(fn, wait, {
    leading: options.leading !== undefined ? options.leading : true,
    maxWait: wait,
  }) as ThrottledFunction<T>;
}

// 使用示例
function exampleUsage() {
  // 防抖示例：用户连续输入，只在停止输入后执行搜索
  const handleSearch = (searchTerm: string) => {
    console.log("搜索:", searchTerm);
    return `搜索结果: ${searchTerm}`;
  };

  // 基本防抖
  const debouncedSearch = debounce(handleSearch, 300);

  // 带有选项的防抖（立即执行第一次）
  const debouncedSearchImmediate = debounce(handleSearch, 300, {
    leading: true,
  });

  // 设置最大等待时间的防抖
  const debouncedSearchWithMaxWait = debounce(handleSearch, 300, {
    maxWait: 1000,
  });

  // 节流示例：滚动事件，每200ms最多执行一次
  const handleScroll = () => {
    console.log("滚动位置:", window.scrollY);
    return window.scrollY;
  };

  // 基本节流
  const throttledScroll = throttle(handleScroll, 200);

  // 自定义节流选项
  const throttledScrollCustom = throttle(handleScroll, 200, {
    leading: true, // 首次触发立即执行
    trailing: true, // 结束后也会执行一次
  });

  // 使用取消功能
  setTimeout(() => {
    // 取消后续执行
    debouncedSearch.cancel();
    throttledScroll.cancel();
  }, 1000);

  // 使用立即执行功能
  setTimeout(() => {
    // 立即执行当前的延迟函数
    const result = debouncedSearch.flush();
    console.log("立即执行结果:", result);
  }, 500);
}
