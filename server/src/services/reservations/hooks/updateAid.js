const is_reserved = {
  'PENDING': true,
  'CHECKED OUT': true,
  'RETURNED': false,
  'OVERDUE': true
}

module.exports = function () {
  return (hook) => {
    if(hook.data.aid_id && hook.data.status){
      hook.app.service("aids").patch(hook.data.aid_id, {
        'reserved': is_reserved[hook.data.status]
      });
    }
  };
};
