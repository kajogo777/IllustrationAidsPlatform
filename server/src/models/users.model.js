// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    name: {
      type: String,
      trim: true,
      requried: [true, "Missing user's name"],
      minlength: [5, "Name is too short, please choose a name longer than 5 letters"]
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      requried: [true, "Missing username"]
    },
    password: {
      type: String,
      requried: [true, "Missing user's password"],
      minlength: [5, "Password is too short, please choose a password longer than 5 letters"]
    },
    mobileNumber: {
      type: String,
      trim: true,
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
