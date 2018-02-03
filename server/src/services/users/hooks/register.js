module.exports = function () {
  return (hook) => {
    console.log(hook.data);
    if(hook.data.email !== 'bla@stmary.com'){
      hook.data.status = 'PENDING';
      hook.data.role = 'SERVANT';
    }
  };
};
