
    
import {auth} from "../../../Storage/base";


export const resetPassword = async (email: string) => {
    await auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        console.log('email sent');
    }).catch(function(error) {
        // An error happened.
        console.log('email not sent: ', error);
    });
}