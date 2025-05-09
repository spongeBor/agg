export default {};
/**
 * 手写Promise实现（符合Promise/A+规范）
 *
 * Promise/A+规范详细说明：
 *
 * 1. 术语
 *   1.1 "promise"是一个对象或函数，拥有then方法，其行为符合本规范
 *   1.2 "thenable"是一个对象或函数，定义了then方法
 *   1.3 "value"是任何合法的JavaScript值（包括undefined、thenable或promise）
 *   1.4 "exception"是使用throw语句抛出的值
 *   1.5 "reason"是表示promise为什么被rejected的值
 *
 * 2. Promise状态
 *   2.1 promise必须处于以下三种状态之一：pending、fulfilled或rejected
 *     2.1.1 处于pending状态时，promise可以转变为fulfilled或rejected状态
 *     2.1.2 处于fulfilled状态时，promise不能转变为其他状态，必须有一个不可变的value
 *     2.1.3 处于rejected状态时，promise不能转变为其他状态，必须有一个不可变的reason
 *
 * 3. then方法
 *   3.1 promise必须提供一个then方法来访问其当前或最终的value或reason
 *   3.2 promise的then方法接受两个参数：
 *     promise.then(onFulfilled, onRejected)
 *   3.3 onFulfilled和onRejected都是可选参数：
 *     3.3.1 如果onFulfilled不是函数，它必须被忽略
 *     3.3.2 如果onRejected不是函数，它必须被忽略
 *   3.4 如果onFulfilled是函数：
 *     3.4.1 当promise fulfilled后必须被调用，promise的value作为第一个参数
 *     3.4.2 在promise fulfilled之前不能被调用
 *     3.4.3 不能被调用多次
 *   3.5 如果onRejected是函数：
 *     3.5.1 当promise rejected后必须被调用，promise的reason作为第一个参数
 *     3.5.2 在promise rejected之前不能被调用
 *     3.5.3 不能被调用多次
 *   3.6 onFulfilled或onRejected必须在执行上下文栈仅包含平台代码后被调用
 *   3.7 onFulfilled和onRejected必须作为函数被调用（即没有this值）
 *   3.8 同一个promise的then方法可以被调用多次
 *     3.8.1 当promise fulfilled后，所有onFulfilled回调必须按照它们对then的原始调用顺序执行
 *     3.8.2 当promise rejected后，所有onRejected回调必须按照它们对then的原始调用顺序执行
 *   3.9 then方法必须返回一个promise
 *     promise2 = promise1.then(onFulfilled, onRejected);
 *     3.9.1 如果onFulfilled或onRejected返回一个值x，则运行Promise解决过程[[Resolve]](promise2, x)
 *     3.9.2 如果onFulfilled或onRejected抛出一个异常e，则promise2必须以e为reason被rejected
 *     3.9.3 如果onFulfilled不是函数且promise1已fulfilled，则promise2必须以promise1的value被fulfilled
 *     3.9.4 如果onRejected不是函数且promise1已rejected，则promise2必须以promise1的reason被rejected
 *
 * 4. Promise解决过程
 *   Promise解决过程是一个抽象操作，它接收一个promise和一个值x，表示为[[Resolve]](promise, x)。如果x是一个thenable，它尝试使promise采用x的状态，假定x的行为至少有点像promise。否则，它用x的值来fulfill promise。
 *   这种thenable的特性使得Promise的实现更具有通用性：只要其暴露一个遵循Promise/A+规范的then方法，它就能与Promise/A+的实现进行互操作。
 *
 *   要运行[[Resolve]](promise, x)，需执行以下步骤：
 *     4.1 如果promise和x引用同一个对象，以TypeError为reason拒绝promise
 *     4.2 如果x是一个promise，采用其状态：
 *       4.2.1 如果x处于pending状态，promise必须保持pending直到x被fulfilled或rejected
 *       4.2.2 如果x处于fulfilled状态，用相同的value fulfill promise
 *       4.2.3 如果x处于rejected状态，用相同的reason reject promise
 *     4.3 如果x是对象或函数：
 *       4.3.1 让then = x.then
 *       4.3.2 如果检索属性x.then导致抛出异常e，则以e为reason reject promise
 *       4.3.3 如果then是函数，将x作为this调用它，第一个参数为resolvePromise，第二个参数为rejectPromise，其中：
 *         4.3.3.1 如果resolvePromise以值y被调用，运行[[Resolve]](promise, y)
 *         4.3.3.2 如果rejectPromise以reason r被调用，用r拒绝promise
 *         4.3.3.3 如果resolvePromise和rejectPromise都被调用，或者对同一个参数进行多次调用，则第一次调用优先，任何进一步的调用都被忽略
 *         4.3.3.4 如果调用then抛出异常e：
 *           4.3.3.4.1 如果resolvePromise或rejectPromise已被调用，忽略它
 *           4.3.3.4.2 否则，以e为reason reject promise
 *       4.3.4 如果then不是函数，以x为value fulfill promise
 *     4.4 如果x不是对象或函数，以x为value fulfill promise
 */

