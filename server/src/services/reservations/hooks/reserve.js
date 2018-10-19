module.exports = function () {
  return (hook) => {
    if(hook.data){
      hook.data.username = hook.params.user.username;
      hook.data.user_id = hook.params.user._id;
    }
  };
};
