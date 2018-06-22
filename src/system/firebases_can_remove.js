import firebase from 'firebase';

var configCoaches = {
   apiKey: "AIzaSyAN6MmdTBqMFN9WCYd2ax18ZAKXJErIlZI",
   authDomain: "tookee-e6909.firebaseapp.com",
   databaseURL: "https://tookee-e6909.firebaseio.com",
   projectId: "tookee-e6909",
   storageBucket: "tookee-e6909.appspot.com",
   messagingSenderId: "812759157031"
};
firebase.initializeApp(configCoaches);

var configLearners = {
   apiKey: "AIzaSyA9Ni7-NHfAmHfOpVN7pEemO6b_oNEpu28",
   authDomain: "tookeelearners.firebaseapp.com",
   databaseURL: "https://tookeelearners.firebaseio.com",
   projectId: "tookeelearners",
   storageBucket: "tookeelearners.appspot.com",
   messagingSenderId: "482403088282"
 };
let firebaseLearners=firebase.initializeApp(configLearners,'learners');

let firebases={
  coaches:firebase,
  learners:firebaseLearners
};

export default firebases;
