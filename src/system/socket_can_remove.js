import io from 'socket.io-client';
const socket=io('http://localhost:3090');
//const socket=io('https://lyback.net:443');

socket.on('request-signin',response=>{
  const loggedInState=localStorage.getItem('loginLearner');
  if(!loggedInState) alert("Local storage is not set!");
  socket.emit('learner:signin',JSON.parse(loggedInState));
});

export default socket;
