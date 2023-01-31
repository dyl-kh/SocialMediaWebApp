import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDfmRf1Qf_Hc8BAc3I-lRcth7h6IMmGq2Y',
    authDomain: 'further-web-programming.firebaseapp.com',
    projectId: 'further-web-programming',
    storageBucket: 'further-web-programming.appspot.com',
    messagingSenderId: '506893159434',
    appId: '1:506893159434:web:ee39f441eafac4316063f3',
};

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();

export { storage, firebase };
