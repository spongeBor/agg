export default {};
const isObject = (val: any) => typeof val === 'object' && val !== null;
function flatten(obj: any) {
  if (!isObject(obj)) return;
  const res: any = {};
  const dfs = (cur: any, prefix: any) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((item, index) => {
          dfs(item, `${prefix}[${index}]`);
        });
      } else {
        for (let key in cur) {
          dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
        }
      }
    } else {
      res[prefix] = cur;
    }
  };
  dfs(obj, '');
  return res;
}
