module.exports = function (func, option = {}) {
  return (...arg) => new Promise((resolve, reject) => {
    return func.apply(option.context, [...arg, (err, ...data) => {
      if (err) {
        return reject(err);
      }
      if (option.multiArg) {
        return resolve(data)
      }
      return resolve(data[0]);
    }]);
  })
}
