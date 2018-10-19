module.exports = {
  services: [
    {
      count: 200,
      path: 'aids',
      template: {
        name: '{{commerce.productName}}',
        description: '{{lorem.sentences}}',
        date_added: '{{date.past}}',
        human_id: '{{random.uuid}}',
        image_uri: 'e6f96c905054c64d9cae1c5b3739682291c8359e6d1408f6898f6e603ba96f0b.png',
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
