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
    location: { type: String },
    date_added: { type: Date, default: Date.now },
    reserved: { type: Boolean, default: false },
    human_id: { type: String, required: true },
    image_uri: { type: String },
    tags: [String],
    url: {
      type: String,
      validate: {
        validator: function (value) {
          var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
          return !!pattern.test(value) || value == '';
        },
        message: '{VALUE} is not a valid url'
      }
    },
    type: {
      type: String,
      enum: ['DIGITAL', 'REGULAR'],
      default: 'REGULAR',
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('aids', aids);
};
