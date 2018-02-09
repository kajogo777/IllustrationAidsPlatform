module.exports = function () {
  return function (hook) {
    if(hook.params.user.status !== 'CONFIRMED'){
      throw new Error('User account not approved yet ');
    }
  };
};
