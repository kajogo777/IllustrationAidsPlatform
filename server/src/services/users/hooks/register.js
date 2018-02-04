module.exports = function () {
  return (hook) => {
    if(hook.data.email !== 'bla@stmary.com'){
      hook.data.status = 'PENDING';
      hook.data.role = 'SERVANT';
    }
  };
};
