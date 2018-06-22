import firebase from 'firebase';

var config = {
   apiKey: "AIzaSyA9Ni7-NHfAmHfOpVN7pEemO6b_oNEpu28",
   authDomain: "tookeelearners.firebaseapp.com",
   databaseURL: "https://tookeelearners.firebaseio.com",
   projectId: "tookeelearners",
   storageBucket: "tookeelearners.appspot.com",
   messagingSenderId: "482403088282"
 };
firebase.initializeApp(config);

export default firebase;
