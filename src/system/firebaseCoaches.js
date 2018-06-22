import firebase from 'firebase';

var config = {
   apiKey: "AIzaSyAN6MmdTBqMFN9WCYd2ax18ZAKXJErIlZI",
   authDomain: "tookee-e6909.firebaseapp.com",
   databaseURL: "https://tookee-e6909.firebaseio.com",
   projectId: "tookee-e6909",
   storageBucket: "tookee-e6909.appspot.com",
   messagingSenderId: "812759157031"
};
firebase.initializeApp(config);

export default firebase;
