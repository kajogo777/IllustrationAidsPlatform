const hooks = require('./uploads.hooks');


// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');


// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('/uploads-store');

const multer = require('multer');
const multipartMiddleware = multer();

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  // app.use('/uploads', blobService({ Model: blobStorage }));

  // Upload Service with multipart support
  app.use('/uploads',
      // multer parses the file named 'uri'.
      // Without extra params the data is
      // temporarely kept in memory
      multipartMiddleware.single('file'),
      // another middleware, this time to
      // transfer the received file to feathers
      function(req,res,next){
          req.feathers.file = req.file;
          next();
      },
      blobService({Model: blobStorage}),

      // middleware to return images instead of datauri
      function(req, res, next){
        if(req.method === 'GET'){
          let type = 'image/' + res.data.ext;
          res.format({
            [type]: function() {
              res.end(res.data.data);
            }
          });
        }else{
          next();
        }
      }
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');

  service.hooks(hooks);
};
