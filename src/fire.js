import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD1pGJUcivQAnOc2GCYZPxUkuxsLcZPvnk",
    authDomain: "moengage-app.firebaseapp.com",
    projectId: "moengage-app",
    storageBucket: "moengage-app.appspot.com",
    messagingSenderId: "1097762295221",
    appId: "1:1097762295221:web:7c8c5e06bf7552b6a19dfc"
  };
  
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire; 