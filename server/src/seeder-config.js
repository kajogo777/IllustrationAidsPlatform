module.exports = {
  services: [
    {
      path: 'users',
      template: {
        name: '{{name.firstName}} {{name.lastName}}',
        email: 'bla@stmary.com',//'{{internet.email}}',
        password: '12345', //'{{internet.password}}'
        status: 'CONFIRMED',
        role: 'ADMIN',
        mobileNumber: '01000000000'
      }
    },
    {
      count: 15,
      path: 'users',
      template: {
        name: '{{name.firstName}} {{name.lastName}}',
        email: '{{internet.email}}',
        password: '12345', //'{{internet.password}}'
        status: 'PENDING',
        role: 'SERVANT',
        mobileNumber: '01000000000'
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
        image_uri: 'c452b19a3f9e03b1f3bfeafa680a8a52c5df34c8ff9db67bd993fde29567648e.jpeg',
        tags: () => {
          let faker = require('faker');

          let a = [];
          for(let i = 0; i < 10; i++)
              a.push(faker.fake("{{commerce.productAdjective}}"));
          return a;
        }
      }
    }
  ]
};
