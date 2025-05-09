export default {};
// var [a, b] = {a: 1, b: 2}; 成立
Object.prototype[Symbol.iterator] = function () {
  Object.values(this)[Symbol.iterator]();
};
