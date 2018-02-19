module.exports = function () {
  return (hook) => {
    if(hook.data.tags){
      hook.data.tags = Array.from(new Set(hook.data.tags.map(v => v.toLowerCase())));
    }
  };
};
