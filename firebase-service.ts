import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase-sdk.json";

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default firebaseAdmin;
