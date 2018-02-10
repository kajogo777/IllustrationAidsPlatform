module.exports = function () {
  return (hook) => {
    if(hook.params.user.role !== 'ADMIN'){
      if('role' in hook.data || 'status' in hook.data)
        throw new Error('You are not authorized to update these fields');
    }
  };
};
