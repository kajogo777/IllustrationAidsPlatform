module.exports = function () {
  return (hook) => {
    if(hook.data && hook.data.aid_id){
      let startDate = new Date(hook.data.pickup_date);
      let endDate = new Date(hook.data.pickup_date);
      endDate.setDate(endDate.getDate() + hook.data.duration_in_weeks*7);

      return hook.app.service("reservations")
      .find({
        query: {
          aid_id: hook.data.aid_id,
          status: {
            $in: ['PENDING', 'CHECKED OUT', 'OVERDUE']
          },
          $or: [
            {
              pickup_date: { $lte: startDate }
            },
            {
              pickup_date: { $gte: startDate,  $lt: endDate }
            }
          ]
        }
      })
      .then(result => {
        if(result.total > 0){
          throw new Error('Aid Unavailable in selected dates');
        }
      });

    }
  };
};
