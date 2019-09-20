// merge default options with user custom options

// This modifies the original object passed by user
module.exports = (def, cus) => {
  const cusKeys = Object.keys(cus);
  Object.keys(def).forEach(key => {
    if (!cusKeys.includes(key)) {
      cus[key] = def[key];
    }
  });
  return cus;
};
