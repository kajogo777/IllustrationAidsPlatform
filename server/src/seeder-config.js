module.exports = {
  services: [
    {
      path: 'users',
      template: {
        name: '{{name.firstName}} {{name.lastName}}',
        email: 'bla@stmary.com',//'{{internet.email}}',
        password: '12345' //'{{internet.password}}'
      }
    },
    {
      count: 10,
      path: 'aids',
      template: {
        name: '{{commerce.productName}}',
        description: '{{lorem.sentences}}',
        date_added: '{{date.past}}',
        reserved: '{{random.boolean}}',
        human_id: '{{random.uuid}}',
        image_uri: 'default-avatar-business-bear.png'//'{{image.abstract}}'
      }
    }
  ]
};
