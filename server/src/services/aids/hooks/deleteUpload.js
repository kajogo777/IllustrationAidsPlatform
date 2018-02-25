module.exports = function () {
  return (hook) => {
    if(hook.result){
      if(hook.result._id){
        hook.service.Model.find({image_uri: hook.result.image_uri})
        .then(result => {
          if(result.length === 0){
            hook.app.service("uploads").remove(hook.result.image_uri)
          }
        })
      }
    }
  };
};
