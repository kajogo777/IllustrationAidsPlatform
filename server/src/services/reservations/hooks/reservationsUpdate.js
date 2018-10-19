module.exports = function () {
  return (hook) => {
    let n = Date.now();

    let one = new Date(n);
    one.setDate(one.getDate() - 7);

    let two = new Date(n);
    two.setDate(two.getDate() - 14);

    hook.app.service("reservations").patch(null,
    {status: 'OVERDUE'},
    {
      query: {
        status: 'CHECKED OUT',
        $or: [
          {
            duration_in_weeks: 1,
            pickup_date: {
              $lt: one
            }
          },
          {
            duration_in_weeks: 2,
            pickup_date: {
              $lt: two
            }
          }
        ]
      }
    });

    hook.app.service("reservations").remove(null,
    {
      query: {
        status: 'PENDING',
        pickup_date: {
          $lt: new Date(n)
        }
      }
    });

  };
};
