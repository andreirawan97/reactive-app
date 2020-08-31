import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD7XI9IX0Cai5g65qHre0XvG1mOKqH-VmQ',
  authDomain: 'reactive-app-604a8.firebaseapp.com',
  databaseURL: 'https://reactive-app-604a8.firebaseio.com',
  projectId: 'reactive-app-604a8',
  storageBucket: 'reactive-app-604a8.appspot.com',
  messagingSenderId: '763198084496',
  appId: '1:763198084496:web:695795e7bc367888060f15',
  measurementId: 'G-0NWVRCQ9RB',
};

firebase.initializeApp(firebaseConfig);

export { firebase };
