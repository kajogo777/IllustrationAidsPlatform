// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    name: { type: String , requried: [true, "Missing user's name"] },
    email: { type: String, unique: true, requried: [true, "Missing user's email"] },
    password: { type: String, requried: [true, "Missing user's password"] },
    mobileNumber: {
      type: String,
      required: [true, "Missing user's mobile number"],
      validate: {
        validator: function(value){
          return /\d{11}/.test(value);
        },
        message: "{VALUE} is not a valid mobile number"
      }
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED'],
      default: 'PENDING',
      requried: [true, "Missing user status"]
    },
    role: {
      type: String,
      enum: ['ADMIN', 'SERVANT'],
      default: 'SERVANT',
      requried: [true, "Missing user role"]
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
