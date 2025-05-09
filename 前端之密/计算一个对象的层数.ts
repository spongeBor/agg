export default {};
function loopGetLevel(obj: any) {
  let res = 1;

  function computedLevel(obj: any, level?: number) {
    let lev = level ? level : 0;
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          computedLevel(obj[key], lev + 1);
        } else {
          res = lev + 1 > res ? lev + 1 : res;
        }
      }
    } else {
      res = lev > res ? lev : res;
    }
  }
  computedLevel(obj);
  return res;
}
