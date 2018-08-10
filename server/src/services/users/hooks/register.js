module.exports = function () {
  return (hook) => {
    if(hook.data.username !== 'admin'){
      hook.data.status = 'PENDING';
      hook.data.role = 'SERVANT';
    }
  };
};
