module.exports = function(holder, options, wrapFunc) {
  const res = {};
  Object.keys(holder).forEach(key => {
    if (typeof holder[key] !== "function") {
      res[key] = holder[key];
    } else {
      res[key] = wrapFunc(holder[key], options);
    }
  });
  return res;
};
