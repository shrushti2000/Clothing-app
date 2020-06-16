import firebase from 'firebase/app';
import 'firebase/firestore';
import  'firebase/auth';

const config={
    apiKey: "AIzaSyA6ViMh1H7535RSzUXBqz_UlWZEEMU-R10",
    authDomain: "crwn-db-6945f.firebaseapp.com",
    databaseURL: "https://crwn-db-6945f.firebaseio.com",
    projectId: "crwn-db-6945f",
    storageBucket: "crwn-db-6945f.appspot.com",
    messagingSenderId: "377045586157",
    appId: "1:377045586157:web:bd552a4af4d5bbf864bce4",
    measurementId: "G-3WK6DM5TWG"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument=async(userAuth,additionalData)=>{
    if(!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();
    if(!snapShot.exists){
      const{displayName,email}=userAuth;
      const createdAt=new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      }catch(error){
        console.log('error creating user',error.message);
      }
    }

    return userRef;
  }


  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider=new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;