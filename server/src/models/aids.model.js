// aids-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const aids = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
    reserved: { type: Boolean, default: false},
    human_id: { type: String, required: true},
    image_uri: { type: String },
    tags: [ String ]
  }, {
    timestamps: true
  });

  return mongooseClient.model('aids', aids);
};
