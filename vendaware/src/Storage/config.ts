export interface IFirebaseConfigKeys {
    apiKey: string;
    authDomain: string;
    databaseURL?: string;
    messagingSenderId: string;
    projectId: string;
    storageBucket: string;
    appId: string;
    measurementId?: string;
}


export const config: IFirebaseConfigKeys = {
    apiKey: "AIzaSyB2tn5XDipRevbMtNqjUCMdQNkDhNjxsn4",
    authDomain: "vendaware-9e027.firebaseapp.com",
    projectId: "vendaware-9e027",
    storageBucket: "vendaware-9e027.appspot.com",
    messagingSenderId: "812501460143",
    appId: "1:812501460143:web:1ceab882c58dc515f4205a"
}

//  gsutil cors set cors.json gs://n-andgroup-vendaware.appspot.com

//  https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html
//  firebase use development
