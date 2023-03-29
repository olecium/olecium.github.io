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

//  https://n-andgroup-vendaware-default-rtdb.firebaseio.com

// export const config: IFirebaseConfigKeys = {
//     apiKey: "AIzaSyBh5bh7cFndnJnKBMh3q7Nw-w8pIIRMvHg",
//     projectId: "n-andgroup-vendaware",
//     authDomain: "n-andgroup-vendaware.firebaseapp.com",
//     databaseURL: "https://n-andgroup-vendaware.firebaseio.com",
//     storageBucket: "n-andgroup-vendaware.appspot.com",
//     messagingSenderId: "455953510556",
//     appId: "1:455953510556:web:5736704226339d1b3afd59",
//     measurementId: "G-1BS5J1SEVL"
// }


export const config: IFirebaseConfigKeys = {
	apiKey: "AIzaSyAhP4aIwgCU8PlnzJ4Gm_JOOa2F6XfgqTE",
  authDomain: "bookshelf-cee16.firebaseapp.com",
  projectId: "bookshelf-cee16",
  storageBucket: "bookshelf-cee16.appspot.com",
  messagingSenderId: "1067075997082",
  appId: "1:1067075997082:web:539b5f255de5eaa05ebe23"
}

//  gsutil cors set cors.json gs://n-andgroup-vendaware.appspot.com

//  https://firebase.googleblog.com/2016/07/deploy-to-multiple-environments-with.html
//  firebase use development