// 定义PromiseSettledResult接口
interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface PromiseRejectedResult {
  status: "rejected";
  reason: any;
}

type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

// 自定义AggregateError类
/**
 * AggregateError类用于在Promise.any()方法中表示所有Promise都被拒绝的情况
 *
 * 当Promise.any()接收的所有Promise都被拒绝时，会抛出一个AggregateError实例
 * 该实例包含了所有被拒绝的Promise的拒绝原因，存储在errors数组中
 *
 * 在原生JavaScript中，AggregateError是ES2021引入的内置错误类型
 * 这里我们自己实现它，以支持Promise.any()方法的完整功能
 */
class AggregateError extends Error {
  errors: any[];

  constructor(errors: any[], message: string) {
    super(message);
    this.name = "AggregateError";
    this.errors = errors;
  }
}

// Promise的三种状态
enum PromiseState {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

// 定义Promise解决过程
/**
 * Promise解决过程（Promise Resolution Procedure）
 *
 * 该函数实现了Promise/A+规范中的Promise解决过程，用于处理Promise的then方法返回值
 * 它确保了Promise链式调用的正确行为，处理各种类型的返回值，包括：
 * 1. 普通值
 * 2. Promise对象
 * 3. thenable对象（具有then方法的对象）
 *
 * 主要功能：
 * - 防止循环引用（当返回值与promise本身相同时）
 * - 处理返回的Promise对象（等待其状态改变并传递结果）
 * - 处理thenable对象（将其"展开"为Promise的最终结果）
 * - 处理普通值（直接作为新Promise的结果）
 *
 * 这是实现Promise链式调用的核心机制，确保了then方法可以正确地传递和转换值。
 */
function resolvePromise<T>(
  promise2: MyPromise<T>,
  x: any,
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason: any) => void
): void {
  // 如果promise和x引用相同的对象，会导致循环引用，抛出TypeError错误
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 如果x是一个Promise实例
  if (x instanceof MyPromise) {
    // 如果x处于pending状态，等待其状态改变
    if (x.state === PromiseState.PENDING) {
      x.then((y) => resolvePromise(promise2, y, resolve, reject), reject);
    } else {
      // 如果x已经处于settled状态，直接采用其状态和值
      x.then(resolve, reject);
    }
    return;
  }

  // 如果x是对象或函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let called = false; // 防止多次调用

    try {
      // 尝试获取x.then
      const then = x.then;

      // 如果then是函数，将x作为this调用它
      if (typeof then === "function") {
        try {
          then.call(
            x,
            (y: any) => {
              if (called) return;
              called = true;
              resolvePromise(promise2, y, resolve, reject);
            },
            (r: any) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (e) {
          if (!called) {
            called = true;
            reject(e);
          }
        }
      } else {
        // 如果then不是函数，则以x为值fulfill promise
        resolve(x as T);
      }
    } catch (e) {
      // 如果获取x.then抛出异常，则以e为reason reject promise
      if (!called) {
        called = true;
        reject(e);
      }
    }
  } else {
    // 如果x既不是对象也不是函数，则以x为值fulfill promise
    resolve(x as T);
  }
}

class MyPromise<T> {
  public state: PromiseState = PromiseState.PENDING;
  public value: T | undefined = undefined;
  public reason: any = undefined;
  private onFulfilledCallbacks: Array<(value: T) => void> = [];
  private onRejectedCallbacks: Array<(reason: any) => void> = [];

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason: any) => void
    ) => void
  ) {
    const resolve = (value: T | PromiseLike<T>) => {
      // 如果value是Promise类型，则等待其结果
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
        return;
      }

      // 状态一旦改变，不能再变
      if (this.state !== PromiseState.PENDING) return;

      setTimeout(() => {
        this.state = PromiseState.FULFILLED;
        this.value = value as T;
        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach((callback) =>
          callback(this.value as T)
        );
      }, 0);
    };

    const reject = (reason: any) => {
      // 状态一旦改变，不能再变
      if (this.state !== PromiseState.PENDING) return;

      setTimeout(() => {
        this.state = PromiseState.REJECTED;
        this.reason = reason;
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
      }, 0);
    };

    try {
      // 立即执行executor
      executor(resolve, reject);
    } catch (error) {
      // 如果执行器抛出异常，则将promise状态变为rejected
      reject(error);
    }
  }

  public then<TResult1 = T, TResult2 = never>(
    onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): MyPromise<TResult1 | TResult2> {
    // 处理回调函数不是函数的情况，实现值穿透
    const realOnFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : (value: T) => value as any;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason: any) => {
            throw reason;
          };

    // then方法必须返回一个promise
    const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
      if (this.state === PromiseState.FULFILLED) {
        setTimeout(() => {
          try {
            const x = realOnFulfilled(this.value as T);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === PromiseState.REJECTED) {
        setTimeout(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        // 如果当前Promise状态是pending，将回调函数加入队列
        this.onFulfilledCallbacks.push((value: T) => {
          setTimeout(() => {
            try {
              const x = realOnFulfilled(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push((reason: any) => {
          setTimeout(() => {
            try {
              const x = realOnRejected(reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  // 实现catch方法
  public catch<TResult = never>(
    onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null
  ): MyPromise<T | TResult> {
    return this.then(null, onRejected);
  }

  // 实现finally方法
  public finally(onFinally?: (() => void) | null): MyPromise<T> {
    return this.then(
      (value) => {
        // 先执行onFinally，再返回value
        const result = onFinally && onFinally();
        return MyPromise.resolve(result).then(() => value);
      },
      (reason) => {
        // 先执行onFinally，再抛出异常
        const result = onFinally && onFinally();
        return MyPromise.resolve(result).then(() => {
          throw reason;
        });
      }
    );
  }

  // 静态resolve方法
  public static resolve<T>(value?: T | PromiseLike<T>): MyPromise<T> {
    return new MyPromise<T>((resolve) => {
      resolve(value as T);
    });
  }

  // 静态reject方法
  public static reject<T = never>(reason?: any): MyPromise<T> {
    return new MyPromise<T>((_, reject) => {
      reject(reason);
    });
  }

  // 静态all方法
  public static all<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T[]> {
    return new MyPromise<T[]>((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const result: T[] = new Array(promises.length);
      let count = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            result[index] = value;
            count++;

            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  // 静态race方法
  public static race<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  // 静态allSettled方法
  public static allSettled<T>(
    promises: Array<T | PromiseLike<T>>
  ): MyPromise<PromiseSettledResult<T>[]> {
    return new MyPromise<PromiseSettledResult<T>[]>((resolve) => {
      if (promises.length === 0) {
        resolve([]);
        return;
      }

      const result: PromiseSettledResult<T>[] = new Array(promises.length);
      let count = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            result[index] = { status: "fulfilled", value };
            count++;

            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[index] = { status: "rejected", reason };
            count++;

            if (count === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  // 静态any方法
  public static any<T>(promises: Array<T | PromiseLike<T>>): MyPromise<T> {
    return new MyPromise<T>((resolve, reject) => {
      if (promises.length === 0) {
        reject(new AggregateError([], "All promises were rejected"));
        return;
      }

      const errors: any[] = new Array(promises.length);
      let count = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            errors[index] = reason;
            count++;

            if (count === promises.length) {
              reject(new AggregateError(errors, "All promises were rejected"));
            }
          }
        );
      });
    });
  }
}
