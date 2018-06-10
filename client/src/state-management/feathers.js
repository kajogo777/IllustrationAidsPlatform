import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

const socket = io('/');
const client = feathers('api/');

client.configure(hooks());
client.configure(socketio(socket));
client.configure(authentication({
  storage: window.localStorage
}));

export default client;
