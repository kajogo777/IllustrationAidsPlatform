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
        image_uri: '753186efb38d62fc77273150c56c0155d8c66d88c856ec904560460bf894aba7.png',
        url: '{{internet.url}}',
        type: () => {
          let random = (Math.floor(Math.random() * 2) == 0);
          return random ? 'REGULAR' : 'DIGITAL';
        },
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
