module.exports = function () {
  return (hook) => {
    if(hook.params.query && '_aggregate' in hook.params.query) {
      return hook.service.Model.aggregate(hook.params.query._aggregate).then((result) => {
        hook.result = { data: result[0].all_tags };
        return hook;
      });
    }
  };
};
