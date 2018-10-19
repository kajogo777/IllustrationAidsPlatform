module.exports = function () {
  return function (hook) {
    const query = hook.params.query;

    for (let field in query) {
      if(query[field].$like === "" || (query[field].$all && query[field].$all.length === 0))
        delete query[field];
    }
    for (let field in query) {
      if(query[field].$like && field.indexOf('$') == -1) {
          query[field] = { $regex: new RegExp(query[field].$like, 'i') };
      }
    }
    hook.params.query = query
    return hook
  }
}
