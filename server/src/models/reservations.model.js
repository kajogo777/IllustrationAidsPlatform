// reservations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const reservations = new Schema({
    aid_id: { type: Schema.Types.ObjectId, ref: 'aids', requried: [true, "Missing aid id"] },
    user_id: { type: Schema.Types.ObjectId, ref: 'users', requried: [true, "Missing user id"] },
    pickup_date: {
        type: Date,
        validate: {
          validator: function(value){
            return (value.getDay() == 5)
          },
          message: "Pick up date must be a friday"
        }
    },
    returned: { type: Boolean, default: false},
    date_reserved: { type: Date, default: Date.now },
    duration_in_weeks: {
      type: Number,
      enum: [1, 2],
      default: 1
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('reservations', reservations);
};
