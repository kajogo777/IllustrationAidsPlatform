import io from 'socket.io-client';
import feathers from '@feathersjs/client';
// import hooks from 'feathers-hooks';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';

const socket = io('/');
const client = feathers('api/');

// client.configure(hooks());
client.configure(socketio(socket));
client.configure(authentication({
  storage: window.localStorage,
  timeout: 120000
}));

export default client;
